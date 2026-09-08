from bs4 import BeautifulSoup
import json
import re


INPUT_FILE = "../dataset/Document/Codebook.HTML"
OUTPUT_FILE = "../dataset/Document/codebook.json"


def clean_text(text):
    """Clean whitespace and HTML entities."""
    return re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()


def parse_metadata(text):
    """
    Extract variable metadata from the first cell of each codebook table.

    Example:
    Label: State FIPS Code
    Section Name: Record Identification
    Section Number: 0
    Question Number: 1
    Column: 1-2
    Type of Variable: Num
    SAS Variable Name: _STATE
    Question Prologue:
    Question: State FIPS Code
    """

    metadata = {}

    # Fields that occur in the SAS codebook
    fields = [
        "Label",
        "Section Name",
        "Section Number",
        "Question Number",
        "Column",
        "Type of Variable",
        "SAS Variable Name",
        "Question Prologue",
        "Question"
    ]

    for field in fields:
        # Look for:
        # Field: value
        pattern = rf"{re.escape(field)}:\s*(.*?)(?=\s+(?:{'|'.join(map(re.escape, fields))}):|$)"

        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            value = clean_text(match.group(1))
            metadata[field] = value
        else:
            metadata[field] = ""

    return metadata


def convert_value(value):
    """
    Convert numeric-looking values to numbers.
    Otherwise keep them as strings.
    """

    value = clean_text(value)

    if not value:
        return None

    # Remove commas from frequencies such as 12,036
    numeric_value = value.replace(",", "")

    try:
        if "." in numeric_value:
            return float(numeric_value)
        return int(numeric_value)
    except ValueError:
        return value


def extract_codebook(input_file):
    with open(input_file, "r", encoding="cp1252", errors="replace") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")

    variables = []

    # The codebook contains many tables.
    for table in soup.find_all("table"):

        # Find rows
        rows = table.find_all("tr")

        if not rows:
            continue

        # ---------------------------------------------------------
        # Find metadata
        # ---------------------------------------------------------

        metadata = None

        for row in rows:
            cells = row.find_all(["td", "th"])

            if not cells:
                continue

            text = clean_text(cells[0].get_text(" ", strip=True))

            if "SAS Variable Name:" in text:
                metadata = parse_metadata(text)
                break

        # Skip tables that are not variable tables
        if not metadata:
            continue

        variable = {
            "label": metadata.get("Label", ""),
            "section_name": metadata.get("Section Name", ""),
            "section_number": metadata.get("Section Number", ""),
            "question_number": metadata.get("Question Number", ""),
            "column": metadata.get("Column", ""),
            "type": metadata.get("Type of Variable", ""),
            "sas_variable_name": metadata.get("SAS Variable Name", ""),
            "question_prologue": metadata.get("Question Prologue", ""),
            "question": metadata.get("Question", ""),
            "values": []
        }

        # ---------------------------------------------------------
        # Find value table
        # ---------------------------------------------------------

        headers = []

        for row in rows:
            cells = row.find_all(["td", "th"])

            if not cells:
                continue

            row_values = [
                clean_text(cell.get_text(" ", strip=True))
                for cell in cells
            ]

            # Find the header row
            if "Value" in row_values and "Value Label" in row_values:
                headers = row_values
                continue

            # -----------------------------------------------------
            # Extract value rows
            # -----------------------------------------------------

            if headers and len(row_values) >= 2:

                # Ignore metadata rows
                if row_values[0] in ["Value", "Label"]:
                    continue

                value_data = {}

                for i, header in enumerate(headers):

                    if i >= len(row_values):
                        continue

                    value_data[header.lower().replace(" ", "_")] = \
                        convert_value(row_values[i])

                # Make sure this is actually a value row
                if "value" in value_data and "value_label" in value_data:

                    variable["values"].append(value_data)

        variables.append(variable)

    return variables


def main():

    print(f"Reading: {INPUT_FILE}")

    data = extract_codebook(INPUT_FILE)

    print(f"Extracted {len(data)} variables")

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            data,
            f,
            indent=4,
            ensure_ascii=False
        )

    print(f"JSON written to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()