import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DynamicPerformanceChart = ({ data }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Placement Readiness Trend</h3>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.slice().reverse()}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis domain={[0, 100]} />
            <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
            <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 font-medium pb-10">
          Waiting for historical data (Upload a resume to begin)
        </div>
      )}
    </div>
  );
};

export default DynamicPerformanceChart;
