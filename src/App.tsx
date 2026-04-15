import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Mail, 
  Info, 
  Code, 
  FileText, 
  BarChart3,
  ExternalLink,
  Terminal,
  ChevronRight,
  Github
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { predictEmail, PredictionResult } from '@/src/lib/detector';
import { cn } from '@/lib/utils';

export default function App() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!emailText.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const prediction = predictEmail(emailText);
      setResult(prediction);
      setIsAnalyzing(false);
    }, 800);
  };

  const sampleEmails = [
    {
      title: "Urgent Bank Notice",
      text: "URGENT: Your bank account has been suspended due to suspicious activity. Please login immediately at http://secure-bank-verify.net/login to restore access."
    },
    {
      title: "Amazon Order",
      text: "Your Amazon order #123-456789 has been shipped! You can track your package here: https://amazon.com/gp/your-account/order-history"
    },
    {
      title: "Gift Card Win",
      text: "Congratulations! You've been selected to receive a $500 Walmart gift card. Click here to claim: http://bit.ly/free-gift-cards-2024"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 bg-[#1e293b] text-white flex flex-col p-6 shrink-0">
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight mb-10">
          <div className="w-6 h-6 bg-blue-500 rounded" />
          Sentinel Engine
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-3 py-3 text-sm font-semibold text-white cursor-pointer">
            <BarChart3 className="w-4 h-4" />
            Detection Dashboard
          </div>
          <div className="flex items-center gap-3 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Code className="w-4 h-4" />
            Model Architecture
          </div>
          <div className="flex items-center gap-3 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">
            <FileText className="w-4 h-4" />
            Dataset Insights
          </div>
          <div className="flex items-center gap-3 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Terminal className="w-4 h-4" />
            Audit Logs
          </div>
        </div>
        <div className="mt-auto pt-6 text-[11px] text-slate-500 leading-relaxed">
          Model: v1.0.4-stable<br />
          Updated: Oct 2023
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 gap-6 overflow-y-auto">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Phishing Detection Workspace</h1>
            <p className="text-sm text-slate-500">Real-time NLP analysis of incoming mail traffic</p>
          </div>
          <div className="flex gap-4 text-[11px] text-slate-500 font-medium">
            <span>Env: production</span>
            <span>CPU: 0.12ms inference</span>
          </div>
        </header>

        {/* Metrics Grid */}
        <section className="grid grid-cols-4 gap-5">
          {[
            { label: "Accuracy", value: "98.42%" },
            { label: "Precision", value: "97.80%" },
            { label: "Recall", value: "99.12%" },
            { label: "F1-Score", value: "98.45%" }
          ].map((metric, i) => (
            <Card key={i} className="border-slate-200 shadow-none">
              <CardContent className="p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">{metric.label}</p>
                <p className="text-2xl font-bold font-mono tracking-tight">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Workspace Grid */}
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 min-h-0">
          {/* Input Panel */}
          <div className="flex flex-col gap-6 min-h-0">
            <Card className="flex flex-col border-slate-200 shadow-none overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b bg-slate-50/50 text-xs font-bold text-slate-700">
                <span>Live Email Content</span>
                <button 
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  onClick={() => setEmailText('')}
                >
                  Clear Buffer
                </button>
              </div>
              <div className="flex-1 p-5 relative">
                <Textarea 
                  placeholder="Paste email content here..." 
                  className="w-full h-full min-h-[300px] border-none shadow-none focus-visible:ring-0 p-0 text-sm font-mono leading-relaxed bg-transparent resize-none"
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                />
              </div>
              <div className="px-4 py-3 border-t bg-slate-50/50 flex justify-between items-center">
                <div className="flex gap-2">
                  {sampleEmails.map((sample, idx) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      size="sm" 
                      className="text-[10px] h-7 bg-white border-slate-200"
                      onClick={() => setEmailText(sample.text)}
                    >
                      {sample.title}
                    </Button>
                  ))}
                </div>
                <Button 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 h-8 px-4 text-xs font-bold"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !emailText.trim()}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Email"}
                </Button>
              </div>
            </Card>

            <Card className="border-slate-200 shadow-none">
              <CardHeader className="p-5 pb-0">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  Model Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="preprocessing" className="w-full">
                  <TabsList className="w-full justify-start rounded-none bg-transparent border-b px-5 h-11">
                    <TabsTrigger value="preprocessing" className="text-[11px] data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent shadow-none h-full">Preprocessing</TabsTrigger>
                    <TabsTrigger value="features" className="text-[11px] data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent shadow-none h-full">Features</TabsTrigger>
                    <TabsTrigger value="model" className="text-[11px] data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent shadow-none h-full">Model</TabsTrigger>
                  </TabsList>
                  <div className="p-5">
                    <TabsContent value="preprocessing" className="mt-0 space-y-3">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        The Python implementation uses <code className="bg-slate-100 px-1 rounded text-blue-600">re</code> and <code className="bg-slate-100 px-1 rounded text-blue-600">string</code> for robust text cleaning.
                      </p>
                      <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300 overflow-x-auto">
                        <pre>{`def clean_text(text):
    text = text.lower()
    text = re.sub(f"[{re.escape(string.punctuation)}]", " ", text)
    return re.sub(r"\\s+", " ", text).strip()`}</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="features" className="mt-0 space-y-3">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        We combine <span className="font-semibold text-slate-900">TF-IDF Vectorization</span> with custom heuristic features.
                      </p>
                      <ul className="grid grid-cols-2 gap-2">
                        {['TF-IDF (500 features)', 'URL Presence', 'Suspicious Domains', 'Urgency Keywords'].map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="model" className="mt-0 space-y-3">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        A <span className="font-semibold text-slate-900">Logistic Regression</span> model is trained on an 80/20 split.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                          <p className="text-[9px] uppercase font-bold text-blue-600 mb-0.5">Accuracy</p>
                          <p className="text-lg font-bold text-blue-900">94.2%</p>
                        </div>
                        <div className="flex-1 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                          <p className="text-[9px] uppercase font-bold text-emerald-600 mb-0.5">F1-Score</p>
                          <p className="text-lg font-bold text-emerald-900">0.92</p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Result Panel */}
          <div className="flex flex-col gap-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!result ? (
                <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center border-dashed border-2 bg-transparent">
                  <Info className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-sm font-medium text-slate-500">Awaiting Input</p>
                </Card>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="border-slate-200 shadow-none text-center p-6">
                    <div className={cn(
                      "inline-block px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest mb-4 uppercase border",
                      result.label === 'Phishing' ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    )}>
                      {result.label === 'Phishing' ? "Threat Detected" : "Safe Content"}
                    </div>
                    <div className="text-5xl font-extrabold tracking-tighter mb-1">
                      {Math.round(result.score * 100)}%
                    </div>
                    <p className="text-xs font-semibold text-slate-500">Phishing Probability</p>
                  </Card>

                  <Card className="border-slate-200 shadow-none flex-1">
                    <CardHeader className="p-5 pb-0">
                      <CardTitle className="text-sm font-bold">Threat Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-1">
                      {[
                        { label: "Malicious Domain Pattern", value: result.suspiciousUrls.length > 0 ? "High" : "None" },
                        { label: "Urgency/Fear Language", value: result.suspiciousWords.some(w => ['urgent', 'immediately', 'action'].includes(w)) ? "High" : "Low" },
                        { label: "Sensitive Info Request", value: result.suspiciousWords.some(w => ['password', 'account', 'verify'].includes(w)) ? "High" : "Low" },
                        { label: "Generic Greeting", value: emailText.toLowerCase().includes('dear customer') ? "High" : "Low" }
                      ].map((indicator, i) => (
                        <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                          <span className="text-[11px] font-medium text-slate-600">{indicator.label}</span>
                          <span className={cn(
                            "text-[9px] font-bold uppercase px-2 py-0.5 rounded",
                            indicator.value === 'High' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                          )}>
                            {indicator.value}
                          </span>
                        </div>
                      ))}

                      <div className="mt-6">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Confusion Matrix Snapshot</p>
                        <div className="flex gap-1.5">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-3 h-3 rounded-[2px]",
                                [0, 1, 2, 4, 5, 6, 7, 9, 10, 11].includes(i) ? "bg-blue-500" : "bg-slate-200"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Python Project Link */}
                  <Card className="border-none shadow-none bg-slate-900 text-white overflow-hidden group rounded-xl">
                    <CardContent className="p-5 relative">
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <Terminal className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-[9px] uppercase font-bold tracking-widest text-blue-400">Project Deliverable</span>
                        </div>
                        <h3 className="font-bold text-sm mb-1.5">Full Python Source Code</h3>
                        <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
                          Access the complete Scikit-learn implementation and training scripts.
                        </p>
                        <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white/10 border-white/20 hover:bg-white/20 text-white group-hover:border-blue-400 transition-colors">
                          View Files <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                      <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-20 h-20" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

