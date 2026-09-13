"""
#### Steps
1. load data and interpretation. 
2. Convert SAS variable names into question-based column names and values in as as ber value label -2 
3. Feature selection
4. interpret meaning of values and convert them in nan if they are not uninformative or remove the parts that are just clutter
5. Remove row that contains nan value for target variable for cleaning 
6. drop duplicates
7. Train test split to prevent data leak
8. impute numerical data through median
9. impute categorical data through mode 
10. select columns 
11. set the order
12. define ordinal encoder
13. define column transformer 
14. transform data and save transformer 
15. store transformed data and data just before transformation 
"""
import pandas as pd
import json
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from streamlit import columns
from sklearn.impute import SimpleImputer
import joblib

class Preprocess:
    def __init__(self):
        file_path = "../dataset/processed/decoded_data.csv"
        file_path_json= "../dataset/Document/codebook.json"
        self.df = pd.read_csv(file_path)
        with open(file_path_json, 'r') as f:
            self.codebook = json.load(f)
    def sas_to_question_columns(self,selected_columns):
        """
           Convert SAS variable names into question-based column names.
           Example:
           CVDSTRK3 -> Ever_told_you_had_a_stroke
           _BMI5    -> Body_Mass_Index
        """
        # Create SAS variable -> question lookup
        sas_lookup = {
            variable["sas_variable_name"].strip(): variable.get("question", "").strip()
            for variable in self.codebook
            if variable.get("sas_variable_name")
            }

        renamed_columns = {}

        for sas_name in selected_columns:

            question = sas_lookup.get(sas_name)

            if question:
            # Replace spaces with underscores
                new_name = "_".join(question.split())

                renamed_columns[sas_name] = new_name

            else:
            # Keep original name if not found
                renamed_columns[sas_name] = sas_name

        return renamed_columns
    def Feature_selection(self, columns):
        self.r_columns = self.sas_to_question_columns(columns)
        available_columns = [value for key, value in self.r_columns.items() if value in self.df.columns]
        self.df_selected = self.df[available_columns].copy()
        self.df_selected["Body_Mass_Index_(BMI)"]= self.df_selected["Body_Mass_Index_(BMI)"]/100
        
    def decode_values(self, columns):
        text_columns = self.df_selected.select_dtypes(include="object").columns
        for col in text_columns:
            self.df_selected[col] = (
                self.df_selected[col]
                .str.split(" - ", n=1).str[0]
                .str.split(" Notes", n=1).str[0]
                .str.strip()
                .replace({
                    "Don't know/Not sure": np.nan,
                    "Refused": np.nan,
                    "Don't know/Refused/Missing Notes: SMOKE100 = 1 and SMOKEDAY = 9 or SMOKE100 = 7 or 9 or Missing": np.nan,
                    "Don't know/Refused/Missing": np.nan,
                    "Don't know/Not Sure/Refused/Missing": np.nan,
                    "Don't know/Not Sure": np.nan
            
                })
            )
        self.df_selected["Now_thinking_about_your_mental_health,_which_includes_stress,_depression,_and_problems_with_emotions,_for_how_many_days_during_the_past_30_days_was_your_mental_health_not_good?"] = self.df_selected["Now_thinking_about_your_mental_health,_which_includes_stress,_depression,_and_problems_with_emotions,_for_how_many_days_during_the_past_30_days_was_your_mental_health_not_good?"].astype(float)
        self.df_selected["Now_thinking_about_your_physical_health,_which_includes_physical_illness_and_injury,_for_how_many_days_during_the_past_30_days_was_your_physical_health_not_good?"]= self.df_selected["Now_thinking_about_your_physical_health,_which_includes_physical_illness_and_injury,_for_how_many_days_during_the_past_30_days_was_your_physical_health_not_good?"].astype(float)  
        self.df_selected.dropna(subset=["(Ever_told)_(you_had)_a_stroke."], inplace=True)
        self.df_selected.drop_duplicates(keep='first', inplace=True)

    def Train_test_split(self, target_column, test_size=0.2, random_state=42):
        X = self.df_selected.drop(columns=[target_column])
        y = self.y = self.df_selected[target_column].map({
            "No": 0,
            "Yes": 1
        })
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
    def impute_missing_values(self, numeric_columns):
        imputer = SimpleImputer(strategy='median')
        col_name = []

        for key, value in self.r_columns.items():
            if key in numeric_columns:
                col_name.append(value)

        self.X_train[col_name] = imputer.fit_transform(
            self.X_train[col_name])
        self.X_test[col_name] = imputer.transform(
            self.X_test[col_name])
    def impute_categorical_values(self):
        text_columns = self.X_train.select_dtypes(include="object").columns
        imputer = SimpleImputer(strategy='most_frequent')
        col_name = []

        for key, value in self.r_columns.items():
            if value in text_columns:
                col_name.append(value)

        self.X_train[col_name] = imputer.fit_transform(
            self.X_train[col_name])
        self.X_test[col_name] = imputer.transform(
            self.X_test[col_name])
    def select_columns(self):
        # find all the column that have 2 unique values from object type columns
        binary_cols = [col for col in self.X_train.columns if self.X_train[col].nunique() == 2 and self.X_train[col].dtype == 'object']
# find all the column that have 3 or more unique values 
        multi_col = [col for col in self.X_train.columns if self.X_train[col].nunique() >= 3 and self.  X_train[col].dtype == 'object']
# find columns that have income, education or general health in the name
        ordinal = [col for col in self.X_train.columns if 'income' in col.lower() or 'highest_grade' in col.lower() or 'general_your_health' in col.lower()]
# only columns that should be in multi should not in ordinal
        multi_cols= [x for x in multi_col if x not in ordinal]
        return binary_cols, multi_cols, ordinal
    def set_order(self):
        return [
            # General Health
            [
                "Poor",
                "Fair",
                "Good",
                "Very good",
                "Excellent"
            ],

            # Education
            [
                "Never attended school or only kindergarten",
                "Grades 1 through 8 (Elementary)",
                "Grades 9 through 11 (Some high school)",
                "Grade 12 or GED (High school graduate)",
                "College 1 year to 3 years (Some college or technical school)",
                "College 4 years or more (College graduate)"
            ],

            # Annual Household Income
            [
                "Less than $10,000",
                "Less than $15,000 ($10,000 to < $15,000)",
                "Less than $20,000 ($15,000 to < $20,000)",
                "Less than $25,000 ($20,000 to < $25,000)",
                "Less than $35,000 ($25,000 to < $35,000)",
                "Less than $50,000 ($35,000 to < $50,000)",
                "Less than $75,000 ($50,000 to < $75,000)",
                "Less than $100,000 ($75,000 to < $100,000)",
                "Less than $150,000 ($100,000 to < $150,000)",
                "Less than $200,000 ($150,000 to < $200,000)",
                "$200,000 or more"
            ]
        ]
    def define_ordinal_encoder(self):
        return OrdinalEncoder(
            categories=self.set_order()
        )
    def define_column_transformer(self):
        binary_cols, multi_cols, ordinal = self.select_columns()
        return ColumnTransformer(
            transformers=[
                ("binary", OneHotEncoder(drop="if_binary"), binary_cols),
                ("multi", OneHotEncoder(), multi_cols),
                ("ordinal", self.define_ordinal_encoder(), ordinal)
            ],
            remainder="passthrough"
        )
    def transform_data(self, transformer_path):
        preprocessor = self.define_column_transformer()
        X_train_transformed = preprocessor.fit_transform(self.X_train)
        X_test_transformed = preprocessor.transform(self.X_test)
        feature_names = preprocessor.get_feature_names_out()
        self.X_train_transformed_df = pd.DataFrame(
            X_train_transformed.toarray() if hasattr(X_train_transformed, "toarray") else X_train_transformed,
            columns=feature_names,
            index=self.X_train.index
            )
        self.X_test_transformed_df = pd.DataFrame(
            X_test_transformed.toarray() if hasattr(X_test_transformed, "toarray") else X_test_transformed,
            columns=feature_names,
            index=self.X_test.index
            )
        joblib.dump(preprocessor,transformer_path)
        print("transformer saved")
    def merge_data_transformed(self):
        train_data = self.X_train_transformed_df.copy()
        train_data["(Ever_told)_(you_had)_a_stroke."] = self.y_train
        test_data = self.X_test_transformed_df.copy()
        test_data["(Ever_told)_(you_had)_a_stroke."] = self.y_test
        return train_data, test_data
    def merge_data(self):
        train_data= self.X_train.copy()
        train_data["(Ever_told)_(you_had)_a_stroke."] = self.y_train
        test_data = self.X_test.copy()
        test_data["(Ever_told)_(you_had)_a_stroke."] = self.y_test
        return train_data, test_data

    def save_data(self, data, file_path):
        data.to_csv(file_path, index=False)


    def call(self):
        columns = ['CVDSTRK3', '_AGE80', 'SEXVAR', '_BMI5', '_RFHYPE6', 'DIABETE4', 'SMOKE100','_SMOKER3','_MICHD', 'CVDINFR4','CVDCRHD4','TOLDHI3','CHOLMED3','CHCKDNY2','PREDIAB2','EXERANY2','_TOTINDA','_PAINDX3','PAMIN13_','_PA30023','GENHLTH','PHYSHLTH','MENTHLTH','EDUCA','INCOME3','EMPLOY1','MARITAL']
        nc = ['_AGE80','_BMI5','PAMIN13_','PHYSHLTH','MENTHLTH']
        tr = "../dataset/processed/Train.csv"
        te = "../dataset/processed/Test.csv"
        transformed_tr = "../dataset/processed/transformed_train.csv"
        transformed_te = "../dataset/processed/transformed_test.csv"
        transformer_path = "../models/column_transformer.joblib"
        self.Feature_selection(columns)
        print("Feature selection Done")
        self.decode_values(columns)
        print("Values Decoded")
        self.Train_test_split(target_column="(Ever_told)_(you_had)_a_stroke.")
        print("Train test split completed with stratify y")
        self.impute_missing_values(nc)
        self.impute_categorical_values()
        print(" Imputation done")
        Train, Test = self.merge_data()
        self.save_data(Train, tr)
        self.save_data(Test, te)
        print("Pre transformation data saved")
        self.transform_data(transformer_path)

        train_data, test_data = self.merge_data_transformed()
        self.save_data(train_data, transformed_tr)
        self.save_data(test_data, transformed_te)
        print("Post transformation data saved")
if __name__ == "__main__":
    Preprocess().call()




       





    