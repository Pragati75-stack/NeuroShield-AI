# Data Collection Documentation
**Project:** NeuroShield AI — Explainable Machine Learning Framework for Stroke Risk Prediction
**Created by:** Nitya Zijoo
**Last updated:** 18-08-2026

---

## 1. Source

- **Dataset:** Behavioral Risk Factor Surveillance System (BRFSS), 2023 Annual Survey Data
- **Publisher:** Centers for Disease Control and Prevention (CDC), U.S. Department of Health & Human Services
- **License / access:** Public domain, freely available, no credentialing required
- **Official page:** https://www.cdc.gov/brfss/annual_data/annual_2023.html
- **Raw data download (SAS Transport format):** https://www.cdc.gov/brfss/annual_data/2023/files/LLCP2023XPT.zip
- **Codebook (variable dictionary):** https://www.cdc.gov/brfss/annual_data/2023/zip/codebook23_llcp-v2-508.zip
- **Access date:** 18-08-2026

## 2. Why This Source

- **Why BRFSS over the Kaggle stroke dataset:** the Kaggle dataset (~5,000 rows) is small, single-source, and not traceable to an official health authority. BRFSS is a real, government-conducted survey with 400,000+ annual respondents, giving far greater statistical power and credibility for a final-year project and any resulting publication.
- **Why the 2023 survey year specifically (not 2024):** As 2024 data does not cotain some important variables such as hypertension, blood pressure, etc  that are important for stroke prediction. Note: BRFSS 2024 data is also publicly available at https://www.cdc.gov/brfss/annual_data/annual_2024.html and was considered but not used, for the reason stated above.
- **Format chosen:** SAS Transport (.XPT) over ASCII, since it loads directly into Python via `pandas.read_sas()` without custom fixed-width parsing.

## 3. Datasets Considered (Before Selecting BRFSS)

Before finalizing BRFSS, the team downloaded and evaluated three other candidate datasets. Each was rejected for a specific, documented reason — not just "we found something better."

| # | Dataset | Source | Size | Why Rejected |
|---|---|---|---|---|
| 1 | Stroke Prediction Dataset | Kaggle (fedesoriano) | ~5,110 rows, 12 columns | Small single-source sample; known data-quality issues (heavy class imbalance, near-single-value columns); no clinical or governmental backing; used in the vast majority of existing student projects, so it offers no differentiation |
| 2 | Clinical Stroke Risk Prediction Dataset | Mendeley (DOI: 10.17632/2d9332pzfr.1) | 22,419 rows, 12 columns | Uses the **exact same column schema** as the Kaggle dataset above (same 12 fields, same naming), strongly suggesting it is an expanded/resampled derivative of the same original ~5,110-row source rather than an independent real-world data collection. No documented methodology for how the additional ~17,000 records were obtained. Cannot be treated as a distinct, independently verifiable data source. |
| 3 | Multi-Source Integrated Clinical Dataset for Stroke Risk Prediction | Mendeley (DOI: 10.17632/g9vp7hgj7d.3) | 143,960 rows, 25 columns | Constructed by **merging three separate, unrelated Kaggle datasets** (a cardiovascular dataset, a heart disease dataset, and a stroke dataset) into one table via an ETL "Medallion architecture" pipeline. These three source datasets do not share real patients — the "integration" combines rows from different anonymous individuals across unrelated studies into single synthetic records. The publisher's own documentation reports **zero missing values after processing**, achieved through imputation/derivation logic, which is a red flag for fabricated rather than genuinely observed values. Despite its large row count, this is not real linked clinical data and would introduce unverifiable, artificial correlations if used for training. |
| 4 | **BRFSS 2023** (selected) | CDC (U.S. government) | 433,323 rows, 345 variables (subset selected) | Real, individually collected survey responses from an official government health surveillance program; publicly documented methodology; large enough for robust statistical modeling; no synthetic merging or resampling involved |

**Why this comparison matters for the project:** two of the three rejected datasets illustrate exactly the problem this project's literature review identifies — publicly available stroke datasets are often small, derivative, or artificially constructed to appear larger/richer than they really are. Choosing BRFSS is not just "picking official data" for its own sake; it is a direct, evidenced response to a real data-quality gap encountered firsthand during dataset selection, which strengthens the "Research Gap" argument made in the synopsis (Section 5).

## 4. Scope of Raw Data

- **Total records:** 433,323 (2023 combined landline + cell phone dataset)
- **Total variables:** 345
- **Population represented:** Non-institutionalized U.S. adults aged 18+, from 48 states, D.C., Guam, Puerto Rico, and the U.S. Virgin Islands (Kentucky and Pennsylvania did not meet minimum data requirements for 2023 and are excluded)
- **Collection method:** Landline and cell phone survey interviews, self-reported responses

## 5. Selected Variables

| Variable Name (BRFSS code) | Meaning | Why Kept |
|---|---|---|
| `CVDSTRK3` | Ever told you had a stroke | Primary prediction target |
| `_AGE80` | Imputed age (top-coded at 80) | Core demographic and stroke risk factor; required for Framingham-style risk modeling |
| `SEXVAR` | Respondent sex | Core demographic variable; required for Framingham score calculation |
| `_BMI5` | Computed Body Mass Index | Known stroke risk factor; captures obesity-related risk |
| `_RFHYPE6` | High blood pressure status | Major stroke risk factor; core cardiovascular predictor |
| `BPMEDS` / equivalent | Currently taking blood pressure medication | Distinguishes treated vs. untreated hypertension for cardiovascular risk modeling |
| `DIABETE4` | Diabetes status | Major known stroke risk factor |
| `SMOKE100` / `_SMOKER3` | Smoking status | Important modifiable stroke risk factor; also relevant to Framingham-style modeling |
| `_MICHD` | History of coronary heart disease / myocardial infarction | Indicates pre-existing cardiovascular disease and elevated vascular risk |
| `CVDINFR4` / `CVDCRHD4` | History of heart attack / coronary heart disease | Supplementary cardiovascular disease history; captures established cardiovascular risk |
| `TOLDHI3` | Ever told cholesterol was high | Indicator of hypercholesterolemia; useful cardiovascular/stroke predictor |
| `CHOLMED3` | Currently taking medication for high cholesterol | Indicates treated hypercholesterolemia and underlying cardiovascular risk |
| `CHCKDNY2` | Ever told you had kidney disease | Chronic kidney disease is associated with increased cardiovascular and stroke risk |
| `PREDIAB2` | Prediabetes status | Captures elevated metabolic risk before diagnosed diabetes |
| `EXERANY2` | Physical activity or exercise in the past 30 days | Modifiable lifestyle factor associated with cardiovascular and stroke risk |
| `_TOTINDA` | Leisure-time physical activity indicator | Summarizes whether the respondent reported physical activity in the past 30 days |
| `_PAINDX3` | Physical Activity Index | Captures overall physical activity level |
| `PAMIN13_` | Minutes of physical activity per week | Quantifies physical activity exposure |
| `_PA30023` | Participation in 300+ minutes of physical activity per week | Captures a higher level of physical activity |
| `GENHLTH` | General health status | Provides an overall measure of self-reported health status |
| `PHYSHLTH` | Number of physically unhealthy days | Captures broader physical health burden |
| `MENTHLTH` | Number of mentally unhealthy days | Optional broader health/lifestyle predictor |
| `EDUCA` | Education level | Socioeconomic/demographic factor; may capture differences in health behavior and access to care |
| `INCOME3` | Household income category | Socioeconomic factor potentially associated with health outcomes and healthcare access |
| `EMPLOY1` | Employment status | Socioeconomic factor; optional predictor |
| `MARITAL` | Marital status | Demographic/social factor; optional predictor |

### Columns Considered but Excluded

| Variable | Reason for Exclusion |
|---|---|
| `_STATE` | Geographic identifier; excluded from the initial model to avoid regional bias and improve generalizability |
| State-specific geographic identifiers | Excluded from the initial model because they may capture location-specific effects rather than individual stroke risk |
| Survey/record identifiers | Excluded because they do not represent meaningful clinical or behavioral predictors |
| `CVDSTRK3` from predictor set | Used only as the target variable; including it as a feature would cause direct target leakage |
| Highly redundant calculated variables | Avoided when they encode essentially the same information as another selected variable |
| Composite variables containing stroke status | Excluded to prevent target leakage |
## 6. Known Limitations of the Source

- **Self-reported, not clinically diagnosed:** stroke status and other conditions are based on respondent recall ("Have you ever been told..."), not medical records — a source of potential misclassification.
- **Survey non-response / refusal codes:** BRFSS uses codes such as 7 ("Don't know") and 9 ("Refused") which must be treated as missing, not as valid data values — these differ per variable and must be checked against the codebook individually.
- **Missing states:** Kentucky and Pennsylvania are absent from the 2023 file, meaning the sample is not fully nationally representative.
- **Cross-sectional, not longitudinal:** each respondent is surveyed once; the dataset cannot capture how risk factors change over time for the same individual.
- **Executive order data modifications:** per CDC's own note on the 2023 release, some values were removed/modified to comply with a 2025 federal executive order — flagged here for transparency, to be re-verified against the codebook if any unexpected missingness patterns appear.

## 7. Access / Reproduction Steps

1. Download the codebook ZIP and extract it: https://www.cdc.gov/brfss/annual_data/2023/zip/codebook23_llcp-v2-508.zip
2. Download the data ZIP and extract it: https://www.cdc.gov/brfss/annual_data/2023/files/LLCP2023XPT.zip → yields `LLCP2023.XPT`
3. Place both in `dataset/raw/` and `dataset/docs/` respectively, per project folder structure
4. Load in Python:
   ```
   import pandas as pd
   df = pd.read_sas('dataset/raw/LLCP2023.XPT', format='xport')
   ```
5. Cross-reference the codebook to confirm each selected column name and its value labels before filtering (Section 4 above)
6. Proceed to `src/preprocess.py` for cleaning (documented separately in `preprocessing.md`)

---

**Next document in sequence:** `preprocessing.md` — documents cleaning decisions (missing value handling, encoding, imbalance strategy) once finalized.
