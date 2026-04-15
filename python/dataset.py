import pandas as pd
import numpy as np

def generate_sample_data():
    """
    Generates a small sample dataset of phishing and legitimate emails.
    """
    data = {
        'text': [
            # Legitimate Emails
            "Hey, are we still meeting for lunch at 12:30? Let me know.",
            "The project report is due tomorrow. Please review the latest draft.",
            "Your Amazon order has been shipped and will arrive by Wednesday.",
            "Can you send me the notes from today's meeting? I missed the first half.",
            "Happy Birthday! Hope you have a wonderful day with your family.",
            "The weekly sync has been moved to Thursday at 10 AM.",
            "Please find the attached invoice for last month's consulting services.",
            "Just checking in to see how the new hire is settling in.",
            
            # Phishing Emails
            "URGENT: Your account has been compromised. Click here to verify your identity: http://secure-login-verify.com",
            "Dear customer, your bank account is suspended. Please update your password immediately at http://bit.ly/fake-bank",
            "You have won a $1000 Walmart gift card! Claim your prize now: http://win-prizes-free.net/claim",
            "Action Required: Verify your PayPal account to avoid permanent suspension.",
            "Official Notice: Your tax refund is ready. Download the form here: http://irs-refund-portal.org/form.exe",
            "Security Alert: A new device logged into your account. If this wasn't you, secure your account now.",
            "Congratulations! You are selected for a work-from-home job. Earn $5000/week. Contact us at scam@job-offers.com",
            "Your Netflix subscription has expired. Update your payment method to continue watching: http://netflix-update.com"
        ],
        'label': [
            0, 0, 0, 0, 0, 0, 0, 0,  # 0 for Safe
            1, 1, 1, 1, 1, 1, 1, 1   # 1 for Phishing
        ]
    }
    return pd.DataFrame(data)

if __name__ == "__main__":
    df = generate_sample_data()
    print(df.head())
    print(f"\nDataset size: {len(df)}")
