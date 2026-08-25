"""
remeber learnings from notebook and implement here 
1. dont impute before train test split else data leakage will happen
2. dont drop all rows with missing values in the entire dataset, instead drop columns with too many missing values(>50% missing values).
3. drop all rows with missing values for target variable
4. prepare a before and after report in data_preprocessing.md file from here using return and other things and finally using a function to write  
"""
from dotenv import load_dotenv
import os
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
import numpy as np


class Preprocess:
    def __init__(self):
        load_dotenv()
        file_path = os.getenv("../dataset/raw/Data.XPT")
        self.df = pd.read_sas(file_path, format='xport')

    def drop_columns_with_missing_values(self, threshold=0.5):
        missing_ratio = self.df.isnull().mean()
        columns_to_drop = missing_ratio[missing_ratio > threshold].index
        self.df.drop(columns=columns_to_drop, inplace=True)

    def drop_rows_with_missing_target(self, target_column):
        self.df.dropna(subset=[target_column], inplace=True)

    def keep_necessary_columns(self, columns):
        self.df = self.df[columns]

    def drop_duplicate_rows(self):
        self.df.drop_duplicates(keep='first', inplace=True)

    def drop_rows_with_missing_values(self, data):
        data.dropna(inplace=True)
        return data

    def train_test_split(self, target_column, test_size=0.2, random_state=42):
        X = self.df.drop(columns=[target_column])
        y = self.df[target_column]
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
        return X_train, X_test, y_train, y_test

    def impute_missing_values(self, numeric_columns, X_train, X_test):
        imputer = SimpleImputer(strategy='median')
        X_train[numeric_columns] = imputer.fit_transform(X_train[numeric_columns])
        X_test[numeric_columns] = imputer.transform(X_test[numeric_columns])
        return X_train, X_test

    def clean_missing_codes(self):
        """Replace sentinel 'missing' codes (7/9/77/99 etc.) with NaN."""
        missing_codes = {
            'CVDSTRK3': [7, 9],
            '_RFHYPE6': [7, 9],
            'DIABETE4': [7, 9],
            'SMOKE100': [7, 9],
            '_SMOKER3': [9],
            '_MICHD': [9],
            'CVDINFR4': [7, 9],
            'CVDCRHD4': [7, 9],
            'TOLDHI3': [7, 9],
            'CHOLMED3': [7, 9],
            'CHCKDNY2': [7, 9],
            'PREDIAB2': [7, 9],
            'EXERANY2': [7, 9],
            '_PAINDX3': [9],
            'GENHLTH': [7, 9],
            'EDUCA': [9],
            'INCOME3': [77, 99],
            'EMPLOY1': [9],
            'MARITAL': [9],
        }
        for col, codes in missing_codes.items():
            if col in self.df.columns:
                self.df[col] = self.df[col].replace(codes, np.nan)

    def missing(self, data):
        """Build a missing-value report string for the given DataFrame."""
        missing_report = pd.DataFrame({
            'Column': data.columns,
            'Missing_Count': data.isna().sum().values,
            'Missing_Percentage': (data.isna().mean().values * 100).round(2),
            'Non_Missing_Count': data.notna().sum().values,
            'Data_Type': data.dtypes.astype(str).values
        })
        missing_report = missing_report.sort_values(
            'Missing_Percentage', ascending=False
        ).reset_index(drop=True)
        return missing_report.to_string(index=False)

    def merge_data(self, X_train, X_test, y_train, y_test):
        train_data = X_train.copy()
        train_data['CVDSTRK3'] = y_train
        test_data = X_test.copy()
        test_data['CVDSTRK3'] = y_test
        return train_data, test_data

    def generate_report(self, data1=None, data2=None, report_file='data_preprocessing.md'):
        if data1 is None and data2 is None:
            a = self.missing(self.df)
            with open(report_file, 'a') as f:
                f.write("##3. BEFORE PREPROCESSING:\n")
                f.write(f"**SHAPE:** {self.df.shape}\n")
                f.write(f"**COLUMNS:** {self.df.columns.tolist()}\n")
                f.write(f"{a}\n")
        else:
            a = self.missing(data1)
            b = self.missing(data2)
            with open(report_file, 'a') as f:
                f.write("##4. AFTER PREPROCESSING:**\n")
                f.write(f"**TRAINING DATA SHAPE:** {data1.shape}\n")
                f.write(f"**TRAINING DATA COLUMNS:** {data1.columns.tolist()}\n")
                f.write(f"**TRAINING DATA:**\n{a}\n")
                f.write(f"**TESTING DATA SHAPE:** {data2.shape}\n")
                f.write(f"**TESTING DATA COLUMNS:** {data2.columns.tolist()}\n")
                f.write(f"**TESTING DATA:**\n{b}\n")

    def save_data(self, data, file_path):
        data.to_csv(file_path, index=False)
        print(f"Saved: {file_path}")

    def call(self):
        report_path = os.getenv("Generate_report_preprocessing")
        columns = [c.strip() for c in os.getenv("selected_columns").split(",")]
        nc = [c.strip() for c in os.getenv("numeric_cols").split(",")]
        tr = os.getenv("training")
        te = os.getenv("test")

        self.clean_missing_codes()
        self.generate_report(report_file=report_path)

        self.keep_necessary_columns(columns)
        self.drop_duplicate_rows()
        self.drop_rows_with_missing_target(columns[0])
        self.drop_columns_with_missing_values()

        X_train, X_test, y_train, y_test = self.train_test_split(columns[0])
        X_train, X_test = self.impute_missing_values(nc, X_train, X_test)

        train, test = self.merge_data(X_train, X_test, y_train, y_test)
        train = self.drop_rows_with_missing_values(train)
        test = self.drop_rows_with_missing_values(test)
        self.save_data(train, tr)
        self.save_data(test, te)


if __name__ == "__main__":
    Preprocess().call()




       





    