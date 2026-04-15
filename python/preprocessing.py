import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer

def clean_text(text):
    """
    Basic text cleaning: lowercase, remove punctuation, and extra whitespace.
    """
    text = text.lower()
    text = re.sub(f"[{re.escape(string.punctuation)}]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_url_features(text):
    """
    Extracts simple URL-based features.
    """
    features = {
        'has_url': 1 if re.search(r'http[s]?://|www\.', text) else 0,
        'has_suspicious_domain': 1 if re.search(r'\.net|\.org|\.info|\.biz|bit\.ly', text) else 0,
        'has_ip_address': 1 if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', text) else 0
    }
    return features

def extract_keyword_features(text):
    """
    Extracts keyword-based features.
    """
    keywords = ['urgent', 'verify', 'password', 'account', 'suspended', 'compromised', 'claim', 'win', 'prize', 'action']
    features = {}
    for word in keywords:
        features[f'key_{word}'] = 1 if word in text.lower() else 0
    return features

class PhishingFeatureExtractor:
    def __init__(self):
        self.tfidf = TfidfVectorizer(max_features=500)
        
    def fit(self, texts):
        cleaned_texts = [clean_text(t) for t in texts]
        self.tfidf.fit(cleaned_texts)
        
    def transform(self, texts):
        cleaned_texts = [clean_text(t) for t in texts]
        tfidf_features = self.tfidf.transform(cleaned_texts).toarray()
        
        # Add manual features
        manual_features = []
        for t in texts:
            url_f = extract_url_features(t)
            key_f = extract_keyword_features(t)
            combined = list(url_f.values()) + list(key_f.values())
            manual_features.append(combined)
            
        import numpy as np
        return np.hstack([tfidf_features, np.array(manual_features)])
