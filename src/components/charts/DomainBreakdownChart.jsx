import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#8b5cf6'];

const DomainBreakdownChart = ({ data }) => {
  return (
    <div className="h-80 w-full mt-4">
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="domain" 
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
              fontWeight="bold"
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
              fontWeight="bold"
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#fff'
              }}
            />
            <Bar dataKey="count" name="Students" radius={[8, 8, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-white/20 font-bold pb-8">
          No domain data available
        </div>
      )}
    </div>
  );
};

export default DomainBreakdownChart;
