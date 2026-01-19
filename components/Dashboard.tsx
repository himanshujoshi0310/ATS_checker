
import React from 'react';
import { ResumeAnalysis } from '../types';
import ScoreMeter from './ScoreMeter';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  Target, 
  Zap,
  Briefcase,
  Lightbulb,
  Printer
} from 'lucide-react';

interface DashboardProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, onReset }) => {
  const handlePrintReport = () => {
    const printContent = `
      <html>
        <head>
          <title>ATS Resume Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
            .score-section { margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
            .breakdown-item { display: flex; justify-content: space-between; margin: 8px 0; }
            .company-match { margin: 10px 0; padding: 10px; border-left: 4px solid #4f46e5; }
            .section { margin: 25px 0; }
            .section h3 { color: #4f46e5; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
            .list-item { margin: 5px 0; padding-left: 15px; }
            .suggestion-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 10px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Enterprise ATS Resume Analysis Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="score-section">
            <h2>Overall ATS Score: ${analysis.atsScore}%</h2>
            <p><strong>Readiness Level:</strong> ${analysis.readinessLevel}</p>
            <p><strong>Shortlist Probability:</strong> ${analysis.shortlistProbability}</p>
          </div>

          <div class="section">
            <h3>Score Breakdown</h3>
            ${Object.entries(analysis.breakdown).map(([key, val]) => 
              `<div class="breakdown-item">
                <span>${key.replace(/([A-Z])/g, ' $1')}</span>
                <span>${val}%</span>
              </div>`
            ).join('')}
          </div>

          <div class="section">
            <h3>Company Matches</h3>
            ${analysis.companyMatches.map(company => 
              `<div class="company-match">
                <strong>${company.name}</strong> - ${company.matchPercentage}% (${company.status})
                <br><small>${company.reason}</small>
              </div>`
            ).join('')}
          </div>

          <div class="section">
            <h3>Strengths</h3>
            ${analysis.strengths.map(strength => `<div class="list-item">• ${strength}</div>`).join('')}
          </div>

          <div class="section">
            <h3>Areas for Improvement</h3>
            ${analysis.weaknesses.map(weakness => `<div class="list-item">• ${weakness}</div>`).join('')}
          </div>

          <div class="section">
            <h3>Summary Optimization</h3>
            <div class="suggestion-box">
              <h4>Current Summary:</h4>
              <p>${analysis.summarySuggestion.current}</p>
              <h4>Optimized Summary:</h4>
              <p>${analysis.summarySuggestion.optimized}</p>
            </div>
          </div>

          <div class="section">
            <h3>Skill Optimization</h3>
            ${analysis.skillOptimization.map(category => 
              `<div class="suggestion-box">
                <h4>${category.category}</h4>
                <p>${category.skills.join(', ')}</p>
              </div>`
            ).join('')}
          </div>

          <div class="section">
            <h3>Experience Upgrades</h3>
            ${analysis.experienceUpgrades.map(upgrade => 
              `<div class="suggestion-box">
                <h4>Original:</h4>
                <p>${upgrade.original}</p>
                <h4>Upgraded:</h4>
                <p>${upgrade.upgraded}</p>
                <small><em>${upgrade.impactDescription}</em></small>
              </div>`
            ).join('')}
          </div>

          <div class="section">
            <h3>Future Skills to Develop</h3>
            ${analysis.futureSkills.map(skill => `<div class="list-item">• ${skill}</div>`).join('')}
          </div>

          <div class="section">
            <h3>Rejection Risks</h3>
            ${analysis.rejectionRisks.map(risk => `<div class="list-item">• ${risk}</div>`).join('')}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Enterprise ATS Evaluation</h1>
          <p className="text-slate-500 mt-1">Simulated Hiring Engine Insights</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrintReport}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Printer size={18} /> Print Report
          </button>
          <button 
            onClick={onReset}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Zap size={18} /> Analyze New Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Scores and Readiness */}
        <div className="lg:col-span-4 space-y-8">
          <ScoreMeter score={analysis.atsScore} label="Overall ATS Score" />
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp size={16} /> Readiness & Probability
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 font-medium">Readiness Level</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    analysis.readinessLevel === 'FAANG Ready' ? 'bg-indigo-100 text-indigo-700' :
                    analysis.readinessLevel === 'Industry Ready' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{analysis.readinessLevel}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      analysis.readinessLevel === 'FAANG Ready' ? 'w-full bg-indigo-500' :
                      analysis.readinessLevel === 'Industry Ready' ? 'w-2/3 bg-emerald-500' :
                      'w-1/3 bg-slate-400'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 font-medium">Shortlist Probability</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    analysis.shortlistProbability === 'EXCEPTIONAL' || analysis.shortlistProbability === 'HIGH' ? 'bg-emerald-100 text-emerald-700' :
                    analysis.shortlistProbability === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>{analysis.shortlistProbability}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(analysis.breakdown).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-semibold text-slate-800">{val}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-800 transition-all duration-1000"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Company Matches & Insights */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase className="text-slate-400" /> Company-Specific Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.companyMatches.map((company, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{company.name}</span>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      company.status === 'Strong Match' ? 'bg-emerald-100 text-emerald-700' :
                      company.status === 'Shortlist' ? 'bg-blue-100 text-blue-700' :
                      company.status === 'Borderline' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>{company.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          company.matchPercentage >= 80 ? 'bg-emerald-500' :
                          company.matchPercentage >= 70 ? 'bg-blue-500' :
                          company.matchPercentage >= 60 ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${company.matchPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{company.matchPercentage}%</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{company.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 text-emerald-600">
                <CheckCircle size={20} /> Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((s, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-rose-500">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 text-rose-600">
                <AlertTriangle size={20} /> Critical Weaknesses
              </h3>
              <ul className="space-y-3">
                {analysis.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Section */}
      <div className="space-y-8 mb-12">
        <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-700 rounded-lg">
                <Target className="text-indigo-200" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Smart Optimization Lab</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-indigo-800/50 p-6 rounded-2xl border border-indigo-700">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-4">Professional Summary Upgrade</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-indigo-400 mb-1">Current:</p>
                      <p className="text-sm text-indigo-100 italic">"{analysis.summarySuggestion.current}"</p>
                    </div>
                    <div className="pt-4 border-t border-indigo-700">
                      <p className="text-xs text-emerald-400 mb-1 flex items-center gap-1 font-bold">
                        <Zap size={12} /> ATS OPTIMIZED VERSION:
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{analysis.summarySuggestion.optimized}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-200 mb-4">Future Skill Recommendations</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.futureSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium hover:bg-white/30 cursor-default transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-200 mb-4">Bullet Point Performance Upgrades</h4>
                <div className="space-y-6">
                  {analysis.experienceUpgrades.map((upgrade, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-indigo-500 pb-2">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_indigo]" />
                      <p className="text-xs text-indigo-300 mb-2 line-through opacity-60">{upgrade.original}</p>
                      <p className="text-sm text-white font-medium mb-1">{upgrade.upgraded}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold bg-emerald-400/10 w-fit px-2 py-0.5 rounded">
                        <Lightbulb size={12} /> {upgrade.impactDescription}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Abstract BG Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Role-Optimized Skill Taxonomy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysis.skillOptimization.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, sIdx) => (
                    <span key={sIdx} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="bg-rose-100 p-3 rounded-xl">
            <XCircle className="text-rose-600" size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-rose-900 mb-1">Critical Rejection Risks</h4>
            <p className="text-sm text-rose-700">The following factors may trigger automatic ATS rejections or recruiter dismissals:</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {analysis.rejectionRisks.map((risk, idx) => (
              <span key={idx} className="px-4 py-2 bg-white border border-rose-200 text-rose-700 text-xs font-bold rounded-xl shadow-sm">
                {risk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
