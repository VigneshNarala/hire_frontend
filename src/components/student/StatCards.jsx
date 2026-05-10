import React from 'react';
import { Upload, FileText, CheckCircle, TrendingUp, Github, Linkedin, Code2, Award } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick, upload, buttonText }) => (
  <div className="glass-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300">
    <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${color}`}>
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-white/90 mb-1">{title}</h3>
    <p className="text-white/40 text-xs mb-3">{subtitle}</p>
    <div className="text-3xl font-bold gradient-text mb-4">{value}</div>
    
    {upload ? (
      <label className="w-full glass-button flex items-center justify-center gap-2 cursor-pointer text-sm">
        <Upload className="h-4 w-4" /> {buttonText || 'Upload'}
        <input type="file" className="hidden" onChange={onClick} accept=".pdf,.doc,.docx,.txt" />
      </label>
    ) : (
      <button onClick={onClick} className="w-full glass-button text-sm">
        {buttonText || 'Sync Now'}
      </button>
    )}
  </div>
);

const StatCards = ({ stats, onFileUpload, onGithubSync, onCodingSync, onLinkedInSync, onCredlySync }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <StatCard 
        title="ATS Score" 
        subtitle="Resume Optimization" 
        value={`${stats?.atsScore || 0}/100`} 
        icon={FileText} 
        color="bg-blue-500/20" 
        upload 
        onClick={onFileUpload}
        buttonText="Update Resume"
      />
      
      <StatCard 
        title="GitHub" 
        subtitle="Skill Verification" 
        value={`${stats?.verifiedSkillScore || 0}/100`} 
        icon={Github} 
        color="bg-gray-500/20" 
        onClick={onGithubSync}
        buttonText="Sync Projects"
      />

      <StatCard 
        title="Coding Score" 
        subtitle="LeetCode & GFG" 
        value={`${stats?.codingScore || 0}/100`} 
        icon={Code2} 
        color="bg-orange-500/20" 
        onClick={onCodingSync}
        buttonText="Sync Profiles"
      />

      <StatCard 
        title="Certifications" 
        subtitle="Credly Portal" 
        value={stats?.certificates || 0} 
        icon={Award} 
        color="bg-purple-500/20" 
        onClick={onCredlySync}
        buttonText="Sync Badges"
      />
    </div>
  );
};

export default StatCards;
