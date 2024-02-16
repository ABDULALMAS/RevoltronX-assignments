from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import BertForSequenceClassification, BertTokenizer
import torch
import re
import unicodedata
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import nltk
import random

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Assuming you have the 'stop_words' set already loaded
stop_words = set(stopwords.words('english'))

# Create a 'lemmatizer' object
lemmatizer = WordNetLemmatizer()

app = FastAPI()

# Load your BERT model and tokenizer
model_name = "bert-base-uncased"
model = BertForSequenceClassification.from_pretrained(model_name)
model.eval()

# Using the default tokenizer for the model
tokenizer = BertTokenizer.from_pretrained(model_name)

# Labels for article genres (random labels for testing)
label_full_forms = ["Artificial Intelligence", "Cybersecurity", "Data Science", "Blockchain", "Internet of Things", 
                    "Machine Learning", "Robotics", "Cloud Computing", "Biotechnology", "Virtual Reality"]

class ArticleInput(BaseModel):
    article_text: str

class PredictionResult(BaseModel):
    predicted_genre: str
    confidence: float

def preprocess(text):
    text = ' '.join(re.sub(r'https?://\S+|www\.\S+', ' ', str(text)).split())

    # Remove emojis
    text = text.encode('ascii', 'ignore').decode('ascii')

    # Remove numbers
    text = ' '.join(re.sub(r'[0-9]', ' ', text).split())

    # Remove accented and non-English characters
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8', 'ignore')

    # Remove punctuations
    text = ''.join(re.sub(r'[^a-zA-Z0-9]', ' ', text))

    # Convert to lowercase
    text = text.lower()

    # Remove extra spaces
    text = ''.join(re.sub(r'^\s*|\s\s*', ' ', text).strip())

    # Remove stop words
    text = ' '.join([word for word in word_tokenize(text) if word.lower() not in stop_words])

    # Word Lemmatization
    text = ' '.join([lemmatizer.lemmatize(word, "v") for word in word_tokenize(text)])

    return text

def predict_genre(text):
    processed_text = preprocess(text)

    # Tokenize and encode the input
    inputs = tokenizer(processed_text, return_tensors="pt")

    # Make prediction
    with torch.no_grad():
        outputs = model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)[0].tolist()

    # Get the predicted genre
    predicted_genre_index = probabilities.index(max(probabilities))
    predicted_genre = label_full_forms[predicted_genre_index]

    return predicted_genre, max(probabilities)

@app.post("/predict", response_model=PredictionResult)
async def predict(article_input: ArticleInput):
    try:
        # Make prediction
        predicted_genre, confidence = predict_genre(article_input.article_text)

        # Return the prediction result
        return PredictionResult(predicted_genre=predicted_genre, confidence=confidence)

    except Exception as e:
        # Handle exceptions appropriately
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# API endpoint for autotagging
@app.post("/autotag", response_model=list[str])
async def autotag(article_input: ArticleInput):
    try:
        # Preprocess the input text
        processed_text = preprocess(article_input.article_text)

        # Tokenize and encode the input
        inputs = tokenizer(processed_text, return_tensors="pt")

        # Make prediction
        with torch.no_grad():
            outputs = model(**inputs)
            probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)[0].tolist()

        # Get the top 3 predicted genres
        top_indices = sorted(range(len(probabilities)), key=lambda i: probabilities[i], reverse=True)[:3]
        predicted_genres = [label_full_forms[i] for i in top_indices]

        return predicted_genres

    except Exception as e:
        # Handle exceptions appropriately
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
