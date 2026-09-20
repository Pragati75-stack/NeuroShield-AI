# NeuroShield AI --- Deep Learning / TabNet Documentation

## 1. Overview

This document describes the deep-learning experiment implemented in
`DeepLearning.ipynb`.

The notebook evaluates **TabNet**, a deep-learning architecture designed
for tabular data, on the NeuroShield AI binary stroke-classification
problem.

The purpose of this experiment is to determine whether a dedicated
tabular deep-learning model can improve upon the conventional
machine-learning models evaluated in the model-training workflow.

------------------------------------------------------------------------

## 2. Objective

The objective is to train TabNet on the processed stroke dataset and
evaluate it using the same core metrics used for the conventional
machine-learning models.

The experiment focuses on:

-   ROC-AUC
-   PR-AUC
-   Accuracy
-   Precision
-   Recall
-   F1-score
-   Confusion matrix
-   Precision-Recall curve
-   ROC curve

Because the stroke class is highly imbalanced, PR-AUC and recall are
particularly important.

------------------------------------------------------------------------

## 3. Libraries and Frameworks

The notebook uses:

-   NumPy
-   pandas
-   PyTorch
-   pytorch-tabnet
-   scikit-learn
-   Matplotlib
-   Seaborn

The random state is set to:

`42`

The target is:

`Ever_told_you_had_a_stroke`

------------------------------------------------------------------------

## 4. Data Loading

The notebook loads the already-transformed datasets:

-   `../dataset/processed/transformed_train.csv`
-   `../dataset/processed/transformed_test.csv`

The same processed data used for conventional model training is used for
the TabNet experiment to maintain comparability.

------------------------------------------------------------------------

## 5. Feature-Name Cleaning

The notebook applies the same feature-name cleaning strategy used in the
conventional model-training workflow.

The cleaning process:

1.  Removes preprocessing prefixes such as:
    -   `binary__`
    -   `multi__`
    -   `ordinal__`
    -   `remainder__`
2.  Replaces non-alphanumeric characters with underscores.
3.  Collapses repeated underscores.
4.  Removes leading/trailing underscores.
5.  Converts names to lowercase.

The training and test feature sets are explicitly checked for alignment.

This cleaning does not add new features or modify the values of the
predictors. It only standardizes feature names.

------------------------------------------------------------------------

## 6. Train/Validation Split

The training dataset is split into:

-   80% training data
-   20% validation data

The split is stratified using the binary stroke target.

The held-out test dataset is retained separately for final evaluation.

The test set is not used for selecting the TabNet threshold or for model
tuning.

------------------------------------------------------------------------

## 7. Class Imbalance Handling

The stroke dataset has a much smaller positive class than negative
class.

The notebook calculates:

``` text
positive-class weight = number of negative training samples
                       / number of positive training samples
```

This value is passed to TabNet through class weights.

The class weights are:

``` text
Class 0 → 1.0
Class 1 → calculated positive-class weight
```

The weight is a training configuration and **is not added as a column to
the patient feature DataFrame**.

Its purpose is to give the minority stroke class greater influence
during loss calculation.

------------------------------------------------------------------------

## 8. TabNet Architecture and Configuration

The experiment uses `TabNetClassifier`.

Configuration:

-   `n_d = 32`
-   `n_a = 32`
-   `n_steps = 5`
-   `gamma = 1.5`
-   `lambda_sparse = 1e-4`
-   Optimizer: Adam
-   Learning rate: 0.02
-   Mask type: `entmax`
-   Random seed: 42

Training configuration:

-   Maximum epochs: 100
-   Patience: 15
-   Batch size: 2048
-   Virtual batch size: 256

------------------------------------------------------------------------

## 9. Early Stopping

Early stopping is used to prevent unnecessary training and reduce
overfitting.

With:

`patience = 15`

training can stop after the monitored validation performance has failed
to improve for the configured patience period.

The observed training run reported:

``` text
Early stopping occurred at epoch 24
best_epoch = 9
best_valid_logloss = 0.47011
```

The training AUC continued to increase while validation AUC declined
after its earlier improvement, providing evidence that continued
training was not improving generalization.

------------------------------------------------------------------------

## 10. Probability-Based Evaluation

After training, TabNet generates positive-class probabilities using:

`predict_proba()`

The probability output is used rather than relying only on the default
classification threshold.

This allows:

-   ROC-AUC calculation.
-   PR-AUC calculation.
-   Precision-Recall curve generation.
-   ROC curve generation.
-   Validation-based threshold selection.

------------------------------------------------------------------------

## 11. Validation ROC-AUC and PR-AUC

The recorded TabNet validation results are:

-   **ROC-AUC: 0.823572**
-   **PR-AUC: 0.176435**

ROC-AUC measures ranking/discrimination across classification
thresholds.

PR-AUC is especially informative for this dataset because the positive
stroke class is rare.

------------------------------------------------------------------------

## 12. Precision-Recall Curve

The notebook plots precision against recall across classification
thresholds.

The curve illustrates the trade-off between:

-   Finding more positive stroke cases.
-   Maintaining precision among predicted positive cases.

The calculated area under this curve is:

**PR-AUC = 0.176435**

------------------------------------------------------------------------

## 13. ROC Curve

The notebook plots:

-   False Positive Rate on the x-axis.
-   True Positive Rate on the y-axis.
-   A diagonal random-classifier reference line.

The resulting ROC-AUC is:

**0.823572**

The curve is substantially above the random baseline, indicating useful
discriminative performance.

------------------------------------------------------------------------

## 14. Threshold Optimization

The notebook searches thresholds from:

`0.01` to `0.99`

in increments of `0.01`.

For each threshold, predictions are generated and the validation
F1-score is calculated.

The threshold with the highest validation F1-score is selected.

This threshold is chosen using validation data only and is not a
clinical cutoff.

------------------------------------------------------------------------

## 15. TabNet Validation Results

The recorded validation metrics are:

  Metric            Result
  ----------- ------------
  Accuracy      **89.62%**
  Precision     **18.45%**
  Recall        **42.19%**
  F1-score      **25.68%**
  ROC-AUC       **82.36%**
  PR-AUC        **17.64%**

The confusion matrix from the validation evaluation contains:

                           Predicted No Stroke   Predicted Stroke
  ---------------------- --------------------- ------------------
  **Actual No Stroke**                  60,644              5,471
  **Actual Stroke**                      1,696              1,238

Therefore:

-   True Negative = 60,644
-   False Positive = 5,471
-   False Negative = 1,696
-   True Positive = 1,238

------------------------------------------------------------------------

## 16. Comparison with Conventional Models

The TabNet validation results can be compared with the conventional
model-training results.

  Model                       ROC-AUC       PR-AUC       Recall           F1
  ---------------------- ------------ ------------ ------------ ------------
  HistGradientBoosting         0.8290       0.1883       39.78%       26.52%
  LightGBM                     0.8251       0.1856       34.83%       26.03%
  Logistic Regression          0.8245       0.1823       36.61%       26.17%
  XGBoost                      0.8216       0.1822       37.90%       25.75%
  Random Forest                0.8161       0.1624       42.60%       24.16%
  **TabNet**               **0.8236**   **0.1764**   **42.19%**   **25.68%**

In this experiment, TabNet has higher validation recall than
HistGradientBoosting, but lower PR-AUC, precision, F1-score, and
ROC-AUC.

Therefore, the current TabNet experiment does not outperform
HistGradientBoosting according to the primary PR-AUC comparison.

------------------------------------------------------------------------

## 17. Model Saving

The trained TabNet model is saved using:

`tabnet.save_model()`

The model path is:

`../models/tabnet_stroke_model`

The notebook also saves metadata to:

`../models/tabnet_metadata.pkl`

The metadata contains:

-   Model name
-   Target
-   Selected threshold
-   Random state
-   Feature columns
-   Validation accuracy
-   Validation precision
-   Validation recall
-   Validation F1
-   Validation ROC-AUC
-   Validation PR-AUC

Saving the threshold is important because future inference should use
the same classification threshold that was selected during validation.

------------------------------------------------------------------------

## 18. Interpretation

The TabNet experiment demonstrates that a dedicated tabular
deep-learning architecture can learn useful patterns from the stroke
dataset.

However, the results show that deep learning does not automatically
outperform conventional gradient-boosting methods on tabular data.

In this experiment:

-   TabNet achieved ROC-AUC of approximately 0.824.
-   TabNet achieved PR-AUC of approximately 0.176.
-   TabNet achieved recall of approximately 42.2%.
-   HistGradientBoosting achieved a higher validation PR-AUC of
    approximately 0.188.

The result supports comparing model families empirically rather than
assuming that deep learning will produce superior performance.

------------------------------------------------------------------------

## 19. Limitations and Future Work

Possible future improvements include:

-   Hyperparameter tuning for TabNet.
-   Testing alternative TabNet architectures.
-   Comparing additional tabular deep-learning models.
-   Probability calibration.
-   External validation.
-   Subgroup/fairness analysis.
-   Explainability and feature-importance analysis.
-   Evaluation on an independent population.

The current model remains a research/prototyping model and should not be
treated as a standalone medical diagnostic system.

------------------------------------------------------------------------

## 20. Conclusion

The TabNet experiment provides a deep-learning comparison for
NeuroShield AI using the same processed stroke dataset and evaluation
framework as the conventional models.

The current validation performance is:

-   **ROC-AUC: 0.8236**
-   **PR-AUC: 0.1764**
-   **Recall: 42.19%**
-   **F1: 25.68%**

TabNet demonstrates useful predictive ability but does not exceed the
current HistGradientBoosting benchmark in validation PR-AUC.

The trained TabNet model and its metadata are saved for reproducibility
and potential later evaluation on the untouched test set.
