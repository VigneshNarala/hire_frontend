import React, { useEffect, useState } from 'react';
import StatCards from '../components/student/StatCards';
import DynamicPerformanceChart from '../components/charts/DynamicPerformanceChart';
import EnterpriseAtsResults from '../components/student/EnterpriseAtsResults';
import { studentApi } from '../api/studentApi';
import { useAuth } from '../hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    placementReadinessScore: 0,
    verifiedSkillScore: 0,
    resumeScore: 0,
    certificateCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentApi.getDashboardStats()
      .then(res => {
        if (res.success) {
          setStats(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stats', err);
        setLoading(false);
      });
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetRole', 'FSD'); // Matches backend enum
    
    try {
      await studentApi.uploadResume(formData);
      // Refresh stats
      const newRes = await studentApi.getDashboardStats();
      if (newRes.success) setStats(newRes.data);
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
      const newRes = await studentApi.getDashboardStats();
      if (newRes.success) setStats(newRes.data);
      alert('GitHub synced successfully!');
    } catch (err) {
      alert('Sync failed: ' + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Student'}</h1>
          <p className="text-gray-500 mt-1">Upload your resume and sync GitHub to get your Placement Readiness Score.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Placement Readiness</p>
          <div className="text-4xl font-extrabold text-indigo-600">{stats.currentScores?.placementReadiness || 0}<span className="text-lg text-gray-400">/100</span></div>
        </div>
      </div>

      <StatCards 
        stats={{...stats.currentScores, certificates: stats.certificates}} 
        onFileUpload={handleFileUpload} 
        onGithubSync={handleGithubSync} 
      />

      {/* New ATS Metrics UI */}
      {stats.currentScores?.atsScore > 0 && stats.latestResumeMetrics && (
        <EnterpriseAtsResults metrics={stats.latestResumeMetrics} />
      )}

      <DynamicPerformanceChart data={stats.recentScores} />
    </div>
  );
};

export default StudentDashboard;
