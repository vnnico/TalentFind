import os
import re
import numpy as np
import pandas as pd
import shutil
import glob
import tempfile
import zipfile
import ssl
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
import pickle
import PyPDF2
import spacy
import docx2txt
import torch
from torch.utils.data import DataLoader, Dataset, random_split
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import streamlit as st

# FLASK LIBRARY
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from io import BytesIO

app = Flask(__name__)

# 
app.config['ALLOWED_EXTENSION_FILE_PDF'] = ['.pdf']
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit
app.config['UPLOAD_DIRECTORY'] = os.path.join(os.getcwd(), 'uploads')

# Download NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# SSL context for downloading additional resources
ssl._create_default_https_context = ssl._create_unverified_context

# ANALYZE CV SIMILARITY PERCENTAGE WITH COMPANY START
nlp = spacy.load("en_core_web_sm")
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text_analyze_cv(text):
    """
    Preprocess the input text
    """
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = word_tokenize(text)
    processed_tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return ' '.join(processed_tokens)

def extract_text_cv_from_pdf(pdf_path):
    """
    Extract text from a PDF file
    """
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def process_cv_pdf(pdf_path):
    """
    Process a CV in PDF format
    """
    raw_text = extract_text_cv_from_pdf(pdf_path)
    processed_text = preprocess_text_analyze_cv(raw_text)
    return processed_text

def extract_skills(text):
    """
    Extract skills from text using spaCy NER and custom rules
    """
    doc = nlp(text)
    skills = set()
    
    # Extract skills based on NER
    for ent in doc.ents:
        if ent.label_ in ["SKILL", "PRODUCT", "ORG"]:  # Include more entity types
            skills.add(ent.text.lower())
    
    # Extract skills based on custom rules (e.g., programming languages, tools, frameworks)
    skill_patterns = [
        r'\b(python|java|c\+\+|javascript|ruby|php|sql|html|css|scala|go|rust|swift)\b',
        r'\b(machine learning|deep learning|data analysis|web development|cloud computing|devops|cybersecurity)\b',
        r'\b(tensorflow|pytorch|scikit-learn|pandas|numpy|django|flask|spring|hibernate|react|angular|vue\.js)\b',
        r'\b(git|docker|kubernetes|aws|azure|gcp|jenkins|terraform|ansible)\b',
        r'\b(agile|scrum|kanban|ci/cd|restful api|microservices|oauth|nosql|elasticsearch)\b',
        r'\b(networking|tcp/ip|dns|dhcp|vpn|firewall|load balancing|routing|switching)\b',
        r'\b(database design|sql server|mysql|postgresql|oracle|mongodb|cassandra|redis)\b',
        r'\b(data warehousing|etl|business intelligence|data visualization|tableau|power bi)\b'
    ]
    
    for pattern in skill_patterns:
        skills.update(re.findall(pattern, text.lower()))
    
    return list(skills)

def load_and_preprocess_data(cv_path, job_desc_path):
    """
    Load and preprocess the CV and job description data
    """
    cv_data = pd.read_csv(cv_path)
    job_data = pd.read_csv(job_desc_path)

    # Filter CV data to include only Information Technology category
    cv_data = cv_data[cv_data['Category'] == 'INFORMATION-TECHNOLOGY']

    print(f"Number of CV samples in Information Technology category: {len(cv_data)}")

    print("Preprocessing CV data...")
    cv_data['processed_text'] = cv_data['Feature'].apply(preprocess_text_analyze_cv)
    cv_data['skills'] = cv_data['Feature'].apply(extract_skills)

    print("Preprocessing job description data...")
    job_data['processed_text'] = job_data['Job Description'].apply(preprocess_text_analyze_cv)
    job_data['required_skills'] = job_data['Job Description'].apply(extract_skills)

    # Ensure each job title has associated skills
    job_data['required_skills'] = job_data.apply(lambda row: get_default_skills(row['Job Title']) if not row['required_skills'] else row['required_skills'], axis=1)

    return cv_data, job_data
def create_tfidf_vectors(texts):
    """
    Create TF-IDF vectors from the input texts
    """
    vectorizer = TfidfVectorizer(max_features=5000)
    return vectorizer, vectorizer.fit_transform(texts)

def build_and_train_model(X, y):
    """
    Build and train the Random Forest model
    """
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

    return model

def predict_job_titles(model, vectorizer, label_encoder, cv_text, top_n=3):
    """
    Predict top N job titles for a given CV text
    """
    processed_cv = preprocess_text_analyze_cv(cv_text)
    cv_vector = vectorizer.transform([processed_cv])
    probabilities = model.predict_proba(cv_vector)
    top_indices = np.argsort(probabilities[0])[-top_n:][::-1]
    return label_encoder.inverse_transform(top_indices)



def get_default_skills(job_title):
    """
    Return default skills for a job title if no skills were extracted
    """
    default_skills = {
        'Machine Learning': ['python', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'data analysis'],
        'Software Engineer': ['python', 'java', 'javascript', 'git', 'agile', 'software development', 'algorithms', 'data structures'],
        'Network Administrator': ['networking', 'tcp/ip', 'dns', 'dhcp', 'vpn', 'firewall', 'routing', 'switching'],
        'Database Administrator': ['sql', 'database design', 'mysql', 'postgresql', 'oracle', 'mongodb', 'data warehousing'],
        'Java Developer': ['java', 'spring', 'hibernate', 'sql', 'restful api', 'git', 'agile'],
        'Python Developer': ['python', 'django', 'flask', 'sql', 'restful api', 'git', 'agile'],
        'Cybersecurity Expert': ['cybersecurity', 'networking', 'tcp/ip', 'dns', 'dhcp', 'vpn', 'firewall', 'routing', 'switching'],
        'IT Support': ['networking', 'tcp/ip', 'dns', 'dhcp', 'vpn', 'firewall', 'routing', 'switching'],
        'Software Developer': ['python', 'java', 'javascript', 'sql', 'git', 'agile', 'data structures', 'algorithms', 'software development'],
        'IT Manager': ['networking', 'tcp/ip', 'dns', 'dhcp', 'vpn', 'firewall', 'routing', 'switching'],
        'Database Administrator': ['sql', 'database design', 'mysql', 'postgresql', 'oracle', 'mongodb', 'data warehousing'],
        'Web Developer': ['html', 'css', 'javascript', 'git', 'agile', 'web development', 'data structures', 'algorithms', 'software development'],
        'Data Scientist': ['python', 'sql', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'data analysis'],
        'Data Analyst': ['sql', 'data analysis', 'statistics', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn'],
        'Data Engineer': ['sql', 'data analysis', 'statistics', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn'],
        'Business Analyst': ['sql', 'data analysis', 'statistics', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn'],
        'Data Engineer': ['sql', 'data analysis', 'statistics', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn'],
        

    }
    
    return default_skills.get(job_title, ['programming', 'problem solving', 'communication'])  # Default skills if job title not found

def get_skills_to_develop(job_title, cv_skills, job_data):
    """
    Get skills to develop based on the job title and CV skills
    """
    job_skills = job_data[job_data['Job Title'] == job_title]['required_skills'].iloc[0]
    if isinstance(job_skills, list):
        missing_skills = set(job_skills) - set(cv_skills)
    else:
        missing_skills = set(extract_skills(job_skills)) - set(cv_skills)
    return list(missing_skills)

def recommend_alternative_careers(cv_text, model, vectorizer, label_encoder, job_data, top_n=5):
    """
    Recommend alternative careers based on CV text
    """
    processed_cv = preprocess_text_analyze_cv(cv_text)
    cv_skills = extract_skills(cv_text)
    cv_vector = vectorizer.transform([processed_cv])
    probabilities = model.predict_proba(cv_vector)
    top_indices = np.argsort(probabilities[0])[-top_n:][::-1]
    top_jobs = label_encoder.inverse_transform(top_indices)
    top_probs = probabilities[0][top_indices]
    
    recommendations = []
    for job, prob in zip(top_jobs, top_probs):
        skills_to_develop = get_skills_to_develop(job, cv_skills, job_data)
        if not skills_to_develop:
            skills_to_develop = get_default_skills(job)
        recommendations.append({
            'job_title': job,
            'confidence': prob,
            'skills_to_develop': skills_to_develop
        })
    
    return recommendations
# ANALYZE CV SIMILARITY PERCENTAGE WITH COMPANY END

# PROMPT FOR FINDING TALENT BASED ON JOB DESCRIPTION START
# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Text preprocessing function
def preprocess_text_job_description(text):
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
def extract_text_zip_from_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return preprocess_text_job_description(text)
    except Exception as e:
        st.error(f"Error reading PDF file {file_path}: {str(e)}")
        return ""

def extract_text_from_docx(file_path):
    text = docx2txt.process(file_path)
    return preprocess_text_job_description(text)

def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return preprocess_text_job_description(text)

def extract_text(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    if file_extension == '.pdf':
        return extract_text_zip_from_pdf(file_path)
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
# PROMPT FOR FINDING TALENT BASED ON JOB DESCRIPTION END

# RESTFUL API 

# API: ANALYZE CV SIMILARITY PERCENTAGE WITH COMPANY START
@app.route('/file-upload', methods=['POST'])
def file_upload():
    try:

        # validate start
        # Load and preprocess data
        cv_data, job_data = load_and_preprocess_data('resume_data.csv', 'jobdesc2.csv')

        if cv_data is None or job_data is None:
            print("Error: Unable to load or preprocess data. Exiting.")
            raise ValueError("Error: Unable to load or preprocess data.")
            # exit(1)

        # Create TF-IDF vectors
        vectorizer, X = create_tfidf_vectors(job_data['processed_text'])

        # Encode job titles
        label_encoder = LabelEncoder()
        y = label_encoder.fit_transform(job_data['Job Title'])

        # Build and train the model
        model = build_and_train_model(X, y)

        # Save the model, vectorizer, and label encoder
        try:
            with open('skill_mapping_model.pkl', 'wb') as f:
                pickle.dump(model, f)
            with open('tfidf_vectorizer.pkl', 'wb') as f:
                pickle.dump(vectorizer, f)
            with open('label_encoder.pkl', 'wb') as f:
                pickle.dump(label_encoder, f)
            print("Model, vectorizer, and label encoder saved successfully.")
        except Exception as e:
            print(f"Error saving model components: {e}")
        # validate end

        if 'file' not in request.files:
            return "No file part in the request", 400
                
        file = request.files['file']

        if file.filename == '':
            return "No file selected", 400
        extension = os.path.splitext(file.filename)[1].lower()

        if file:
            if extension not in app.config['ALLOWED_EXTENSION_FILE_PDF']:
                return "File type must be PDF.", 400
            filename = secure_filename(file.filename)
            file_path = os.path.join(
                app.config['UPLOAD_DIRECTORY'], filename)
            file.save(file_path)

        pdf_path = file_path
        if os.path.exists(pdf_path):
            cv_text = process_cv_pdf(pdf_path)
            print("CV text extracted and processed successfully.")
        else:
            raise FileNotFoundError(f"PDF file not found at {pdf_path}")

        # Predict job titles
        predicted_jobs = predict_job_titles(model, vectorizer, label_encoder, cv_text)
        print(f"Recommended IT fields: {predicted_jobs}")

        career_lists = []
        # Recommend alternative careers
        alternative_careers = recommend_alternative_careers(cv_text, model, vectorizer, label_encoder, job_data)
        print("\nAlternative Career Recommendations:")
        for career in alternative_careers:
            print(f"Job Title: {career['job_title']}")
            print(f"Confidence: {career['confidence'] * 100:.2f}%")
            print(f"Skills to Develop: {', '.join(career['skills_to_develop'])}")
            print()

            career_lists.append({
                "job_title": career['job_title'],
                "confidence": f"{career['confidence'] * 100:.2f}%",
                "skills_to_develop": career['skills_to_develop']
            })

        return jsonify({"message": "File uploaded successfully", 
                        "file_path": file_path, 
                        "careers": career_lists 
                          }), 200
    except Exception as e:
        print(f"Error processing PDF: {e}")
        print("Exiting the program.")
        exit(1)
# API: ANALYZE CV SIMILARITY PERCENTAGE WITH COMPANY END

# API: PROMPT FOR FINDING TALENT BASED ON JOB DESCRIPTION START
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
            results_json = results.to_dict(orient='records')  
            
            return jsonify(results_json), 200
        else:
            return jsonify({"error": "Processing failed"}), 500
    finally:
        # Clean up the temporary directory
        shutil.rmtree(temp_dir)
# API: PROMPT FOR FINDING TALENT BASED ON JOB DESCRIPTION END

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)