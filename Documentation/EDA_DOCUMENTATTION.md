# Stroke Dataset — Complete EDA Question & Observation Guide

## Purpose

This document is a structured EDA checklist for the stroke dataset.  
For **every question**, record the actual result under the **Observation** subsection.  
Do not leave observations as generic explanations; write what the dataset shows.

---

# SECTION 1 — DATASET OVERVIEW

## Q1. What is the shape of the dataset?
Check:
- Number of rows
- Number of columns

### Observation
Record the exact dataset dimensions and explain what they imply about the dataset size.

---

## Q2. What are the names of all features?
List every feature/column in the dataset.

### Observation
Identify the target variable and briefly group the remaining variables by their role or type.

---

## Q3. What are the data types of all variables?
Check whether each variable is numerical, categorical, ordinal, binary, etc.

### Observation
Report the number of variables in each major type and identify anything that appears incorrectly typed.

---

## Q4. How many numerical and categorical variables are present?
Separate continuous/discrete numerical variables from categorical variables.

### Observation
State the counts and identify the variables in each group.

---

## Q5. What are the descriptive statistics of numerical variables?
Use:
- Count
- Mean
- Standard deviation
- Minimum
- Quartiles
- Maximum

### Observation
Mention important ranges, unusual values, large variation, and possible outliers.

---

## Q6. What unique values are present in categorical variables?
Inspect the unique categories for each categorical feature.

### Observation
Identify expected categories, rare categories, inconsistent labels, and possible missing-value codes.

---

# SECTION 2 — DATA QUALITY & INTEGRITY

## Q7. How many missing values are present in each feature?

### Observation
Identify variables with missing values and determine whether missingness is negligible or substantial.

---

## Q8. Are there any missing values in the target variable?

### Observation
Report the number of missing target records and explain how they were handled.

---

## Q9. Are there duplicate rows?

### Observation
Report the number and percentage of duplicate rows and whether they were removed.

---

## Q10. Are there suspicious or impossible numerical values?
Check variables such as:
- Age
- BMI
- Physical health days
- Mental health days
- Physical activity minutes

### Observation
List suspicious values and state whether they represent valid special codes, data-entry issues, or true observations.

---

## Q11. Are there unexpected categorical values?

### Observation
Identify categories that do not match the expected coding or category definitions.

---

## Q12. How much did cleaning change the dataset?

### Observation
Compare row count and feature values before and after cleaning, decoding, duplicate removal, and missing-value handling.

---

# SECTION 3 — TARGET VARIABLE: STROKE DISTRIBUTION

## Q13. How many participants have had a stroke and how many have not?

### Observation
Report the exact counts for `No` and `Yes`.

---

## Q14. What percentage of participants belong to each stroke class?

### Observation
Report the percentage of each class.

---

## Q15. Is the target variable imbalanced?

### Observation
Describe the severity of the class imbalance.

---

## Q16. What does the class imbalance mean for machine learning?

### Observation
Explain how imbalance can affect accuracy, minority-class recall, precision, F1-score, ROC-AUC, and PR-AUC.

---

## Q17. What is the stroke distribution in the training set?

### Observation
Report training-set class counts and percentages.

---

## Q18. What is the stroke distribution in the test set?

### Observation
Report test-set class counts and percentages and compare them with training data.

---

# SECTION 4 — NUMERICAL FEATURE ANALYSIS

## Q19. What is the distribution of Age?

### Observation
Describe whether age is concentrated in younger, middle-aged, or older groups and whether the distribution is skewed.

---

## Q20. What is the distribution of BMI?

### Observation
Describe the central tendency, spread, skewness, and unusual BMI values.

---

## Q21. What is the distribution of Physical Activity Minutes?

### Observation
Identify concentration, skewness, zeros, and extreme values.

---

## Q22. What is the distribution of Physical Health Days?

### Observation
Describe the distribution and concentration of reported unhealthy days.

---

## Q23. What is the distribution of Mental Health Days?

### Observation
Describe the distribution and identify unusual concentrations or extreme values.

---

## Q24. Which numerical variable has the greatest variability?

### Observation
Compare standard deviations, IQRs, or appropriate scale-adjusted measures.

---

## Q25. Which numerical variables are highly skewed?

### Observation
Identify strongly right-skewed or left-skewed variables and explain whether transformations may be useful.

---

# SECTION 5 — CATEGORICAL FEATURE ANALYSIS

## Q26. What is the frequency distribution of each binary variable?

### Observation
Report dominant and minority categories and identify highly unbalanced features.

---

## Q27. What is the frequency distribution of each multi-category variable?

### Observation
Identify dominant categories, rare categories, and whether any category contains very few observations.

---

## Q28. Which categorical variables are highly imbalanced?

### Observation
Identify variables where one category dominates most observations.

---

## Q29. Are there rare categories that may create modelling problems?

### Observation
List categories with very low frequency and discuss whether grouping may be necessary.

---

## Q30. What is the distribution of General Health?

### Observation
Report the frequency of:
- Poor
- Fair
- Good
- Very good
- Excellent

---

## Q31. What is the distribution of Education?

### Observation
Report the frequency of each education level and identify the dominant level.

---

## Q32. What is the distribution of Income?

### Observation
Report the frequency across income categories and identify concentration toward lower or higher income levels.

---

# SECTION 6 — NUMERICAL FEATURES VS STROKE

## Q33. Does Age differ between people with and without stroke?

### Observation
Compare age distributions using histogram, KDE, boxplot, or violinplot.

---

## Q34. Does BMI differ between stroke classes?

### Observation
Compare BMI distributions between stroke and non-stroke groups.

---

## Q35. Does Physical Activity differ between stroke classes?

### Observation
Compare physical activity distributions by stroke status.

---

## Q36. Does Physical Health differ between stroke classes?

### Observation
Compare physical-health-day distributions by stroke status.

---

## Q37. Does Mental Health differ between stroke classes?

### Observation
Compare mental-health-day distributions by stroke status.

---

## Q38. Which numerical feature shows the clearest separation between stroke classes?

### Observation
Identify the feature with the most visible or statistically meaningful difference.

---

# SECTION 7 — CATEGORICAL FEATURES VS STROKE

## Q39. Is stroke prevalence different by hypertension status?

### Observation
Compare stroke percentage among people with and without hypertension.

---

## Q40. Is stroke prevalence different by heart-disease status?

### Observation
Compare stroke prevalence across heart-disease categories.

---

## Q41. Is stroke prevalence different by diabetes status?

### Observation
Compare stroke prevalence across diabetes categories.

---

## Q42. Is stroke prevalence different by smoking status?

### Observation
Compare stroke prevalence across smoking categories.

---

## Q43. Is stroke prevalence different by physical-activity status?

### Observation
Compare stroke prevalence between physically active and inactive groups.

---

## Q44. Is stroke prevalence different by General Health?

### Observation
Compare stroke percentage across Poor, Fair, Good, Very good, and Excellent health.

---

## Q45. Is stroke prevalence different by Education?

### Observation
Compare stroke prevalence across education levels.

---

## Q46. Is stroke prevalence different by Income?

### Observation
Compare stroke prevalence across income categories.

---

# SECTION 8 — ORDINAL FEATURES VS STROKE

## Q47. Does stroke prevalence change as General Health worsens?

### Observation
Look for a monotonic pattern from Excellent to Poor.

---

## Q48. Does stroke prevalence vary across Education levels?

### Observation
Determine whether stroke prevalence shows an increasing, decreasing, or irregular pattern.

---

## Q49. Does stroke prevalence vary across Income levels?

### Observation
Determine whether stroke prevalence changes systematically across income categories.

---

## Q50. Are ordinal variables suitable for ordinal encoding?

### Observation
Confirm whether their categories have a meaningful natural order and document the chosen order.

---

# SECTION 9 — AGE ANALYSIS

## Q51. Which age groups have the highest stroke prevalence?

### Observation
Create meaningful age groups and compare stroke prevalence.

---

## Q52. Does stroke prevalence increase with age?

### Observation
Describe the overall trend and whether it is approximately monotonic.

---

## Q53. Which age range contains most stroke cases?

### Observation
Identify the age range contributing the largest number of stroke-positive observations.

---

## Q54. Is age associated with other major risk factors?

### Observation
Examine relationships between age and hypertension, heart disease, diabetes, BMI, and general health.

---

## Q55. Are there extreme age values?

### Observation
Check the dataset's age limits and explain how special age coding was handled.

---

# SECTION 10 — BMI ANALYSIS

## Q56. What is the overall BMI distribution?

### Observation
Describe the distribution after correct BMI conversion.

---

## Q57. Are there BMI outliers?

### Observation
Use boxplot/IQR or another suitable method and distinguish valid extreme values from errors.

---

## Q58. Does BMI differ by stroke status?

### Observation
Compare BMI distributions for stroke and non-stroke groups.

---

## Q59. Which BMI ranges have the highest stroke prevalence?

### Observation
Group BMI into meaningful categories and compare prevalence.

---

## Q60. Is BMI associated with Age?

### Observation
Use scatterplot/correlation or grouped analysis.

---

# SECTION 11 — PHYSICAL & MENTAL HEALTH ANALYSIS

## Q61. Do Physical Health Days differ by stroke status?

### Observation
Compare distributions and central tendencies.

---

## Q62. Do Mental Health Days differ by stroke status?

### Observation
Compare distributions and central tendencies.

---

## Q63. Are Physical Health Days and Mental Health Days correlated?

### Observation
Describe the direction and strength of their relationship.

---

## Q64. Are people reporting poor general health more likely to have high Physical Health Days?

### Observation
Compare physical-health-day distributions across General Health categories.

---

## Q65. Are poor mental-health indicators concentrated in particular groups?

### Observation
Compare Mental Health Days across age, stroke status, and General Health.

---

# SECTION 12 — RELATIONSHIPS BETWEEN NUMERICAL FEATURES

## Q66. Is Age correlated with BMI?

### Observation
Report correlation strength and direction.

---

## Q67. Is Age correlated with Physical Activity?

### Observation
Describe the relationship and its strength.

---

## Q68. Is Age correlated with Physical Health Days?

### Observation
Describe the relationship.

---

## Q69. Is Age correlated with Mental Health Days?

### Observation
Describe the relationship.

---

## Q70. Is BMI correlated with Physical Activity?

### Observation
Describe the direction and strength.

---

## Q71. Which pair of numerical variables has the strongest relationship?

### Observation
Identify the pair and report the correlation coefficient.

---

# SECTION 13 — CORRELATION & MULTICOLLINEARITY

## Q72. What does the numerical correlation heatmap show?

### Observation
Identify strong positive and negative correlations.

---

## Q73. Are any numerical variables highly correlated?

### Observation
List potentially redundant variable pairs.

---

## Q74. Is there evidence of multicollinearity?

### Observation
Use correlation and, where appropriate, VIF or another diagnostic.

---

## Q75. Which features may provide redundant information?

### Observation
Identify variables that may contain overlapping information.

---

## Q76. Does the target show a strong numerical relationship with any numerical feature?

### Observation
Discuss target-feature associations without interpreting correlation as causation.

---

# SECTION 14 — INTERACTION ANALYSIS

## Q77. Does Age interact with Hypertension in relation to stroke?

### Observation
Compare stroke prevalence across age groups and hypertension status.

---

## Q78. Does Age interact with Heart Disease?

### Observation
Compare stroke prevalence for age groups split by heart-disease status.

---

## Q79. Does Age interact with Diabetes?

### Observation
Compare stroke prevalence across age and diabetes groups.

---

## Q80. Does General Health interact with Age?

### Observation
Determine whether poor health is associated with stroke differently across age groups.

---

## Q81. Does Physical Activity interact with Age?

### Observation
Check whether the relationship between activity and stroke changes across age groups.

---

## Q82. Which interaction appears most informative?

### Observation
Identify the interaction that produces the clearest difference in stroke prevalence.

---

# SECTION 15 — OUTLIER ANALYSIS

## Q83. Which numerical variables contain outliers?

### Observation
Use boxplots and IQR-based analysis to identify potential outliers.

---

## Q84. Are the outliers errors or valid observations?

### Observation
Explain whether extreme values are plausible for the variable.

---

## Q85. How do outliers affect the mean?

### Observation
Compare mean and median where appropriate.

---

## Q86. Should outliers be removed, capped, transformed, or retained?

### Observation
Give a dataset-specific decision and justification.

---

# SECTION 16 — TRAIN/TEST DISTRIBUTION CHECK

## Q87. Are the training and test set sizes appropriate?

### Observation
Report the number of rows in each set and the split ratio.

---

## Q88. Is the stroke proportion similar in train and test sets?

### Observation
Compare class percentages and identify any meaningful difference.

---

## Q89. Are numerical feature distributions similar between train and test?

### Observation
Compare Age, BMI, activity, physical health, and mental health.

---

## Q90. Are categorical feature distributions similar between train and test?

### Observation
Check major category proportions for important variables.

---

## Q91. Is there evidence of train-test distribution shift?

### Observation
Identify variables with noticeably different distributions.

---

# SECTION 17 — POST-TRANSFORMATION CHECKS

## Q92. Did categorical encoding produce the expected number of columns?

### Observation
Report the transformed feature count and verify that binary, multi-category, and ordinal variables were handled as intended.

---

## Q93. Were ordinal categories encoded in the correct order?

### Observation
Verify:
- General Health: Poor → Fair → Good → Very good → Excellent
- Education: lowest → highest
- Income: lowest → highest

---

## Q94. Were numerical missing values imputed correctly?

### Observation
Confirm that the imputer was fitted using training data and then applied to test data.

---

## Q95. Were categorical missing values handled correctly?

### Observation
Confirm whether categorical imputation was performed and document the strategy.

---

## Q96. Were unknown categories handled safely?

### Observation
Verify that the encoder can process categories not seen during training when required.

---

## Q97. Does the transformed dataset contain unexpected NaN or infinite values?

### Observation
Report the exact result.

---

## Q98. Are the transformed train and test columns identical?

### Observation
Confirm that both datasets have the same feature names and ordering.

---

## Q99. Was the target kept separate from feature transformation?

### Observation
Confirm that the target was not accidentally encoded or transformed as a feature.

---

## Q100. Is the preprocessing reproducible?

### Observation
Document whether the fitted preprocessing object is saved and can be reused on new data.

---

# SECTION 18 — FINAL EDA FINDINGS & MACHINE-LEARNING IMPLICATIONS

## Q101. What are the most important characteristics of the dataset?

### Observation
Summarize the major findings about size, variable types, missingness, and target distribution.

---

## Q102. What are the strongest potential stroke-related predictors?

### Observation
List features showing the clearest association with stroke in the EDA.

---

## Q103. Which variables appear weakly associated with stroke?

### Observation
Identify variables where little difference is visible between stroke classes.

---

## Q104. What data-quality issues were discovered?

### Observation
Summarize missing values, duplicates, special codes, inconsistent categories, and suspicious numerical values.

---

## Q105. What preprocessing decisions were required?

### Observation
Document decoding, missing-value treatment, BMI conversion, duplicate removal, encoding, and train/test splitting.

---

## Q106. How should class imbalance be handled?

### Observation
State the selected strategy, such as class weighting or resampling, and explain why it should be applied only to training data.

---

## Q107. Which evaluation metrics should be emphasized?

### Observation
Explain why accuracy alone may be insufficient and identify appropriate metrics such as recall, precision, F1-score, ROC-AUC, and PR-AUC.

---

## Q108. What potential data leakage risks exist?

### Observation
Check whether any preprocessing, imputation, scaling, encoding, feature selection, or resampling was fitted using test data.

---

## Q109. What are the limitations of this EDA?

### Observation
Document limitations such as observational data, self-reported variables, class imbalance, missing information, and inability to infer causality.

---

## Q110. What are the final hypotheses for machine learning?

### Observation
Write the main hypotheses that the modelling stage will test.

---

# FINAL EDA CHECKLIST

Before moving to machine learning, confirm:

- [ ] Dataset dimensions documented
- [ ] All features documented
- [ ] Data types checked
- [ ] Numerical variables analyzed
- [ ] Categorical variables analyzed
- [ ] Missing values analyzed
- [ ] Duplicates checked
- [ ] Special codes decoded
- [ ] Target distribution documented
- [ ] Class imbalance documented
- [ ] Age analyzed
- [ ] BMI analyzed
- [ ] Physical activity analyzed
- [ ] Physical health analyzed
- [ ] Mental health analyzed
- [ ] Major categorical variables compared with stroke
- [ ] Ordinal variables analyzed in their natural order
- [ ] Correlation analyzed
- [ ] Multicollinearity checked where appropriate
- [ ] Outliers checked
- [ ] Important interactions explored
- [ ] Train/test distributions compared
- [ ] Encoding verified
- [ ] Imputation verified
- [ ] No unexpected NaN/infinite values remain
- [ ] Train/test feature columns match
- [ ] Leakage risks checked
- [ ] ML implications documented

---

# RECOMMENDED CORE EDA SET

If you need a shorter presentation-ready EDA, prioritize:

1. Dataset shape and feature types
2. Missing values and duplicates
3. Stroke class distribution
4. Age distribution
5. BMI distribution
6. Numerical-feature boxplots
7. Stroke vs Age
8. Stroke vs BMI
9. Hypertension vs Stroke
10. Heart Disease vs Stroke
11. Diabetes vs Stroke
12. Smoking vs Stroke
13. Physical Activity vs Stroke
14. General Health vs Stroke
15. Education vs Stroke
16. Income vs Stroke
17. Physical Health vs Stroke
18. Mental Health vs Stroke
19. Numerical correlation heatmap
20. Train/test distribution comparison

---

# OBSERVATION WRITING TEMPLATE

For each analysis, write observations in this format:

**Observation:**
- **What is visible?** State the direct pattern.
- **How large is the difference?** Give counts or percentages where possible.
- **Is the pattern consistent?** Mention exceptions or irregularities.
- **What does it imply for modelling?** Explain the practical ML relevance.
- **What should NOT be concluded?** Avoid claiming causation from observational EDA.

**Example structure:**

> Stroke cases are much less frequent than non-stroke cases, indicating substantial class imbalance. Therefore, accuracy alone may give an overly optimistic impression of model performance. Minority-class recall, precision, F1-score, and PR-AUC should receive particular attention during evaluation.
