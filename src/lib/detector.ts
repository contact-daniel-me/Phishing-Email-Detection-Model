export interface PredictionResult {
  label: 'Phishing' | 'Safe';
  score: number;
  suspiciousWords: string[];
  suspiciousUrls: string[];
}

const SUSPICIOUS_KEYWORDS = [
  'urgent', 'verify', 'password', 'account', 'suspended', 
  'compromised', 'claim', 'win', 'prize', 'action', 
  'login', 'security', 'update', 'immediately', 'official',
  'unauthorized', 'suspicious', 'billing', 'payment'
];

const SUSPICIOUS_DOMAINS = ['.net', '.org', '.info', '.biz', 'bit.ly', 'secure', 'verify', 'login-update', 'account-verify'];

export function predictEmail(text: string): PredictionResult {
  const lowerText = text.toLowerCase();
  
  let phishingScore = 0;
  const suspiciousWords: string[] = [];
  const suspiciousUrls: string[] = [];

  // 1. Keyword check
  SUSPICIOUS_KEYWORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(lowerText)) {
      phishingScore += 0.2;
      suspiciousWords.push(word);
    }
  });

  // 2. URL check
  const urlRegex = /http[s]?:\/\/\S+/g;
  const urls = text.match(urlRegex) || [];
  urls.forEach(url => {
    phishingScore += 0.3;
    suspiciousUrls.push(url);
    
    const lowerUrl = url.toLowerCase();
    SUSPICIOUS_DOMAINS.forEach(domain => {
      if (lowerUrl.includes(domain)) {
        phishingScore += 0.25;
      }
    });

    // Check for IP address in URL
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
      phishingScore += 0.4;
    }
  });

  // 3. Urgency/Pressure check
  const urgencyRegex = /(immediately|action required|within \d+ hours|final notice|suspended|compromised)/i;
  if (urgencyRegex.test(text)) {
    phishingScore += 0.3;
  }

  // 4. Greeting check (generic greetings are suspicious)
  const genericGreetingRegex = /(dear customer|dear user|valued member|dear account holder)/i;
  if (genericGreetingRegex.test(text)) {
    phishingScore += 0.2;
  }

  // Normalize score
  const normalizedScore = Math.min(phishingScore, 1);
  const label = normalizedScore > 0.45 ? 'Phishing' : 'Safe';

  return {
    label,
    score: normalizedScore,
    suspiciousWords: Array.from(new Set(suspiciousWords)),
    suspiciousUrls: Array.from(new Set(suspiciousUrls))
  };
}
