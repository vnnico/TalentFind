import numpy as np
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
import pickle
import PyPDF2
import os
import spacy

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

nlp = spacy.load("en_core_web_sm")
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    """
    Preprocess the input text
    """
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = word_tokenize(text)
    processed_tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return ' '.join(processed_tokens)

def extract_text_from_pdf(pdf_path):
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
    raw_text = extract_text_from_pdf(pdf_path)
    processed_text = preprocess_text(raw_text)
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
    cv_data['processed_text'] = cv_data['Feature'].apply(preprocess_text)
    cv_data['skills'] = cv_data['Feature'].apply(extract_skills)

    print("Preprocessing job description data...")
    job_data['processed_text'] = job_data['Job Description'].apply(preprocess_text)
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
    processed_cv = preprocess_text(cv_text)
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
    processed_cv = preprocess_text(cv_text)
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

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=8000, debug=True)



# API 1
from flask import Flask, render_template, request, redirect, jsonify
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from pymongo import MongoClient
import os

app = Flask(__name__)
app.config['ALLOWED_EXTENSION'] = ['.pdf']
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

app.config['UPLOAD_DIRECTORY'] = os.path.join(os.getcwd(), 'uploads')
upload_directory = app.config['UPLOAD_DIRECTORY']
if not os.path.exists(upload_directory):
    try:
        os.makedirs(upload_directory)
    except OSError as e:
        print(f"Error creating directory {upload_directory}: {e}")
        raise

# setup mongo DB Connection
# client = MongoClient("mongodb+srv://user:yKWPCgowmmJbPEac@talentfind.e8pxgwx.mongodb.net/?retryWrites=true&w=majority&appName=TalentFind")
# db = client['demo']
# cv = db['cv']

@app.route("/")
def test_home():
    return "Home"

@app.route('/file-upload', methods=['POST'])
def file_upload():
    try:
        # Check if a file part is in the request
        if 'file' not in request.files:
            print("no file part in the req")
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']

        # Check if a file is selected
        if file.filename == '':
            print("no file selected")
            return jsonify({"error": "No file selected"}), 400

        # Check the file extension
        extension = os.path.splitext(file.filename)[1].lower()
        if extension not in app.config['ALLOWED_EXTENSION']:
            return jsonify({"error": "File type must be PDF."}), 400

        # Secure the filename and save the file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_DIRECTORY'], filename)
        file.save(file_path)

        # Return success response
        print(f"File '{filename}' uploaded successfully to '{file_path}'.")
        response = {"message": "File uploaded successfully", "file_path": file_path}
   

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
        print("ini ", e)
        return jsonify({"error": "Unable to load or preprocess data."}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)