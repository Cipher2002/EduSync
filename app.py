from flask import Flask, render_template, request, jsonify, redirect
import requests
from flask_pymongo import PyMongo
# import fitz  # PyMuPDF library
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://Cipher:riKXPIASClOaF7sm@cluster0.iqltodr.mongodb.net/registrations"
mongodb_client = PyMongo(app)
db = mongodb_client.db
#  mongodb = riKXPIASClOaF7sm
translate_api_url = "https://2729-34-42-196-26.ngrok-free.app/"
chatbot_api_url = "http://cc7c-34-69-59-197.ngrok-free.app/"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():    
    data = request.get_json()
    texts = data.get('texts', [])
    target_lang = data.get('target_lang', 'en')
    response = requests.post(f"{translate_api_url}/translate", json={'texts': texts, 'target_lang': target_lang})
    if response.status_code == 200:
        translated_texts = response.json().get('translated_texts', [])
        return jsonify({'translated_texts': translated_texts})
    else:
        return jsonify({'error': 'Failed to get translation'})
    
@app.route('/ask', methods=['POST'])
def ask():
    questions = request.get_json().get('question')
    response = requests.post(f"{chatbot_api_url}/input_bot", json={'questions': questions})
    if response.status_code == 200:
        answers = response.json().get('answer')
        return jsonify({'answers': answers})
    else:
        return jsonify({'error': 'Failed to get answers'})

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/change', methods=['GET', 'POST'])
def change():
    return render_template('changep.html')

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('dashboard.html')

@app.route('/document-verify', methods=['GET', 'POST'])
def document_verify():
    return render_template('document-verify.html')

@app.route('/login-data', methods=['POST'])
def login_data():
    try:
        email = request.json.get('username')
        password = request.json.get('password')
        user = db.institutes.find_one({"email": email, "password": password})
        if user:
            return jsonify({'message': 'Success'}), 200
        else:
            return jsonify({'message': 'Failed'}), 401
        
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)})
    
@app.route('/register-data', methods=['POST'])
def register_data():
    try:
        if request.method == 'POST':
            collegeName = request.json.get('collegeName')
            instituteType = request.json.get('instituteType')
            state = request.json.get('state')
            email = request.json.get('email')
            contactNumber = request.json.get('contactNumber')
            collegeAddress = request.json.get('collegeAddress')
            postalCode = request.json.get('postalCode')
            password = request.json.get('password')
            checkbox = request.json.get('checkbox', False)

            db.institutes.insert_one({
                'collegeName': collegeName,
                'instituteType': instituteType,
                'state': state,
                'email': email,
                'contactNumber': contactNumber,
                'collegeAddress': collegeAddress,
                'postalCode': postalCode,
                'password': password,
                'checkbox': checkbox,
            })

            return jsonify({'message': 'success'}), 200
        else:
            return jsonify({'error': 'Invalid request method'}), 401
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)})
    

# def extract_text_from_pdf(pdf_content):
#     doc = fitz.open(stream=pdf_content, filetype="pdf")
#     text = ""
#     for page_num in range(doc.page_count):
#         page = doc[page_num]
#         text += page.get_text()
#     return text

# # Function to extract the template from a long PDF
# def extract_template_from_long_pdf(long_pdf_content, template_start, template_end):
#     start_index = long_pdf_content.find(template_start)
#     end_index = long_pdf_content.find(template_end)

#     if start_index != -1 and end_index != -1:
#         template = long_pdf_content[start_index:end_index + len(template_end)]
#         return template
#     else:
#         return None

# # Function to preprocess and calculate word overlap
# def calculate_word_overlap(doc1, doc2):
#     stop_words = set(stopwords.words("english"))
#     tokens1 = set(word.lower() for word in word_tokenize(doc1) if word.isalpha() and word.lower() not in stop_words)
#     tokens2 = set(word.lower() for word in word_tokenize(doc2) if word.isalpha() and word.lower() not in stop_words)

#     # Calculate Jaccard similarity (word overlap)
#     overlap = len(tokens1.intersection(tokens2))
#     union = len(tokens1.union(tokens2))
#     similarity_score = overlap / union if union > 0 else 0

#     return similarity_score

# Route to handle document uploads
# @app.route('/upload', methods=['POST'])
# def upload_document():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})

#     uploaded_file = request.files['file']
#     if uploaded_file.filename == '':
#         return jsonify({'error': 'No selected file'})

#     # Check if the file is a PDF
#     if uploaded_file.filename.endswith('.pdf'):
#         # Read the uploaded PDF document
#         uploaded_document = extract_text_from_pdf(uploaded_file.read())

#         # Example: Extracting a template from a long PDF
#         long_pdf_content = extract_text_from_pdf(open('C:\Users\anshc\Downloads\trial', 'rb').read())
#         template_start = "START_MARKER"
#         template_end = "END_MARKER"
#         template = extract_template_from_long_pdf(long_pdf_content, template_start, template_end)

#         if template is not None:
#             # Calculate word overlap
#             similarity_score = calculate_word_overlap(template, uploaded_document)

#             # You can set a threshold to determine if the document matches the template
#             threshold = 0.3
#             is_match = similarity_score >= threshold

#             return jsonify({'similarity_score': similarity_score, 'is_match': is_match})
#         else:
#             return jsonify({'error': 'Template not found in the long PDF.'})
#     else:
#         return jsonify({'error': 'Unsupported file format. Please upload a PDF file.'})



if __name__ == '__main__':
    app.run(debug=True)
