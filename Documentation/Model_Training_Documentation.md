# NeuroShield AI --- Model Training and Evaluation Documentation

## 1. Overview

This document describes the machine-learning workflow implemented in
`Model_Training(1).ipynb` for binary stroke classification.

The notebook compares multiple classification algorithms while
explicitly addressing severe class imbalance and avoiding test-set
leakage during model selection.

> **Important:** This workflow is a machine-learning
> research/prototyping workflow and is not a standalone clinical
> diagnostic system.

------------------------------------------------------------------------

## 2. Objective

The objective is to train and compare models that predict the binary
stroke target:

`Ever_told_you_had_a_stroke`

The workflow evaluates:

-   Logistic Regression
-   Random Forest
-   HistGradientBoosting
-   XGBoost
-   LightGBM

The models are compared using metrics appropriate for an imbalanced
binary classification problem.

------------------------------------------------------------------------

## 3. Data Loading

The notebook loads:

-   `../dataset/processed/transformed_train.csv`
-   `../dataset/processed/transformed_test.csv`

Observed dimensions:

  Dataset         Rows   Columns
  ---------- --------- ---------
  Training     345,242        48
  Test          86,311        48

After separating the target, there are:

-   **47 predictor features**
-   **1 binary target**

The notebook verifies that training and test feature sets are aligned.

------------------------------------------------------------------------

## 4. Feature-Name Cleaning

The transformed data may contain preprocessing prefixes such as:

-   `binary__`
-   `multi__`
-   `ordinal__`
-   `remainder__`

The notebook removes these prefixes and replaces problematic characters
with underscores.

Column names are converted to lowercase and repeated underscores are
collapsed.

The same cleaning function is applied to both training and test datasets
so that feature names and ordering remain consistent.

This was particularly important for compatibility with gradient-boosting
libraries.

------------------------------------------------------------------------

## 5. Data Integrity Checks

The notebook verifies:

-   Target existence.
-   Target encoding as binary 0/1.
-   Training/test feature alignment.
-   Missing values.
-   Target distributions.

The transformed datasets contain no missing values according to the
notebook's checks.

------------------------------------------------------------------------

## 6. Target Distribution and Class Imbalance

The training target distribution is:

  Class                 Count   Proportion
  ----------------- --------- ------------
  0 --- No Stroke     330,571       95.75%
  1 --- Stroke         14,671        4.25%

The test distribution is:

  Class                Count   Proportion
  ----------------- -------- ------------
  0 --- No Stroke     82,643       95.75%
  1 --- Stroke         3,668        4.25%

This is a severe class imbalance.

Therefore, accuracy alone is not sufficient to evaluate the models.

------------------------------------------------------------------------

## 7. Train/Validation/Test Strategy

The original training data is divided into:

-   **80% training subset**
-   **20% validation subset**

The split is stratified.

Resulting training subset:

-   276,193 observations
-   11,737 positive stroke observations
-   264,456 non-stroke observations

Validation subset:

-   69,049 observations
-   2,934 positive stroke observations
-   66,115 non-stroke observations

The original test set remains untouched during model selection and
threshold tuning.

------------------------------------------------------------------------

## 8. Class-Imbalance Handling

Different algorithms use different imbalance-handling strategies.

### Logistic Regression

Uses:

`class_weight="balanced"`

### Random Forest

Uses:

`class_weight="balanced"`

### XGBoost and LightGBM

Use a calculated positive-class weight:

`negative_count / positive_count`

The training split produced a positive-class weight of approximately:

**22.532**

HistGradientBoosting is retained as a comparison model within the same
evaluation framework.

------------------------------------------------------------------------

## 9. Models Trained

### 9.1 Logistic Regression

Used as a linear baseline with balanced class weighting.

### 9.2 Random Forest

Uses multiple decision trees with:

-   400 estimators
-   Balanced class weighting
-   Minimum leaf size of 2

### 9.3 HistGradientBoosting

Configured with:

-   300 boosting iterations
-   Learning rate = 0.05
-   Maximum leaf nodes = 31
-   L2 regularization = 1.0

### 9.4 XGBoost

Configured with:

-   500 estimators
-   Learning rate = 0.05
-   Maximum depth = 6
-   Minimum child weight = 2
-   Subsample = 0.8
-   Column sampling = 0.8
-   Positive-class weighting

### 9.5 LightGBM

Configured with:

-   500 estimators
-   Learning rate = 0.05
-   31 leaves
-   Minimum child samples = 20
-   Positive-class weighting

------------------------------------------------------------------------

## 10. Evaluation Metrics

The notebook reports:

-   Accuracy
-   Precision
-   Recall
-   F1-score
-   ROC-AUC
-   PR-AUC / Average Precision
-   Classification threshold
-   Confusion matrix
-   Precision-Recall curves
-   ROC curves

Because the stroke class is rare, **PR-AUC is used as a primary
model-selection metric**, together with F1, recall, and precision.

------------------------------------------------------------------------

## 11. Threshold Tuning

The default classification threshold is normally 0.50.

For this imbalanced problem, a 0.50 threshold can produce very few
positive predictions.

The notebook therefore searches thresholds from 0.01 to 0.99 and selects
the threshold that maximizes validation F1-score.

The threshold is selected using the validation set only.

It is an empirical model-selection threshold and **not a clinical
decision threshold**.

------------------------------------------------------------------------

## 12. Validation Results

The validation results recorded in the notebook are:

  ----------------------------------------------------------------------------------------------------
  Model                    Accuracy   Precision    Recall        F1   ROC-AUC       PR-AUC   Threshold
  ---------------------- ---------- ----------- --------- --------- --------- ------------ -----------
  HistGradientBoosting       90.63%      19.89%    39.78%    26.52%    82.90%   **18.83%**       0.125

  LightGBM                   91.59%      20.78%    34.83%    26.03%    82.51%       18.56%       0.765

  Logistic Regression        91.22%      20.36%    36.61%    26.17%    82.45%       18.23%       0.780

  XGBoost                    90.71%      19.50%    37.90%    25.75%    82.16%       18.22%       0.740

  Random Forest              88.64%      16.86%    42.60%    24.16%    81.61%       16.24%       0.250
  ----------------------------------------------------------------------------------------------------

The model selected by the notebook is **HistGradientBoosting**, based on
the highest validation PR-AUC.

------------------------------------------------------------------------

## 13. Final Test Evaluation

The selected HistGradientBoosting model was evaluated on the untouched
test set.

### Default threshold: 0.50

-   Accuracy: **95.75%**
-   Precision: **0%**
-   Recall: **0%**
-   F1: **0%**
-   ROC-AUC: **82.56%**
-   PR-AUC: **18.76%**

The zero positive-class metrics demonstrate why accuracy alone is
misleading for this problem.

### Validation-tuned threshold: 0.125

-   Accuracy: **90.42%**
-   Precision: **19.24%**
-   Recall: **39.26%**
-   F1: **25.82%**
-   ROC-AUC: **82.56%**
-   PR-AUC: **18.76%**

The validation-selected threshold increases positive-case detection
while reducing overall accuracy.

------------------------------------------------------------------------

## 14. Final Classification Report

Using the validation-tuned threshold on the test set:

  Class         Precision   Recall       F1   Support
  ----------- ----------- -------- -------- ---------
  No Stroke        97.17%   92.69%   94.88%    82,643
  Stroke           19.24%   39.26%   25.82%     3,668

Overall accuracy is **90.42%**.

The macro and weighted averages are also reported by the notebook.

------------------------------------------------------------------------

## 15. Visual Evaluation

The notebook produces:

### Confusion Matrix

Shows:

-   True negatives
-   False positives
-   False negatives
-   True positives

### Precision-Recall Curves

Used to compare the precision-recall trade-off across models.

### ROC Curves

Used to compare discrimination performance across models.

------------------------------------------------------------------------

## 16. Model Selection

HistGradientBoosting is selected because it achieved the highest
validation PR-AUC:

**PR-AUC = 0.1883**

The selected validation threshold is:

**0.125**

Model selection is based on validation data, not the final test results.

------------------------------------------------------------------------

## 17. Final Model Training and Saving

After model selection, the selected algorithm is refit on the complete
training dataset containing:

**345,242 records**

The final model is:

**HistGradientBoosting**

The stored threshold is:

**0.125**

The notebook saves:

-   `../models/stroke_model_final.pkl`
-   `../models/stroke_model_metadata.pkl`

The metadata contains:

-   Model name
-   Threshold
-   Target
-   Feature columns
-   Random state

Saving the threshold is important because future inference using
`predict_proba()` must apply the same threshold to reproduce the model's
intended classification behavior.

------------------------------------------------------------------------

## 18. Limitations and Future Work

The notebook's model is a research/prototyping model.

Future work should include:

-   Precision-Recall analysis under alternative operating points.
-   Probability calibration.
-   External validation.
-   Subgroup/fairness analysis.
-   Further hyperparameter tuning.
-   Explainability such as SHAP.
-   Evaluation on an independent population.
-   Clinical validation before any real-world medical application.

The model should not be presented as a standalone diagnostic system.

------------------------------------------------------------------------

## 19. Conclusion

The model-training workflow demonstrates that class imbalance and
classification thresholds substantially affect stroke-prediction
performance.

HistGradientBoosting produced the highest validation PR-AUC among the
tested models and was selected for final training.

The evaluation emphasizes PR-AUC, recall, precision, F1-score, ROC-AUC,
confusion matrices, and threshold selection rather than relying on
accuracy alone.
