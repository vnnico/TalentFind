import streamlit as st
import os
import numpy as np
import pandas as pd
import docx2txt
import shutil
import glob
import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch
from torch.utils.data import DataLoader, Dataset, random_split
import tempfile
import zipfile
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re

# Download NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('punkt_tab')

# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Text preprocessing function
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Tokenize
    tokens = word_tokenize(text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Join tokens back into string
    return ' '.join(tokens)

# Define functions for text extraction
def extract_text_from_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return preprocess_text(text)
    except Exception as e:
        st.error(f"Error reading PDF file {file_path}: {str(e)}")
        return ""

def extract_text_from_docx(file_path):
    text = docx2txt.process(file_path)
    return preprocess_text(text)

def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return preprocess_text(text)

def extract_text(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    if file_extension == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_extension == '.docx':
        return extract_text_from_docx(file_path)
    elif file_extension == '.txt':
        return extract_text_from_txt(file_path)
    else:
        st.warning(f"Unsupported file type: {file_path}")
        return ""

# Function to extract zip file
def extract_zip(zip_file):
    temp_dir = tempfile.mkdtemp()
    try:
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        return temp_dir
    except Exception as e:
        st.error(f"Error extracting ZIP file: {str(e)}")
        shutil.rmtree(temp_dir)
        return None

# Custom dataset for CV and job descriptions
class CVJobDataset(Dataset):
    def __init__(self, cv_texts, job_desc, tokenizer, max_length=512):
        self.cv_texts = cv_texts
        self.job_desc = job_desc
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.cv_texts)

    def __getitem__(self, idx):
        cv_text = self.cv_texts[idx]
        inputs = self.tokenizer.encode_plus(
            self.job_desc,
            cv_text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        return {
            'input_ids': inputs['input_ids'].flatten(),
            'attention_mask': inputs['attention_mask'].flatten(),
            'labels': torch.tensor(1.0)  # Assuming all pairs are relevant for training
        }

# Load DistilBERT model
@st.cache_resource
def load_distilbert_model():
    tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
    model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=1)
    return tokenizer, model

# Training function
def train_model(model, train_dataloader, val_dataloader, epochs=3):
    model.to(device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)

    for epoch in range(epochs):
        model.train()
        train_loss = 0
        for batch in train_dataloader:
            optimizer.zero_grad()
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)

            outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss
            train_loss += loss.item()

            loss.backward()
            optimizer.step()

        # Validation
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch in val_dataloader:
                input_ids = batch['input_ids'].to(device)
                attention_mask = batch['attention_mask'].to(device)
                labels = batch['labels'].to(device)

                outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
                val_loss += outputs.loss.item()

        print(f"Epoch {epoch+1}/{epochs}")
        print(f"Train Loss: {train_loss/len(train_dataloader):.4f}")
        print(f"Val Loss: {val_loss/len(val_dataloader):.4f}")

    return model

# Function to calculate similarity scores
def calculate_similarity(model, tokenizer, cv_texts, job_description):
    model.eval()
    similarity_scores = []

    for cv_text in cv_texts:
        inputs = tokenizer.encode_plus(
            job_description,
            cv_text,
            add_special_tokens=True,
            max_length=512,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        ).to(device)

        with torch.no_grad():
            outputs = model(**inputs)
            # Convert logits to percentage
            score = torch.sigmoid(outputs.logits).item() * 100
            similarity_scores.append(score)

    return similarity_scores

# Main function to process CVs and job description
def process_cvs_and_job(cv_folder, job_description, verbose=False):
    try:
        # Recursively search for PDF, DOCX, and TXT files
        cv_files = glob.glob(os.path.join(cv_folder, '**', '*.[pP][dD][fF]'), recursive=True)
        cv_files += glob.glob(os.path.join(cv_folder, '**', '*.[dD][oO][cC][xX]'), recursive=True)
        cv_files += glob.glob(os.path.join(cv_folder, '**', '*.[tT][xX][tT]'), recursive=True)

        if not cv_files:
            st.warning("No valid CV files found in the uploaded ZIP.")
            return None

        cv_texts = []
        valid_files = []
        for file_path in cv_files:
            try:
                if verbose:
                    st.write(f"Processing file: {file_path}")
                text = extract_text(file_path)
                if text:
                    cv_texts.append(text)
                    valid_files.append(os.path.basename(file_path))
                    if verbose:
                        st.write(f"Successfully extracted text from {os.path.basename(file_path)}")
                else:
                    st.warning(f"Skipping file {os.path.basename(file_path)} due to empty content.")
            except Exception as e:
                st.warning(f"Error processing file {os.path.basename(file_path)}: {str(e)}")

        if not cv_texts:
            st.error("No valid CV texts extracted. Please check the uploaded files.")
            return None

        if verbose:
            st.write(f"Successfully extracted text from {len(cv_texts)} files.")

        # Load the model and tokenizer
        tokenizer, model = load_distilbert_model()

        # Create dataset
        full_dataset = CVJobDataset(cv_texts, job_description, tokenizer)

        # Split dataset into train and validation
        train_size = int(0.8 * len(full_dataset))
        val_size = len(full_dataset) - train_size
        train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

        # Create dataloaders
        train_dataloader = DataLoader(train_dataset, batch_size=16, shuffle=True)
        val_dataloader = DataLoader(val_dataset, batch_size=16)

        # Train the model
        st.write("Training the model...")
        trained_model = train_model(model, train_dataloader, val_dataloader)

        # Calculate similarity scores
        similarity_scores = calculate_similarity(trained_model, tokenizer, cv_texts, job_description)

        # Create DataFrame with results
        results_df = pd.DataFrame({
            'CV_File': valid_files,
            'Similarity_Score': similarity_scores
        })

        # Sort by similarity score in descending order
        results_df = results_df.sort_values('Similarity_Score', ascending=False).reset_index(drop=True)

        return results_df

    except Exception as e:
        st.error(f"An error occurred while processing CVs: {str(e)}")
        return None

from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from io import BytesIO

app = Flask(__name__)

# Streamlit app
@app.route('/api/process', methods=['POST'])
def main():
    if 'job_description' not in request.form or 'file' not in request.files:
        return jsonify({"error": "Job description or file not provided"}), 400

    
    job_description = request.form['job_description']
    uploaded_file = request.files['file']
    verbose_mode = request.form.get('verbose_mode', 'false').lower() == 'true'

    # Extract the ZIP file
    temp_dir = extract_zip(uploaded_file)
    if not temp_dir:
        return jsonify({"error": "Failed to extract the ZIP file"}), 500

    print("After extract: ", temp_dir)
    try:
        # Process the CVs
        results = process_cvs_and_job(temp_dir, job_description, verbose_mode)
        if results is not None:
            # Convert results to CSV in memory
            output = BytesIO()
            results.to_csv(output, index=False)
            output.seek(0)

            return send_file(
                output,
                mimetype='text/csv',
                as_attachment=True,
                download_name='cv_matching_results.csv'
            )
        else:
            return jsonify({"error": "Processing failed"}), 500
    finally:
        # Clean up the temporary directory
        shutil.rmtree(temp_dir)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
