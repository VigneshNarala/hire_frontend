import React from 'react';
import { ExternalLink, Github, Linkedin, Award, Code2 } from 'lucide-react';

const TopCandidatesTable = ({ students, domain, loading }) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="p-8 text-center text-white/40">Loading top candidates...</div>
      ) : students.length === 0 ? (
        <div className="p-8 text-center text-white/40 italic">No candidates found for this segment.</div>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4 text-left">Candidate</th>
              <th className="px-6 py-4 text-left">Domain Stats</th>
              <th className="px-6 py-4 text-left">Readiness</th>
              <th className="px-6 py-4 text-right">Profiles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => (
              <tr key={student.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition">{student.name}</span>
                    <span className="text-[10px] text-white/30 font-mono">{student.studentId} • {student.branch}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3 w-3 text-orange-400" />
                      <span className="text-[10px] font-bold text-white/80">{student.scores?.coding || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Github className="h-3 w-3 text-white/60" />
                      <span className="text-[10px] font-bold text-white/80">{student.scores?.verifiedSkills || 0}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${student.scores?.readiness || 0}%` }} />
                    </div>
                    <span className="text-xs font-black text-white">{student.scores?.readiness || 0}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    {student.linkedin && (
                      <a href={student.linkedin} target="_blank" rel="noreferrer" className="p-1.5 bg-white/5 hover:bg-blue-500/20 rounded-lg transition">
                        <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                      </a>
                    )}
                    {student.github && (
                      <a href={`https://github.com/${student.github}`} target="_blank" rel="noreferrer" className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition">
                        <Github className="h-3.5 w-3.5 text-white/80" />
                      </a>
                    )}
                    <button className="p-1.5 bg-white/5 hover:bg-indigo-500/20 rounded-lg transition group/btn">
                      <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopCandidatesTable;
