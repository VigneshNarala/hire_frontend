import React, { useEffect, useState } from 'react';
import PlacementStats from '../components/placement/PlacementStats';
import DomainBreakdownChart from '../components/charts/DomainBreakdownChart';
import TopCandidatesTable from '../components/placement/TopCandidatesTable';
import { placementApi } from '../api/placementApi';
import { Users, Filter, Download, PieChart as PieChartIcon } from 'lucide-react';

const PlacementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    metrics: {
      averageReadinessScore: 0,
      verifiedGithubProfiles: 0,
      topPerformers: 0
    },
    domainBreakdown: []
  });
  const [domain, setDomain] = useState('All Domains');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [domain]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, candidatesRes] = await Promise.all([
        placementApi.getStats(),
        placementApi.getTopCandidates(domain)
      ]);
      if (statsRes.success) setStats(statsRes.data);
      if (candidatesRes.success) setStudents(candidatesRes.data.candidates);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch placement data', err);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            TPO Insights Hub <Users className="text-indigo-400 h-6 w-6" />
          </h1>
          <p className="text-white/50">Real-time student ranking and domain-wise performance analytics.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <select 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl shadow-2xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
            >
              <option className="bg-slate-900">All Domains</option>
              <option className="bg-slate-900">FSD</option>
              <option className="bg-slate-900">ML</option>
              <option className="bg-slate-900">Data Science</option>
              <option className="bg-slate-900">Backend</option>
            </select>
          </div>
          <button className="glass-button flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <PlacementStats stats={stats.metrics} total={stats.totalStudents} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-indigo-400" /> Domain Distribution
          </h3>
          <DomainBreakdownChart data={stats.domainBreakdown} />
        </div>
        
        <div className="lg:col-span-2 glass-card p-6 overflow-hidden">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" /> Top Ranked Candidates
          </h3>
          <TopCandidatesTable students={students} domain={domain} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
