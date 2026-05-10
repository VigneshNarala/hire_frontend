import React from 'react';

const EnterpriseAtsResults = ({ metrics }) => {
  if (!metrics) return null;

  const getBarColor = (score, max) => {
    const percent = score / max;
    if (percent > 0.8) return 'bg-green-500';
    if (percent > 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mt-8 space-y-8">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-lg">
          <h3 className="text-xl font-semibold opacity-90">ATS Score</h3>
          <div className="text-6xl font-bold my-4">{Math.round(metrics.totalScore)}</div>
          <p className="opacity-80">Out of 100</p>
          <div className="mt-6 bg-white/20 rounded-xl p-4">
            <strong className="block text-sm uppercase tracking-wider mb-1">Parse Rate</strong>
            <div className="text-2xl font-bold">{Math.round(metrics.parseRate)}%</div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Keyword Match', score: metrics.keywordScore, max: 45 },
              { label: 'Semantic Context', score: metrics.semanticScore, max: 20 },
              { label: 'Experience Level', score: metrics.experienceScore, max: 12 },
              { label: 'Structure', score: metrics.structureScore, max: 10 },
              { label: 'Education', score: metrics.educationScore, max: 8 },
              { label: 'Contact Info', score: metrics.contactScore, max: 5 },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-gray-900">{Math.round(item.score)}/{item.max}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getBarColor(item.score, item.max)}`} 
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {metrics.parsingIssues && metrics.parsingIssues.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-sm">
          <h3 className="text-lg font-bold text-yellow-800 flex items-center mb-4">
            ⚠️ Critical Parsing Issues Detected
          </h3>
          <div className="space-y-3">
            {metrics.parsingIssues.map((issue, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800">{issue.message}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-green-600 font-medium">Fix: {issue.fix}</span>
                  <span className="text-red-500 font-medium bg-red-50 px-2 py-1 rounded">-{issue.penalty} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">📋 Contact Information</h3>
          <div className="flex gap-2">
            {['email', 'phone', 'linkedin'].map(type => (
              <div key={type} className={`flex-1 p-2 text-center rounded-lg text-sm font-medium ${metrics.contactInfo[type] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {metrics.contactInfo[type] ? '✓' : '✗'} <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">🔧 Technical Skills ({metrics.detectedSkills?.length || 0})</h3>
          <div className="flex flex-wrap gap-2">
            {metrics.detectedSkills?.slice(0, 15).map((skill, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
            {metrics.detectedSkills?.length > 15 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{metrics.detectedSkills.length - 15} more
              </span>
            )}
          </div>
        </div>

        {/* Resume Structure */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">📊 Section Detection</h3>
          <ul className="space-y-2 text-sm">
            {Object.entries(metrics.structure || {}).map(([key, value]) => (
              <li key={key} className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-700 capitalize">{key.replace('has', '')}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${value ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {value ? '✓ Found' : '✗ Missing'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Semantic Clusters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">🎯 Semantic Match</h3>
          {metrics.semanticMatches?.length > 0 ? (
            <div className="space-y-4">
              {metrics.semanticMatches.map((match, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{match.cluster}</span>
                    <span className="text-gray-500">{match.strength}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${match.strength}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No strong semantic clusters detected. Target your resume to a specific domain.</p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">📈 Achievements & Impact</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong className="text-gray-900">{metrics.bulletQuality?.total || 0}</strong> bullet points analyzed</p>
            <p><strong className="text-gray-900">{metrics.bulletQuality?.withMetrics || 0}</strong> contain quantifiable metrics</p>
            <p>Average Length: <strong className="text-gray-900">{metrics.bulletQuality?.avgWords || 0} words</strong></p>
            <p className="text-xs text-gray-500 mt-2">(Optimal length: 12-28 words per bullet)</p>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-600 mb-4">🚩 Red Flags</h3>
          {metrics.redFlags?.length > 0 ? (
            <div className="space-y-3">
              {metrics.redFlags.map((flag, idx) => (
                <div key={idx} className="bg-red-50 p-3 rounded text-sm text-red-800">
                  <strong>{flag.message}</strong>
                  <div className="mt-1 text-red-600">-{flag.penalty} pts penalty</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center text-green-600 font-medium">
              ✅ No keyword stuffing or hidden text detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAtsResults;
