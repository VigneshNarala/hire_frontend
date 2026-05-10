import React, { useEffect, useState } from 'react';
import StatCards from '../components/student/StatCards';
import DynamicPerformanceChart from '../components/charts/DynamicPerformanceChart';
import EnterpriseAtsResults from '../components/student/EnterpriseAtsResults';
import { studentApi } from '../api/studentApi';
import { useAuth } from '../hooks/useAuth';
import { MapPin, Briefcase, ExternalLink, Sparkles } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    placementReadiness: 0,
    verifiedSkillScore: 0,
    codingScore: 0,
    atsScore: 0,
    certificates: 0,
    internships: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await studentApi.getDashboardStats();
      if (res.success) setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch stats', err);
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetRole', 'FSD');
    
    try {
      await studentApi.uploadResume(formData);
      await fetchStats();
      alert('Resume processed successfully!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  const handleGithubSync = async () => {
    const username = prompt("Enter your GitHub Username:");
    if (!username) return;
    try {
      await studentApi.syncGithub(username);
      await fetchStats();
      alert('GitHub synced successfully!');
    } catch (err) {
      alert('Sync failed: ' + err.message);
    }
  };

  const handleCodingSync = async () => {
    const leetcode = prompt("Enter your LeetCode Username:");
    const gfg = prompt("Enter your GeeksforGeeks Username:");
    if (!leetcode && !gfg) return;
    try {
      await studentApi.syncCodingProfiles({ leetcode, gfg });
      await fetchStats();
      alert('Coding profiles synced!');
    } catch (err) {
      alert('Sync failed: ' + err.message);
    }
  };

  const handleCredlySync = async () => {
    const url = prompt("Enter your Credly Profile URL:");
    if (!url) return;
    try {
      await studentApi.syncCredly(url);
      await fetchStats();
      alert('Credly profile linked!');
    } catch (err) {
      alert('Link failed: ' + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center text-white/50">Loading Smart Hire Dashboard...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            Welcome, {user?.name || 'Student'} <Sparkles className="text-indigo-400 h-6 w-6" />
          </h1>
          <p className="text-white/50">Your AI-driven placement readiness is being tracked in real-time.</p>
        </div>
        <div className="glass-card px-8 py-4 text-center premium-shadow">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Overall Readiness</p>
          <div className="text-5xl font-black gradient-text">{stats.currentScores?.placementReadiness || 0}%</div>
          <div className="mt-1 text-xs text-indigo-400 font-medium">{stats.rank || 'Calculating...'}</div>
        </div>
      </div>

      <StatCards 
        stats={{...stats.currentScores, certificates: stats.certificates}} 
        onFileUpload={handleFileUpload} 
        onGithubSync={handleGithubSync}
        onCodingSync={handleCodingSync}
        onCredlySync={handleCredlySync}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {stats.currentScores?.atsScore > 0 && stats.latestResumeMetrics && (
            <EnterpriseAtsResults metrics={stats.latestResumeMetrics} />
          )}
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" /> Performance Analytics
            </h3>
            <DynamicPerformanceChart data={stats.recentScores} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-400" /> Internship Suggestions
            </h3>
            <div className="space-y-4">
              {stats.internships?.length > 0 ? stats.internships.map(intern => (
                <div key={intern.id} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-indigo-300 transition">{intern.title}</h4>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{intern.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs mb-3">
                    <span className="flex items-center gap-1"><ExternalLink className="h-3 w-3" /> {intern.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {intern.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-400 font-bold text-sm">{intern.stipend}</span>
                    <button className="text-[10px] text-white/60 hover:text-white underline">Apply Now</button>
                  </div>
                </div>
              )) : (
                <p className="text-white/30 text-sm italic">Sync your profiles to get personalized suggestions.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
