import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const AtsMetricsBreakdown = ({ metrics }) => {
  // Fallback default metrics if not yet processed
  const data = metrics || {
    buzzwords: { status: 'pass', msg: 'Industry keywords found' },
    lengthen_summary: { status: 'fail', msg: 'Summary is too short' },
    bullet_lengths: { status: 'pass', msg: 'Optimal bullet lengths' },
    repetition: { status: 'warn', msg: 'Some repeated action verbs' },
    dates: { status: 'pass', msg: 'Dates are formatted correctly' },
    growth_signals: { status: 'fail', msg: 'No clear promotions/impact' },
    unnecessary_sections: { status: 'pass', msg: 'No unnecessary sections' },
    contact_details: { status: 'pass', msg: 'Contact details complete' },
    skill_chart: { status: 'pass', msg: 'Skills clearly categorized' },
    experience: { status: 'warn', msg: 'Experience depth is low' },
    extra_curricular: { status: 'fail', msg: 'No leadership roles found' }
  };

  const getIcon = (status) => {
    switch(status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warn': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatKey = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Detailed ATS Metrics Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100">
            <div className="mt-0.5 mr-3">
              {getIcon(value.status)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{formatKey(key)}</p>
              <p className="text-xs text-gray-500 mt-1">{value.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtsMetricsBreakdown;
