# NeuroShield AI --- Exploratory Data Analysis Documentation

## 1. Overview

This document describes the Exploratory Data Analysis (EDA) workflow
implemented in `Exploratory_Data_Analysis(1).ipynb` for the NeuroShield
AI stroke-risk project.

The notebook is intended to understand the structure, quality,
distributions, relationships, and patterns in the processed stroke
dataset before predictive modeling. It is exploratory in nature and does
not establish medical causation.

------------------------------------------------------------------------

## 2. Dataset Overview

The notebook loads the processed stroke dataset and reports:

-   **Rows:** 345,242
-   **Columns:** 48
-   **Data representation:** numerical encoded variables, including
    binary, multi-category/one-hot, ordinal, and remaining numerical
    variables.
-   **Target:** `Ever_told_you_had_a_stroke` / the stroke indicator
    represented in the processed data.

The dataset contains demographic, socioeconomic, health-history,
lifestyle, physical-health, and mental-health related variables.

------------------------------------------------------------------------

## 3. EDA Objectives

The notebook is organized to:

1.  Understand dataset size and structure.
2.  Inspect data types and column names.
3.  Check missing values and duplicate records.
4.  Examine the stroke target distribution.
5.  Group variables into meaningful analytical categories.
6.  Analyze numerical-variable distributions.
7.  Analyze categorical and binary indicators.
8.  Compare features across stroke and non-stroke groups.
9.  Examine correlations.
10. Detect potential outliers.
11. Produce group-wise summary tables.
12. Provide a structured template for documenting findings.

------------------------------------------------------------------------

## 4. Basic Dataset Understanding

The notebook performs basic structural checks including:

-   Dataset shape.
-   Column names.
-   Data types.
-   Non-null counts.
-   Summary statistics.
-   Missing-value inspection.
-   Duplicate-row inspection.

The notebook reports **233 duplicate rows** in the loaded dataset.

Duplicate detection is used as a data-quality diagnostic. The EDA
notebook does not silently remove these records.

------------------------------------------------------------------------

## 5. Variable Groups

The analysis organizes variables into the following conceptual groups.

### 5.1 Basic User Information

This group contains demographic and socioeconomic indicators such as:

-   Sex
-   Marital status
-   Employment status
-   Household income
-   Education level
-   Imputed/collapsed age

### 5.2 Health and Medical History

This group contains indicators related to:

-   Angina/coronary heart disease
-   Heart attack / myocardial infarction
-   High blood pressure
-   Cholesterol
-   Diabetes
-   Kidney disease
-   Other health-history variables represented in the processed dataset

### 5.3 Lifestyle and Physical Activity

The notebook analyzes variables associated with:

-   Smoking status
-   Physical activity
-   Exercise
-   Aerobic-activity recommendations
-   Weekly physical-activity levels

### 5.4 Physical and Mental Well-being

The EDA also examines variables related to:

-   BMI
-   Physical health days
-   Mental health days
-   Other physical/mental well-being indicators present in the dataset

------------------------------------------------------------------------

## 6. Target Variable Analysis

The notebook explicitly examines the distribution of the stroke target.

This step is important because the project is a binary classification
problem and the positive stroke class is substantially smaller than the
non-stroke class.

The target distribution is visualized and summarized before model
training.

Class imbalance is important when interpreting later model metrics
because high accuracy can be achieved by favoring the majority class.

------------------------------------------------------------------------

## 7. Numerical Variable Analysis

Numerical variables are analyzed using distribution-oriented
visualizations and summary statistics.

The analysis is used to identify:

-   Central tendency.
-   Spread.
-   Skewness or unusual distributions.
-   Differences between stroke groups.
-   Potential extreme observations.

The numerical analysis provides descriptive evidence for later modeling
decisions but does not claim that observed differences cause stroke.

------------------------------------------------------------------------

## 8. Categorical and Binary Variable Analysis

Categorical and binary/encoded indicators are examined using
frequency-based visualizations.

For binary and one-hot encoded variables, the mean within a stroke group
can be interpreted as the proportion of observations for which that
indicator equals 1.

These comparisons help identify variables that may be useful for
subsequent predictive modeling.

------------------------------------------------------------------------

## 9. Relationship Between Variables and Stroke

The notebook compares feature values across stroke and non-stroke
groups.

For encoded indicators, group means are used to describe differences in
indicator prevalence.

For numerical variables, group-wise distributions and summary statistics
are used.

The analysis is intentionally descriptive. Observed associations should
not be interpreted as causal relationships.

------------------------------------------------------------------------

## 10. Correlation Analysis

A correlation matrix is generated for numerical and encoded variables.

The notebook explicitly notes:

> Correlation measures statistical association, not causation.

Because many variables are binary or one-hot encoded, correlations
should be interpreted in the context of the encoding scheme.

The notebook also calculates correlations between individual
numerical/encoded variables and the stroke target and orders them by
absolute correlation magnitude.

------------------------------------------------------------------------

## 11. Outlier Detection

Outlier detection is performed for numerical variables with more than 10
unique values.

Binary and one-hot encoded variables are excluded from this analysis.

The notebook uses the **IQR rule**:

-   Q1 = first quartile
-   Q3 = third quartile
-   IQR = Q3 − Q1
-   Lower bound = Q1 − 1.5 × IQR
-   Upper bound = Q3 + 1.5 × IQR

For each eligible variable, the notebook records:

-   Q1
-   Q3
-   IQR
-   Lower bound
-   Upper bound
-   Outlier count
-   Outlier percentage

An identified outlier is not automatically considered an error; it must
be interpreted in the context of the underlying variable.

------------------------------------------------------------------------

## 12. Group-wise Summary Tables

The notebook creates group-wise summaries by stroke status.

For numerical features, it reports:

-   Mean
-   Median
-   Standard deviation

For low-cardinality features, it calculates:

-   Group count
-   Mean/stroke rate
-   Stroke-rate percentage

These tables provide a compact way to inspect differences between
groups.

------------------------------------------------------------------------

## 13. Interpretation Guidelines

The notebook recommends that EDA findings remain descriptive.

Appropriate statements describe:

-   Differences in distributions.
-   Differences in indicator prevalence.
-   Observed correlations.
-   Data-quality characteristics.
-   Potentially informative variables.

The analysis should **not** state that an observed variable causes
stroke.

------------------------------------------------------------------------

## 14. Limitations

The EDA is based on the processed dataset available to the notebook.

Important limitations include:

-   Exploratory associations do not establish causation.
-   Encoded variables can affect how correlations should be interpreted.
-   Duplicate observations are identified but are not automatically
    removed by this notebook.
-   Outlier detection identifies statistical extremes, not necessarily
    invalid medical observations.
-   EDA results alone cannot establish clinical significance.

------------------------------------------------------------------------

## 15. Conclusion

The EDA notebook establishes the descriptive foundation for NeuroShield
AI by examining the dataset structure, target imbalance, variable
groups, distributions, associations, correlations, outliers, and
group-wise summaries.

The results are intended to inform subsequent preprocessing and
model-development decisions rather than serve as clinical conclusions.
