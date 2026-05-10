import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DomainBreakdownChart = ({ data }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Domain Breakdown</h3>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="domain" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" name="Students" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 font-medium pb-8">
          No domain data available
        </div>
      )}
    </div>
  );
};

export default DomainBreakdownChart;
