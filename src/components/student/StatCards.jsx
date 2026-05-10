import React from 'react';
import { Upload, FileText, CheckCircle, TrendingUp } from 'lucide-react';

const StatCards = ({ stats, onFileUpload, onGithubSync }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Resume Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition">
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Resume Score</h3>
        <p className="text-gray-500 text-sm mb-4">AI parsed ATS score</p>
        <div className="text-3xl font-bold text-gray-900 mb-4">{stats?.atsScore || 0}/100</div>
        <label className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 flex items-center justify-center gap-2 transition cursor-pointer">
          <Upload className="h-4 w-4" /> Upload New
          <input type="file" className="hidden" onChange={onFileUpload} accept=".pdf,.doc,.docx,.txt" />
        </label>
      </div>

      {/* GitHub Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition">
        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-gray-700" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Verified Skill Score</h3>
        <p className="text-gray-500 text-sm mb-4">Based on GitHub projects</p>
        <div className="text-3xl font-bold text-gray-900 mb-4">{stats?.verifiedSkillScore || 0}/100</div>
        <button onClick={onGithubSync} className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
          Sync GitHub
        </button>
      </div>

      {/* Learning Path */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition">
        <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Certifications</h3>
        <p className="text-gray-500 text-sm mb-4">Verified domain certs</p>
        <div className="text-3xl font-bold text-gray-900 mb-4">{stats?.certificates || 0} Valid</div>
        <button className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
          Add Certificate
        </button>
      </div>
    </div>
  );
};

export default StatCards;
