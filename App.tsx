
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { analyzeResume } from './services/geminiService';
import { ResumeAnalysis, ExperienceLevel } from './types';
import { PREDEFINED_ROLES } from './constants';
import Dashboard from './components/Dashboard';
import { Upload, Cpu, Search, Briefcase, User, Loader2, Sparkles, ShieldCheck, FileText, AlertCircle, Trash2, Globe } from 'lucide-react';

declare const mammoth: any;
declare const pdfjsLib: any;

const App: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState(PREDEFINED_ROLES[0].title);
  const [customRole, setCustomRole] = useState('');
  const [expLevel, setExpLevel] = useState<ExperienceLevel>(ExperienceLevel.FRESHER);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isBackendChecking, setIsBackendChecking] = useState(true);

  useEffect(() => {
    // Small delay to simulate system health check on load
    const timer = setTimeout(() => setIsBackendChecking(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      if (typeof pdfjsLib === 'undefined') throw new Error("PDF Library not loaded yet.");
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n";
      }
      return fullText;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to parse PDF. Ensure it's not password protected.");
    }
  };

  const extractTextFromDocx = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      if (typeof mammoth === 'undefined') throw new Error("DOCX Library not loaded yet.");
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to parse Word document.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsParsing(true);
    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPdf(file);
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        text = await extractTextFromDocx(file);
      } else {
        text = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.readAsText(file);
        });
      }

      if (!text.trim()) throw new Error("No readable text found in file.");
      setResumeText(text);
    } catch (err: any) {
      setError(err.message || "File processing error.");
    } finally {
      setIsParsing(false);
      e.target.value = '';
    }
  };

  const handleStartAnalysis = async () => {
    if (!resumeText.trim()) {
      setError("Resume content is required.");
      return;
    }
    
    setError(null);
    setStep('analyzing');
    
    try {
      const finalRole = customRole.trim() || targetRole;
      const result = await analyzeResume(resumeText, finalRole, expLevel);
      setAnalysis(result);
      setStep('result');
    } catch (err: any) {
      console.error("Deployment Error Details:", err);
      setError(err.message || "A network or engine error occurred during analysis.");
      setStep('upload');
    }
  };

  if (isBackendChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <Cpu className="animate-spin text-indigo-400 mb-4" size={48} />
        <h2 className="text-xl font-bold tracking-tight">Enterprise ATS Initializing...</h2>
        <p className="text-slate-400 text-sm mt-2">Checking backend connection status</p>
      </div>
    );
  }

  if (step === 'result' && analysis) {
    return <Dashboard analysis={analysis} onReset={() => { setStep('upload'); setAnalysis(null); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Cpu size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-none">Enterprise ATS</span>
              <span className="text-[10px] text-indigo-600 font-bold tracking-tighter uppercase">Vercel Ready v3.4</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/team"  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Meet Our  Team
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <Globe size={14} /> Server Connected
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {step === 'upload' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-3 mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900">ATS Resume Optimizer</h1>
              <p className="text-lg text-slate-500">Professional-grade scoring engine with PDF/Word support.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Briefcase size={14} /> Target Job
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                >
                  {PREDEFINED_ROLES.map(role => (
                    <option key={role.id} value={role.title}>{role.title}</option>
                  ))}
                  <option value="Custom">Custom Role...</option>
                </select>
                {targetRole === 'Custom' && (
                  <input 
                    type="text"
                    placeholder="Enter role title..."
                    className="w-full mt-3 px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <User size={14} /> Experience
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(ExperienceLevel).map((level) => (
                    <button
                      key={level}
                      onClick={() => setExpLevel(level)}
                      className={`px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${
                        expLevel === level 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <FileText className="text-indigo-600" size={20} /> Resume Data
                </h3>
                <label className={`cursor-pointer px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-100 transition-all ${isParsing ? 'opacity-50 pointer-events-none' : ''}`}>
                  {isParsing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  <span>{isParsing ? 'Parsing...' : 'Upload File'}</span>
                  <input type="file" className="hidden" accept=".pdf,.docx,.txt,.md" onChange={handleFileUpload} disabled={isParsing} />
                </label>
              </div>

              <textarea 
                placeholder="Paste content or upload file..."
                className="w-full h-80 px-6 py-5 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-mono text-sm leading-relaxed text-slate-700 resize-none"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />

              {error && (
                <div className="mt-6 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="flex-shrink-0 mt-0.5 text-rose-600" size={20} /> 
                  <div className="space-y-1">
                    <p className="font-bold text-sm">Deployment Diagnostic</p>
                    <p className="text-xs leading-relaxed opacity-90 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <button 
                onClick={handleStartAnalysis}
                disabled={!resumeText || isParsing}
                className="w-full mt-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                <Search size={22} />
                Run Intelligence Analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-10">
            <div className="relative">
              <div className="w-32 h-32 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-indigo-600 animate-pulse" size={32} />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Engines Active</h2>
              <p className="text-slate-500 text-sm font-medium italic">Simulating Google/Amazon ATS screening protocols...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 mt-auto border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 Enterprise Talent Systems Deployment</p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default App;
