import sys
import os
from dataset import generate_sample_data
from preprocessing import PhishingFeatureExtractor, clean_text
from model import train_model, save_model, load_model, plot_confusion_matrix

def highlight_suspicious(text):
    """
    Highlights suspicious words and URLs in the text.
    """
    suspicious_keywords = ['urgent', 'verify', 'password', 'account', 'suspended', 'compromised', 'claim', 'win', 'prize', 'action']
    highlighted = text
    
    # Highlight keywords
    for word in suspicious_keywords:
        pattern = r'(?i)\b' + word + r'\b'
        highlighted = highlighted.replace(word, f"[{word.upper()}]")
        
    # Simple URL highlight
    import re
    urls = re.findall(r'http[s]?://\S+', text)
    for url in urls:
        highlighted = highlighted.replace(url, f"<URL:{url}>")
        
    return highlighted

def predict_email(text, model, extractor):
    """
    Predicts if an email is phishing or safe.
    """
    X = extractor.transform([text])
    prediction = model.predict(X)[0]
    probability = model.predict_proba(X)[0][1]
    
    result = "Phishing" if prediction == 1 else "Safe"
    return result, probability

def main():
    print("--- Phishing Email Detection System ---")
    
    # 1. Load/Generate Data
    print("Generating sample dataset...")
    df = generate_sample_data()
    
    # 2. Feature Extraction
    print("Extracting features...")
    extractor = PhishingFeatureExtractor()
    extractor.fit(df['text'])
    X = extractor.transform(df['text'])
    y = df['label']
    
    # 3. Train Model
    print("Training model...")
    model, metrics = train_model(X, y)
    
    print("\nModel Evaluation:")
    print(f"Accuracy: {metrics['accuracy']:.2f}")
    print(f"Precision: {metrics['precision']:.2f}")
    print(f"Recall: {metrics['recall']:.2f}")
    print(f"F1-Score: {metrics['f1']:.2f}")
    
    # 4. Save Model
    print("\nSaving model to phishing_model.pkl...")
    save_model(model, extractor)
    
    # 5. Interactive CLI
    print("\n--- Interactive Prediction ---")
    while True:
        email_text = input("\nEnter email content (or 'exit' to quit): ")
        if email_text.lower() == 'exit':
            break
            
        result, prob = predict_email(email_text, model, extractor)
        highlighted = highlight_suspicious(email_text)
        
        print(f"\nPrediction: {result}")
        print(f"Phishing Probability: {prob:.2%}")
        print(f"Analysis: {highlighted}")

if __name__ == "__main__":
    main()
