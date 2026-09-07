from pathlib import Path
import json
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

XPT_FILE = BASE_DIR / "dataset" / "raw" / "Data.XPT"
JSON_FILE = BASE_DIR / "dataset" / "Document" / "codebook.json"

OUTPUT_FILE = BASE_DIR / "dataset" / "processed" / "decoded_data.csv"


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def spaces_to_underscore(text):
    """
    Replace spaces with underscores.

    Example:
        'Final Disposition'
        ->
        'Final_Disposition'
    """

    if not isinstance(text, str):
        return text

    return "_".join(text.split())


def normalize_value(value):
    """
    Normalize values so that things like:

        1100
        1100.0
        '1100'

    can be compared correctly.
    """

    if pd.isna(value):
        return None

    # Convert numpy/pandas numeric values to normal Python values
    if hasattr(value, "item"):
        try:
            value = value.item()
        except Exception:
            pass

    # Numeric values
    if isinstance(value, (int, float)):
        try:
            number = float(value)

            if number.is_integer():
                return int(number)

            return number

        except Exception:
            pass

    # Strings
    if isinstance(value, str):
        value = value.strip()

        # Try numeric string
        try:
            number = float(value)

            if number.is_integer():
                return int(number)

            return number

        except ValueError:
            return value

    return value


# ============================================================
# LOAD CODEBOOK JSON
# ============================================================

def load_codebook(json_file):

    print(f"Reading codebook: {json_file}")

    with open(json_file, "r", encoding="utf-8") as f:
        codebook = json.load(f)

    print(f"Loaded {len(codebook)} variables from codebook.")

    return codebook


# ============================================================
# CREATE VARIABLE LOOKUP
# ============================================================

def create_variable_lookup(codebook):

    lookup = {}

    for variable in codebook:

        sas_name = variable.get("sas_variable_name")

        if not sas_name:
            continue

        sas_name = sas_name.strip()

        # ----------------------------------------------------
        # Question text
        # ----------------------------------------------------

        question = variable.get("question", "")

        if not question:
            # If question is empty, fall back to label
            question = variable.get("label", "")

        question = question.strip()

        # Convert question to column name
        new_column_name = spaces_to_underscore(question)

        # ----------------------------------------------------
        # Value labels
        # ----------------------------------------------------

        value_mapping = {}

        for item in variable.get("values", []):

            value = item.get("value")
            label = item.get("value_label")

            if value is None or label is None:
                continue

            normalized_value = normalize_value(value)

            value_mapping[normalized_value] = label

        # ----------------------------------------------------
        # Store everything
        # ----------------------------------------------------

        lookup[sas_name] = {
            "new_column_name": new_column_name,
            "question": question,
            "value_mapping": value_mapping
        }

    return lookup


# ============================================================
# DECODE XPT
# ============================================================

def decode_xpt(xpt_file, lookup):

    print(f"Reading XPT: {xpt_file}")

    # Read SAS XPORT file
    df = pd.read_sas(
        xpt_file,
        format="xport",
        encoding="latin1"
    )

    print(f"Loaded XPT with {len(df)} rows and {len(df.columns)} columns.")

    # Keep track of statistics
    matched_columns = 0
    unmatched_columns = 0

    new_column_names = {}

    # ========================================================
    # PROCESS EVERY XPT COLUMN
    # ========================================================

    for column in df.columns:

        # XPT/SAS variable names are normally uppercase.
        # Convert to string just in case.
        column_name = str(column).strip()

        # ----------------------------------------------------
        # MATCH SAS VARIABLE NAME
        # ----------------------------------------------------

        if column_name in lookup:

            variable_info = lookup[column_name]

            matched_columns += 1

            # ------------------------------------------------
            # DECODE VALUES
            # ------------------------------------------------

            mapping = variable_info["value_mapping"]

            if mapping:

                df[column] = df[column].apply(
                    lambda value: mapping.get(
                        normalize_value(value),
                        value
                    )
                )

            # ------------------------------------------------
            # RENAME COLUMN
            # ------------------------------------------------

            new_name = variable_info["new_column_name"]

            if new_name:

                new_column_names[column] = new_name

            print(
                f"[MATCH] {column_name} "
                f"-> {new_name} "
                f"({len(mapping)} value labels)"
            )

        else:

            unmatched_columns += 1

            print(
                f"[NO MATCH] {column_name}"
            )

    # ========================================================
    # RENAME COLUMNS
    # ========================================================

    df.rename(
        columns=new_column_names,
        inplace=True
    )

    print()
    print("======================================")
    print("DECODING COMPLETE")
    print("======================================")
    print(f"Matched columns   : {matched_columns}")
    print(f"Unmatched columns : {unmatched_columns}")
    print(f"Total columns     : {len(df.columns)}")

    return df


# ============================================================
# MAIN
# ============================================================

def main():

    # Make sure output directory exists
    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    # --------------------------------------------------------
    # Load JSON
    # --------------------------------------------------------

    codebook = load_codebook(JSON_FILE)

    # --------------------------------------------------------
    # Create lookup
    # --------------------------------------------------------

    lookup = create_variable_lookup(codebook)

    print(f"Created lookup for {len(lookup)} SAS variables.")

    # --------------------------------------------------------
    # Read and decode XPT
    # --------------------------------------------------------

    decoded_df = decode_xpt(
        XPT_FILE,
        lookup
    )

    # --------------------------------------------------------
    # Save
    # --------------------------------------------------------

    decoded_df.to_csv(
        OUTPUT_FILE,
        index=False,
        encoding="utf-8"
    )

    print()
    print(f"Decoded dataset saved to:")
    print(OUTPUT_FILE)


if __name__ == "__main__":
    main()