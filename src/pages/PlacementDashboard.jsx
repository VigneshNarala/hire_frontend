import React, { useEffect, useState } from 'react';
import PlacementStats from '../components/placement/PlacementStats';
import DomainBreakdownChart from '../components/charts/DomainBreakdownChart';
import TopCandidatesTable from '../components/placement/TopCandidatesTable';
import { placementApi } from '../api/placementApi';

const PlacementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageReadinessScore: 0,
    verifiedGithubs: 0,
    topPerformers: 0
  });
  const [domain, setDomain] = useState('All Domains');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      placementApi.getStats(),
      placementApi.getTopCandidates(domain)
    ]).then(([statsRes, candidatesRes]) => {
      if (statsRes.success) setStats(statsRes.data);
      if (candidatesRes.success) setStudents(candidatesRes.data.candidates);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to fetch placement data', err);
      setLoading(false);
    });
  }, [domain]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Placement Officer Dashboard</h1>
        <select 
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>All Domains</option>
          <option>Full Stack</option>
          <option>ML</option>
          <option>Data Science</option>
          <option>Cloud</option>
          <option>Cybersecurity</option>
        </select>
      </div>

      <PlacementStats stats={stats} />
      <DomainBreakdownChart data={stats.domainBreakdown} />
      <TopCandidatesTable students={students} domain={domain} loading={loading} />
    </div>
  );
};

export default PlacementDashboard;
