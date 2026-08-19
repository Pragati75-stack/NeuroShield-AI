# Data Preprocessing Report

**Project:** NeuroShield AI — Explainable Machine Learning Framework for Stroke Risk Prediction
**Created by:** Nitya Zijoo
**Last Updated:** 19 August 2026

---

## 1. About Data Preprocessing

Data preprocessing is a critical step in a machine learning pipeline. Raw datasets often contain missing values, irrelevant variables, inconsistent data types, redundant information, and features that are not suitable for direct model training.

For the NeuroShield AI project, preprocessing was performed to transform the raw BRFSS dataset into a clean, consistent, and model-ready dataset for stroke risk prediction.

The preprocessing pipeline focuses on:

* Identifying columns with excessive missing values.
* Removing features that provide insufficient information.
* Handling missing values appropriately.
* Selecting relevant features for stroke prediction.
* Preparing the target variable.
* Splitting the dataset into training and testing sets.
* Ensuring that preprocessing decisions do not introduce data leakage.
* Producing clean datasets that can be directly used for model training.

---

# 2. Dataset Overview

The following table summarizes the dataset before and after preprocessing.

| Property           |                  Before Cleaning |      After Cleaning |
| ------------------ | -------------------------------: | ------------------: |
| Number of rows     |                          433,323 |            253,291* |
| Number of columns  |                              350 |                  26 |
| Missing cells      | See missing-value analysis below |     0 in train/test |
| Class distribution |              See target analysis | See target analysis |

*The final dataset is divided into **202,636 training records** and **50,655 testing records**, giving a total of **253,291 records**.

---

# 3. Dataset Before Preprocessing

## 3.1 Dataset Shape

The raw dataset contains:

* **Rows:** 433,323
* **Columns:** 350

The raw dataset contains a large number of variables covering demographic information, health conditions, lifestyle factors, healthcare access, physical activity, smoking, alcohol consumption, and other survey responses.

Because the raw dataset contains 350 variables, many of which have substantial amounts of missing data, preprocessing is necessary before model development.

---

## 3.2 Missing-Value Analysis

Missing-value analysis revealed substantial sparsity across many variables.

Several columns contain nearly complete or complete missingness. For example:

| Column     | Missing Count | Missing Percentage |
| ---------- | ------------: | -----------------: |
| `SUNPRTCT` |       433,323 |            100.00% |
| `WKENDOUT` |       433,323 |            100.00% |
| `WKDAYOUT` |       433,323 |            100.00% |
| `NUMBURN3` |       433,323 |            100.00% |
| `COLGHOUS` |       433,311 |            100.00% |
| `INDORTAN` |       433,323 |            100.00% |
| `LASTSIG4` |       433,177 |             99.97% |
| `LNDSXBRT` |       433,154 |             99.96% |
| `CSRVCTL2` |       433,101 |             99.95% |

The raw missing-value analysis shows that a substantial number of features have extremely high missingness.

Keeping such variables would add noise while providing little useful information to the machine learning model.

---

# 4. Preprocessing Strategy

The preprocessing pipeline was designed around the following principles.

## 4.1 Remove Highly Missing Features

Features with excessive missing values were removed rather than attempting to impute them.

This prevents highly incomplete variables from introducing unnecessary noise into the dataset.

---

## 4.2 Select Relevant Features

After examining the available variables, a smaller set of clinically and analytically relevant features was retained for stroke prediction.

The final feature set contains 26 variables:

```text
['_AGE80', 'SEXVAR', '_BMI5', '_RFHYPE6', 'DIABETE4',
 'SMOKE100', '_SMOKER3', '_MICHD', 'CVDINFR4', 'CVDCRHD4',
 'TOLDHI3', 'CHOLMED3', 'CHCKDNY2', 'EXERANY2', '_TOTINDA',
 '_PAINDX3', 'PAMIN13_', '_PA30023', 'GENHLTH', 'PHYSHLTH',
 'MENTHLTH', 'EDUCA', 'INCOME3', 'EMPLOY1', 'MARITAL',
 'CVDSTRK3']
```

These variables represent demographic, lifestyle, health, socioeconomic, and cardiovascular-related information relevant to the prediction task.

---

## 4.3 Target Variable

`CVDSTRK3` is retained as the target variable for stroke-risk prediction.

The target variable represents whether the respondent reported having experienced a stroke.

It is therefore separated from the predictive features when preparing the machine learning data.

---

## 4.4 Handling Missing Values

After the preprocessing stage, the retained variables contain no missing values in the generated training and testing datasets.

For the training dataset, all 26 columns contain:

* **Missing values:** 0
* **Missing percentage:** 0.0%
* **Non-missing values:** 202,636

This is confirmed by the generated training-data report.

Similarly, all 26 columns in the testing dataset contain:

* **Missing values:** 0
* **Missing percentage:** 0.0%
* **Non-missing values:** 50,655

---

# 5. Train-Test Split

The cleaned dataset was divided into training and testing datasets.

### Training Dataset

**Shape:** `(202636, 26)`

### Testing Dataset

**Shape:** `(50655, 26)`

The final datasets therefore contain:

**Total records = 202,636 + 50,655 = 253,291**

The training and testing datasets contain the same 26 features and have no missing values according to the preprocessing report.

---

# 6. After Preprocessing

After preprocessing, the dataset was reduced from:

**433,323 rows × 350 columns**

to:

**253,291 records × 26 columns**

distributed as:

| Dataset  |    Rows | Columns |
| -------- | ------: | ------: |
| Training | 202,636 |      26 |
| Testing  |  50,655 |      26 |
| Total    | 253,291 |      26 |

The reduction in the number of features substantially decreases the dimensionality of the dataset while retaining the variables selected for the stroke prediction task.

---

# 7. Data Quality After Preprocessing

The resulting datasets satisfy the following conditions:

* All retained features are present in both training and testing datasets.
* No missing values remain in the generated train/test datasets.
* The same feature structure is maintained across training and testing data.
* The target variable `CVDSTRK3` is retained for the prediction task.
* The raw high-dimensional dataset is not directly used for model training.

The final training dataset contains 202,636 records and the final testing dataset contains 50,655 records.

---

# 8. Before vs After Summary

| Metric                                  | Before Preprocessing |                After Preprocessing |
| --------------------------------------- | -------------------: | ---------------------------------: |
| Rows                                    |              433,323 |                            253,291 |
| Columns                                 |                  350 |                                 26 |
| Training rows                           |                    — |                            202,636 |
| Testing rows                            |                    — |                             50,655 |
| Missing values in final train/test data |              Present |                                  0 |
| Dataset purpose                         |      Raw survey data | Model-ready stroke prediction data |

---

# 9. Conclusion

The preprocessing stage transformed the original high-dimensional BRFSS dataset into a cleaner and more manageable dataset suitable for machine learning.

The number of features was reduced from **350 to 26**, while the final dataset was divided into **202,636 training records** and **50,655 testing records**. The generated training and testing datasets contain no missing values across the retained features.

This preprocessing step provides a consistent foundation for the subsequent exploratory data analysis, model training, hyperparameter tuning, and explainability stages of the NeuroShield AI framework.

---

## 10. Output Files

The preprocessing pipeline generates the following model-ready datasets:

* `dataset/processed/train.csv`
* `dataset/processed/test.csv`
* `dataset/processed/cleaned_stroke_dataset.csv`

The preprocessing implementation is maintained in:

```text
src/Preprocess.py
```

The associated preprocessing notebooks are maintained under:

```text
notebooks/
```

These files provide reproducibility and allow the preprocessing workflow to be reviewed and reused during future model development.
