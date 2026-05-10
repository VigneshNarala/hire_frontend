import React from 'react';
import { AlertTriangle, CheckCircle, Info, Target, TrendingUp, User } from 'lucide-react';

const EnterpriseAtsResults = ({ metrics }) => {
  if (!metrics) return null;

  const getBarColor = (score, max) => {
    const percent = score / max;
    if (percent > 0.8) return 'bg-emerald-500';
    if (percent > 0.5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const sections = [
    { label: 'Keyword Match', score: metrics.keyword?.score, max: metrics.keyword?.max },
    { label: 'Semantic Context', score: metrics.semantic?.score, max: metrics.semantic?.max },
    { label: 'Experience Level', score: metrics.experience?.score, max: metrics.experience?.max },
    { label: 'Structure', score: metrics.structure?.score, max: metrics.structure?.max },
    { label: 'Education', score: metrics.education?.score, max: metrics.education?.max },
    { label: 'Contact Info', score: metrics.contact?.score, max: metrics.contact?.max },
  ];

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">ATS Compliance</h3>
          <div className="relative h-40 w-40 flex items-center justify-center">
            <svg className="h-full w-full rotate-[-90deg]">
              <circle
                cx="80" cy="80" r="70"
                className="stroke-white/5 fill-none"
                strokeWidth="12"
              />
              <circle
                cx="80" cy="80" r="70"
                className="stroke-indigo-500 fill-none transition-all duration-1000"
                strokeWidth="12"
                strokeDasharray="440"
                strokeDashoffset={440 - (440 * (metrics.keyword?.score + metrics.semantic?.score + metrics.experience?.score + metrics.structure?.score + metrics.education?.score + metrics.contact?.score)) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{Math.round(metrics.keyword?.score + metrics.semantic?.score + metrics.experience?.score + metrics.structure?.score + metrics.education?.score + metrics.contact?.score)}</span>
              <span className="text-[10px] text-white/40 font-bold uppercase">Score</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-8">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-400" /> Metric Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {sections.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white/60">
                  <span>{item.label}</span>
                  <span>{Math.round(item.score)}/{item.max}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${getBarColor(item.score, item.max)}`}
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parsing Issues & Red Flags */}
      {(metrics.parsing_issues?.length > 0 || metrics.red_flags?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.parsing_issues?.length > 0 && (
            <div className="glass-card border-amber-500/20 p-6">
              <h4 className="text-amber-400 font-bold flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5" /> Parsing Issues
              </h4>
              <div className="space-y-3">
                {metrics.parsing_issues.map((issue, idx) => (
                  <div key={idx} className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                    <p className="text-amber-200 text-sm font-medium">{issue.msg}</p>
                    <p className="text-amber-500/60 text-[10px] mt-1 italic">Fix: {issue.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metrics.red_flags?.length > 0 && (
            <div className="glass-card border-rose-500/20 p-6">
              <h4 className="text-rose-400 font-bold flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5" /> Critical Red Flags
              </h4>
              <div className="space-y-3">
                {metrics.red_flags.map((flag, idx) => (
                  <div key={idx} className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/10">
                    <p className="text-rose-200 text-sm font-medium">{flag.msg}</p>
                    <p className="text-rose-500/60 text-[10px] mt-1 italic">Penalty: -{flag.penalty} pts</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Semantic Clusters & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h4 className="text-white font-bold flex items-center gap-2 mb-6">
            <CheckCircle className="h-5 w-5 text-emerald-400" /> Semantic Clusters
          </h4>
          <div className="space-y-4">
            {metrics.semantic_clusters?.length > 0 ? metrics.semantic_clusters.map((cluster, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold text-white/60 mb-1">
                  <span>{cluster.cluster}</span>
                  <span>{cluster.strength}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500/50" style={{ width: `${cluster.strength}%` }} />
                </div>
              </div>
            )) : (
              <p className="text-white/30 text-sm italic">No strong clusters detected. Add domain-specific context.</p>
            )}
          </div>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-white font-bold flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-indigo-400" /> Detected Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {metrics.skills?.slice(0, 12).map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/80 font-bold uppercase tracking-wider">
                {skill}
              </span>
            ))}
            {metrics.skills?.length > 12 && (
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
                +{metrics.skills.length - 12} More
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAtsResults;
