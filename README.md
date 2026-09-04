<div align="center">

# 🧠 NeuroShield AI

### Explainable Stroke Risk Prediction with Machine Learning & Deep Learning

*Predict • Explain • Understand*

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![SHAP](https://img.shields.io/badge/SHAP-Explainable_AI-8B5CF6?style=flat-square)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**An academic research project exploring stroke-risk prediction through
Machine Learning, Deep Learning, and Explainable AI.**

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [What We're Building](#what-were-building)
- [Project Pipeline](#project-pipeline)
- [Dataset](#dataset)
- [Exploratory Data Analysis](#exploratory-data-analysis)
- [Machine Learning](#machine-learning)
- [Deep Learning](#deep-learning)
- [Explainable AI](#explainable-ai)
- [Planned Application](#planned-application)
- [Getting Started](#getting-started)
- [Development Progress](#development-progress)
- [Repository Structure](#repository-structure)
- [Team](#team)
- [Research](#research)
- [License](#license)

---

## About the Project

**NeuroShield AI** is an academic research project focused on predicting stroke risk from patient health and lifestyle data.

Rather than treating machine learning as a black box, the project pairs **prediction with explainability**, using SHAP to surface which factors drive each model's output — so results are not just accurate, but interpretable.

The project is being developed as both:

> **a predictive ML/DL system**
> **and an explainable, healthcare-oriented application**

> ⚠️ **Disclaimer:** NeuroShield AI is an academic/research project for risk assessment and awareness. It is **not a medical diagnostic system** and does not replace professional medical advice.

---

## What We're Building

<table>
<tr>
<td width="50%">

### 🤖 Prediction
- Classical ML models
- Deep learning model (MLP)
- Model comparison
- Stroke-risk probability scoring
- Performance evaluation

</td>
<td width="50%">

### 💡 Explainability
- SHAP-based explanations
- Global feature importance
- Individual (local) prediction explanations
- Transparent, auditable predictions

</td>
</tr>
<tr>
<td width="50%">

### 🌐 Application
- React frontend
- Spring Boot backend
- FastAPI model-serving layer
- PostgreSQL database

</td>
<td width="50%">

### 📄 Research
- Literature review
- ML vs. DL comparison
- Explainable AI analysis
- Practical healthcare application

</td>
</tr>
</table>

---

## Project Pipeline

| Stage | Step |
|:---:|---|
| 01 | Data Preprocessing |
| 02 | Exploratory Data Analysis |
| 03 | ML Model Training |
| 04 | Model Evaluation |
| 05 | Deep Learning |
| 06 | ML vs. DL Comparison |
| 07 | Final Model Selection |
| 08 | SHAP Explainability |
| 09 | Model Deployment |
| 10 | Web Application |

---

## Dataset

The project uses a stroke prediction dataset containing demographic, health, and lifestyle-related information.

🔗 **Dataset Source:** [Stroke Prediction Dataset — Kaggle](https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset)

### Target

| Value | Meaning |
|:---:|---|
| `0` | No Stroke |
| `1` | Stroke |

### Main Features

`Age` · `Gender` · `Hypertension` · `Heart Disease` · `Average Glucose Level` · `BMI` · `Smoking Status` · `Work Type` · `Residence Type` · `Marital Status`

---

## Exploratory Data Analysis

The EDA stage focuses on understanding the dataset and identifying patterns associated with stroke risk, including:

- Dataset overview and missing-value analysis
- Stroke class distribution
- Age, BMI, and glucose-level distributions
- Stroke risk by gender, hypertension, heart disease, and smoking status
- Stroke risk by work type and residence type
- Correlation analysis and pair plots

These findings also feed directly into the analysis presented in the accompanying research paper.

---

## Machine Learning

The current classical ML pipeline includes:

| Model | Role |
|:---|:---|
| Logistic Regression | Baseline classification |
| Decision Tree | Tree-based classification |
| Random Forest | Ensemble classification |

Models are evaluated using **Accuracy, Precision, Recall, F1-score, ROC-AUC, and Confusion Matrix**.

> Because the dataset is highly imbalanced, **accuracy alone is not used to determine the best model.**

---

## Deep Learning

As an extension of the classical ML pipeline, the project explores a **feed-forward neural network (MLP)** for stroke prediction, evaluated using the same metrics as the classical models. This lets the project investigate a core research question:

> **Can Deep Learning improve stroke-risk prediction compared with traditional Machine Learning on this dataset?**

The final model will be selected based on experimental results, not assumption.

---

## Explainable AI

NeuroShield AI uses **SHAP (SHapley Additive exPlanations)** to make model predictions interpretable rather than opaque.

| Level | Question it answers |
|:---|:---|
| **Global** | Which features influence predictions the most across the whole dataset? |
| **Local** | Why did the model produce *this* prediction for *this* patient? |

The goal is to move from a black-box output to a transparent one:

`Prediction → Explanation → Understanding`

---

## Planned Application

The final system is designed as a full-stack application:

| Layer | Technology |
|:---|:---|
| Frontend | React |
| Backend | Spring Boot |
| Model API | FastAPI |
| ML / DL | Python |
| Database | PostgreSQL |
| Explainability | SHAP |

### Planned User Flow

**Health Information** → **Risk Prediction** → **Risk Probability / Category** → **SHAP Explanation** → **Prediction History**

---

## Getting Started

> 🚧 Setup instructions will be added once the backend and model-serving layers are finalized.

```bash
# Clone the repository
git clone https://github.com/<org>/NeuroShield-AI.git
cd NeuroShield-AI

# (Coming soon) environment setup, dependency installation,
# and instructions for running the notebooks / API / frontend
```

---

## Development Progress

| Stage | Status |
|:---|:---:|
| Data Preprocessing | ✅ |
| Exploratory Data Analysis | ✅ |
| ML Model Training | ✅ |
| ML Model Evaluation | ✅ |
| Deep Learning | ⏳ |
| ML vs. DL Comparison | ⏳ |
| Final Model Selection | ⏳ |
| SHAP Explainability | ⏳ |
| Model Deployment | ⏳ |
| Web Application | ⏳ |
| Research Paper | 🔄 |

**Legend:** ✅ Completed &nbsp;&nbsp; 🔄 In Progress &nbsp;&nbsp; ⏳ Upcoming

---

## Repository Structure

```text
NeuroShield-AI/
│
├── data/
├── notebooks/
│   ├── 01_data_preprocessing.ipynb
│   └── 02_eda.ipynb
│   └── 03_model_training.ipynb
|   └── 04_deep_learning_preprocessing.ipynb
├── models/
├── src/
├── frontend/
├── backend/
│
├── README.md
└── LICENSE
```

This structure will evolve as the Deep Learning, XAI, backend, and frontend components are added.

---

## Team

| Member | Primary Responsibility |
|:---|:---|
| **Pragati** | ML Training & System Integration |
| **Khushboo** | Data Preprocessing & Deep Learning |
| **Nitya** | Model Evaluation & Results |
| **Yashika** | EDA & Frontend/UI |

---

## Research

NeuroShield AI is being developed alongside a research paper exploring:

**Machine Learning → Deep Learning → Explainable AI → Practical Application**

**Research focus:** stroke-risk prediction, ML model comparison, deep learning, explainable AI, model evaluation, and healthcare-oriented application design.

---

## License

*(Add license details here — e.g., MIT, Apache 2.0 — once finalized.)*

---

<div align="center">

### 🧠 NeuroShield AI
**Predict. Explain. Understand.**

*An academic collaborative research project.*

</div>
