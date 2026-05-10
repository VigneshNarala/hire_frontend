import React from 'react';
import { Users, Target, Github, Award } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass-card p-6 flex items-center gap-4">
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">{label}</p>
      <p className="text-2xl font-black text-white mt-0.5">{value}</p>
    </div>
  </div>
);

const PlacementStats = ({ stats, total }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Total Active Students" 
        value={total || 0} 
        icon={Users} 
        color="bg-indigo-500/20" 
      />
      <StatCard 
        label="Avg. Readiness Score" 
        value={`${Math.round(stats?.averageReadinessScore || 0)}%`} 
        icon={Target} 
        color="bg-purple-500/20" 
      />
      <StatCard 
        label="Verified GitHub Profiles" 
        value={stats?.verifiedGithubProfiles || 0} 
        icon={Github} 
        color="bg-emerald-500/20" 
      />
      <StatCard 
        label="Top 90+ Performers" 
        value={stats?.topPerformers || 0} 
        icon={Award} 
        color="bg-amber-500/20" 
      />
    </div>
  );
};

export default PlacementStats;
