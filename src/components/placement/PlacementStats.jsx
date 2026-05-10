import React from 'react';

const PlacementStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Total Students</p>
        <p className="text-2xl font-bold mt-1">{stats.totalStudents || 0}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Average Readiness Score</p>
        <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.metrics?.averageReadinessScore || 0}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Verified GitHubs</p>
        <p className="text-2xl font-bold text-green-600 mt-1">{stats.metrics?.verifiedGithubProfiles || 0}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Top Performers (90+)</p>
        <p className="text-2xl font-bold text-blue-600 mt-1">{stats.metrics?.topPerformers || 0}</p>
      </div>
    </div>
  );
};

export default PlacementStats;
