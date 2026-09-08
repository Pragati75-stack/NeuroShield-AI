# 🧹 Stroke Dataset — Data Cleaning & Preprocessing Documentation

> **Purpose:** Document the complete data-cleaning and preprocessing workflow used to prepare the stroke dataset for machine-learning experiments.
>
> **Pipeline principle:** Clean and interpret the data first, split into training/testing data to prevent leakage, learn preprocessing parameters from the training set only, and apply the learned transformations to the test set.

---

## 📌 1. Pipeline Overview

```text
Original / decoded dataset
          │
          ▼
   Feature Selection
          │
          ▼
  SAS → Question Names
          │
          ▼
  Value Cleaning / Interpretation
          │
          ▼
 Remove Missing Target Rows
          │
          ▼
      Remove Duplicates
          │
          ▼
   Train / Test Split
          │
          ├───────────────┐
          ▼               ▼
     Training Set      Test Set
          │               │
          ▼               │
   Fit Imputers           │
          │               │
          ▼               ▼
 Apply same imputers ─────┘
          │
          ▼
 Identify categorical / ordinal variables
          │
          ▼
  One-Hot + Ordinal Encoding
          │
          ▼
 Fitted Transformer
          │
          ├───────────────┐
          ▼               ▼
Transformed Train    Transformed Test
```

---

# 📂 2. Data Files and Versions

The preprocessing workflow maintains three useful representations of the data.

| Version | Description | Main purpose |
|---|---|---|
| 🟦 **Original / decoded data** | Dataset before this preprocessing pipeline | Reference / audit |
| 🟨 **Pre-transformed data** | Data after cleaning, splitting and imputation, but before categorical encoding | Human-readable ML-ready intermediate data |
| 🟩 **Post-transformed data** | Data after the fitted `ColumnTransformer` has encoded categorical variables | Model-training input |

The code loads:

```python
../dataset/processed/decoded_data.csv
```

and the codebook from:

```python
../dataset/processed/codebook.json
```

The pipeline also stores:

```text
Train.csv
Test.csv
transformed_train.csv
transformed_test.csv
```

---

# 🧾 3. Dataset Interpretation

The source data contains SAS/BRFSS-style variable names and decoded value labels.

A **codebook** is used to map SAS variable names to more meaningful question-based names.

For example:

| SAS variable | Interpreted name |
|---|---|
| `CVDSTRK3` | Ever told you had a stroke |
| `_BMI5` | Body Mass Index |
| `GENHLTH` | General health |
| `EDUCA` | Highest grade/year of school completed |
| `INCOME3` | Annual household income |

### Important distinction

The code in this preprocessing file primarily performs **column-name interpretation** and **cleaning of already decoded values**.

It loads `decoded_data.csv`; therefore, the SAS numerical-code → human-readable-value decoding has already occurred upstream.

---

# 🔎 4. Feature Selection

The pipeline does not blindly use every column.

A predefined list of relevant SAS variables is selected:

```python
columns = [
    'CVDSTRK3', '_AGE80', 'SEXVAR', '_BMI5',
    '_RFHYPE6', 'DIABETE4', 'SMOKE100', '_SMOKER3',
    '_MICHD', 'CVDINFR4', 'CVDCRHD4', 'TOLDHI3',
    'CHOLMED3', 'CHCKDNY2', 'PREDIAB2', 'EXERANY2',
    '_TOTINDA', '_PAINDX3', 'PAMIN13_', '_PA30023',
    'GENHLTH', 'PHYSHLTH', 'MENTHLTH', 'EDUCA',
    'INCOME3', 'EMPLOY1', 'MARITAL'
]
```

The selected SAS variables are converted to their question-based names using the codebook.

---

# 🧮 5. BMI Correction

The BMI field is stored in an integer-like representation with the decimal removed.

The preprocessing therefore converts:

```text
2296 → 22.96
2694 → 26.94
3210 → 32.10
```

using:

```python
df_selected["Body_Mass_Index_(BMI)"] /= 100
```

### Why?

The stored representation contains two implied decimal places. Dividing by 100 restores the BMI value to its normal scale.

This correction is performed before the train/test split, because it is a deterministic unit/representation correction and does not learn anything from the dataset.

---

# 🔢 6. Numeric Type Conversion

The following health-duration variables are explicitly converted to floating-point values:

- Physical health not-good days
- Mental health not-good days

Example:

```python
df_selected["Physical health ..."] = \
    df_selected["Physical health ..."].astype(float)

df_selected["Mental health ..."] = \
    df_selected["Mental health ..."].astype(float)
```

This ensures these variables are treated as numerical features rather than strings.

---

# 🧹 7. Value Cleaning

The pipeline cleans object/string columns by removing explanatory text and notes attached to the actual response.

### Cleaning operations

```python
.str.split(" - ", n=1).str[0]
```

removes text following the first `" - "`.

```python
.str.split(" Notes", n=1).str[0]
```

removes appended notes.

Finally:

```python
.str.strip()
```

removes unnecessary leading/trailing whitespace.

---

## 🚫 8. Uninformative Responses → Missing Values

Responses that do not provide useful information for modelling are converted to `NaN`.

Examples include:

```text
Don't know/Not sure
Refused
Don't know/Refused/Missing
Don't know/Not Sure/Refused/Missing
```

This is important because these responses should not be treated as genuine categories such as "Yes" or "No".

Instead, they become missing values and can subsequently be handled by the appropriate imputation strategy.

---

# 🎯 9. Target Variable Cleaning

The target variable is:

```text
(Ever_told)_(you_had)_a_stroke.
```

Rows where the target is missing are removed:

```python
df_selected.dropna(
    subset=["(Ever_told)_(you_had)_a_stroke."],
    inplace=True
)
```

### Why are target values not imputed?

The target represents the outcome the model is supposed to predict.

Imputing an unknown target would create an artificial label and could introduce incorrect training information.

Therefore:

> **Missing target → remove the row.**

---

# ♻️ 10. Duplicate Removal

Duplicate rows are removed:

```python
df_selected.drop_duplicates(
    keep='first',
    inplace=True
)
```

Only the first occurrence is retained.

### Purpose

This prevents identical observations from unnecessarily appearing multiple times and potentially influencing model training.

---

# ✂️ 11. Train / Test Split

After cleaning the target and duplicates, the data is separated into:

```text
X → input features
y → target
```

The target is encoded as:

```python
"No"  → 0
"Yes" → 1
```

The data is then split into training and testing sets.

```python
train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

### 🔐 Why split before learned preprocessing?

Imputation and encoding can learn information from the data.

If they are fitted using the complete dataset before splitting, information from the test set can leak into the training process.

The correct principle is:

```text
TRAIN → fit preprocessing
TEST  → transform using the fitted preprocessing
```

---

# 🩹 12. Missing-Value Imputation

Missing feature values are handled **after the train/test split**.

This is important for preventing data leakage.

---

## 🔢 Numerical Features

Numerical missing values are replaced using the **median**.

```python
SimpleImputer(strategy='median')
```

The imputer is:

```text
FIT → Training data
TRANSFORM → Training data
TRANSFORM → Test data
```

It is **not fitted independently on the test set**.

### Why median?

The median is relatively robust to extreme values and is suitable for numerical health-related variables that may not follow a perfectly symmetric distribution.

---

## 🏷️ Categorical Features

Categorical missing values are intended to be handled using the **most frequent category**:

```python
SimpleImputer(strategy='most_frequent')
```

The same principle applies:

```text
FIT → Training data
TRANSFORM → Training data
TRANSFORM → Test data
```

> ⚠️ **Implementation check:** ensure `impute_categorical_values()` is actually called before the transformation stage. Defining the function alone does not execute it.

---

# 🧩 13. Feature-Type Identification

After imputation, object columns are separated into categories.

### Binary categorical columns

Columns with exactly two unique values are identified:

```python
nunique() == 2
```

These are passed to:

```python
OneHotEncoder(drop="if_binary")
```

### Multi-category columns

Object columns with three or more unique values are identified:

```python
nunique() >= 3
```

These are passed to a standard one-hot encoder.

---

# 📊 14. Ordinal Features

Three variables have a meaningful natural order:

1. **General health**
2. **Highest grade / education**
3. **Annual household income**

These should **not** be treated as purely nominal categories because their levels have an inherent progression.

---

## 🥇 General Health Order

```text
Poor
↓
Fair
↓
Good
↓
Very good
↓
Excellent
```

---

## 🎓 Education Order

```text
Never attended school or only kindergarten
↓
Grades 1 through 8 (Elementary)
↓
Grades 9 through 11 (Some high school)
↓
Grade 12 or GED (High school graduate)
↓
College 1 year to 3 years (Some college or technical school)
↓
College 4 years or more (College graduate)
```

---

## 💰 Income Order

```text
Less than $10,000
↓
Less than $15,000
↓
Less than $20,000
↓
Less than $25,000
↓
Less than $35,000
↓
Less than $50,000
↓
Less than $75,000
↓
Less than $100,000
↓
Less than $150,000
↓
Less than $200,000
↓
$200,000 or more
```

---

# ⚠️ 15. Ordinal Column Order Must Match Category Order

The `OrdinalEncoder` matches the category lists **positionally**.

The confirmed order in the training DataFrame is:

```text
ordinal[0] → General Health
ordinal[1] → Highest Grade
ordinal[2] → Income
```

Therefore:

```python
categories=[
    general_health_categories,
    education_categories,
    income_categories
]
```

is correct.

### 🔐 Important rule

If the order of `ordinal` changes, the order of `categories` must change with it.

---

# 🔄 16. ColumnTransformer

The preprocessing combines:

### Binary categorical variables

```python
OneHotEncoder(
    drop="if_binary"
)
```

### Multi-category variables

```python
OneHotEncoder(
    handle_unknown="ignore"
)
```

### Ordinal variables

```python
OrdinalEncoder(
    categories=...
)
```

All other columns are preserved through:

```python
remainder="passthrough"
```

---

# 🧠 17. Fitting and Transforming

The transformer is fitted **only on the training data**:

```python
X_train_transformed = preprocessor.fit_transform(X_train)
```

The test data uses the already-fitted transformer:

```python
X_test_transformed = preprocessor.transform(X_test)
```

This is one of the most important anti-leakage rules in the entire preprocessing workflow.

### Correct

```text
TRAIN
  ↓
fit + transform

TEST
  ↓
transform only
```

### Incorrect

```text
TRAIN → fit_transform
TEST  → fit_transform  ❌
```

---

# 💾 18. Saved Dataset Versions

The pipeline saves the cleaned, human-readable data before encoding:

```text
Train.csv
Test.csv
```

These are useful for:

- auditing the cleaning process
- checking imputation
- understanding the data before encoding
- debugging

The encoded versions are saved as:

```text
transformed_train.csv
transformed_test.csv
```

These are intended for downstream machine-learning models.

---

# 🔍 19. Three-Level Data Audit

Keeping all three stages is excellent for reproducibility.

```text
🟦 ORIGINAL / DECODED
       │
       │ interpretation + cleaning
       ▼
🟨 PRE-TRANSFORMED
       │
       │ encoding
       ▼
🟩 POST-TRANSFORMED
```

### 🟦 Original / decoded

Answers:

> "What did the dataset look like before this cleaning pipeline?"

### 🟨 Pre-transformed

Answers:

> "What does the cleaned dataset look like before machine-learning encoding?"

### 🟩 Post-transformed

Answers:

> "What exactly was provided to the ML model?"

This makes debugging and explaining the project much easier.

---

# 🔐 20. Preprocessor Reproducibility

Once the transformer has been fitted:

```python
preprocessor.fit(X_train)
```

it should be saved.

Recommended:

```python
import joblib

joblib.dump(
    preprocessor,
    "../dataset/processed/preprocessor.pkl"
)
```

Later, the exact same preprocessing rules can be loaded:

```python
preprocessor = joblib.load(
    "../dataset/processed/preprocessor.pkl"
)

X_new_transformed = preprocessor.transform(X_new)
```

### Never do this for new data:

```python
preprocessor.fit_transform(X_new)  # ❌
```

The new data must use the preprocessing rules learned from the training data.

---

# ⚖️ 21. Class Imbalance Consideration

The stroke outcome is highly imbalanced, with the positive stroke class being much smaller than the negative class.

Therefore, **accuracy alone should not be the primary evaluation metric**.

Recommended metrics for later model evaluation include:

- Recall
- Precision
- F1-score
- Confusion matrix
- PR-AUC
- ROC-AUC

For this problem, recall for the stroke-positive class is particularly important because missing a positive case can be more consequential than incorrectly flagging a negative case.

Potential strategies to compare later:

```text
Baseline model
      ↓
Class-weighted model
      ↓
SMOTE / other resampling approaches
```

Resampling should be performed **only on training data**, never on the untouched test set.

---

# 🧪 22. Recommended Validation Checks

Before moving to model training, verify:

### Target

```python
print(y.value_counts())
print(y.isna().sum())
```

Expected:

```text
No unexpected NaN values in y
```

### Train/Test sizes

```python
print(X_train.shape)
print(X_test.shape)
```

### Missing values

```python
print(X_train.isna().sum().sum())
print(X_test.isna().sum().sum())
```

### Ordinal order

```python
print(ordinal)
```

Confirm:

```text
General Health
Highest Grade
Income
```

### Transformed feature dimensions

```python
print(X_train_transformed.shape)
print(X_test_transformed.shape)
```

Both must have the same number of columns.

---

# 🚨 23. Current Implementation Checks

The preprocessing design is fundamentally sound, but the implementation should be checked for the following before being considered final:

| Check | Status |
|---|---|
| Target missing rows removed | ✅ |
| Duplicate rows removed | ✅ |
| Train/test split before learned preprocessing | ✅ |
| Numerical imputation fitted on train | ✅ |
| Numerical imputation applied to test | ✅ |
| Categorical imputation function exists | ⚠️ Ensure it is called |
| Ordinal variables identified | ✅ |
| Ordinal order confirmed | ✅ |
| General Health category order | ✅ |
| Education category order | ✅ |
| Income category order | ✅ |
| One-hot encoding | ✅ |
| Unknown-category handling | ⚠️ Prefer `handle_unknown="ignore"` |
| Transformer fitted only on train | ✅ |
| Test transformed using fitted transformer | ✅ |
| Pre-transformed data saved | ✅ |
| Post-transformed data saved | ✅ |
| Fitted transformer saved | ⚠️ Should be added |
| Class imbalance addressed | ⏭️ Model-training stage |

---

# 🏁 24. Final Preprocessing Workflow

The final documented workflow can be summarized as:

```text
1. Load decoded dataset + codebook
              ↓
2. Select relevant features
              ↓
3. Rename SAS variables using codebook
              ↓
4. Correct deterministic representations
   • BMI scaling
   • numeric type conversion
              ↓
5. Clean textual response values
              ↓
6. Convert uninformative responses to NaN
              ↓
7. Remove rows with missing target
              ↓
8. Remove duplicate rows
              ↓
9. Separate X and y
              ↓
10. Train/test split
              ↓
11. Fit numerical imputer on TRAIN
              ↓
12. Apply numerical imputer to TRAIN + TEST
              ↓
13. Fit categorical imputer on TRAIN
              ↓
14. Apply categorical imputer to TRAIN + TEST
              ↓
15. Identify binary / nominal / ordinal variables
              ↓
16. Define ordinal category order
              ↓
17. Build ColumnTransformer
              ↓
18. Fit transformer on TRAIN
              ↓
19. Transform TRAIN
              ↓
20. Transform TEST using the same fitted transformer
              ↓
21. Save pre-transformed datasets
              ↓
22. Save post-transformed datasets
              ↓
23. Save fitted preprocessing transformer
              ↓
24. Begin ML modelling
```

---

# ✅ Conclusion

The preprocessing pipeline establishes a clear separation between:

**data cleaning → missing-value handling → train/test separation → encoding → model-ready data.**

The most important reproducibility principle is:

> **Anything that learns from the data must learn from the training set only.**

The three saved data representations provide a useful audit trail from the original decoded dataset to the final model-ready representation.

---

## 📁 Recommended Project Structure

```text
dataset/
│
├── raw/
│   └── original_data
│
├── processed/
│   ├── decoded_data.csv
│   ├── codebook.json
│   │
│   ├── Train.csv
│   ├── Test.csv
│   │
│   ├── transformed_train.csv
│   ├── transformed_test.csv
│   │
│   └── preprocessor.pkl
│
└── README.md
```

### 🎯 Next Stage

After preprocessing is finalized, the next stage is **model training and evaluation**.

At that stage, keep the test set untouched and compare baseline, class-weighted, and resampling approaches using minority-class-focused metrics.
