import React, { useEffect, useState } from 'react';
import { User, Mail, Hash, BookOpen, Github, Linkedin, Code2, ShieldCheck, MapPin, Briefcase } from 'lucide-react';
import { studentApi } from '../api/studentApi';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await studentApi.getDashboardStats();
      if (res.success) setProfile(res.data.profile);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-white/50">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      {/* Header Card */}
      <div className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <div className="h-24 w-24 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl font-black text-white shadow-2xl premium-shadow">
            {user?.name?.[0] || 'S'}
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white mb-2">{user?.name || 'Student Name'}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/40 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Hash className="h-4 w-4" /> {profile?.studentId || 'N/A'}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {profile?.branch || 'N/A'}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Kakinada, AP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact & Identity */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" /> Identity & Contact
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">Full Name</span>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">Official Email</span>
              <span className="text-white font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/40 text-sm">Student ID</span>
              <span className="text-white font-mono font-bold text-indigo-400">{profile?.studentId}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/40 text-sm">Department</span>
              <span className="text-white font-medium">{profile?.branch} Engineering</span>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" /> Verified Accounts
          </h3>
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border flex items-center justify-between transition ${profile?.githubUsername ? 'bg-white/5 border-indigo-500/30' : 'bg-transparent border-white/5 opacity-40'}`}>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-white" />
                <span className="text-sm font-bold text-white">{profile?.githubUsername || 'Not Linked'}</span>
              </div>
              {profile?.githubUsername && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between transition ${profile?.linkedinUrl ? 'bg-white/5 border-blue-500/30' : 'bg-transparent border-white/5 opacity-40'}`}>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-bold text-white">LinkedIn Profile</span>
              </div>
              {profile?.linkedinUrl && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between transition ${profile?.leetcodeUsername ? 'bg-white/5 border-orange-500/30' : 'bg-transparent border-white/5 opacity-40'}`}>
              <div className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-orange-400" />
                <span className="text-sm font-bold text-white">{profile?.leetcodeUsername || 'Not Linked'}</span>
              </div>
              {profile?.leetcodeUsername && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
            </div>
          </div>
        </div>
      </div>

      {/* Internship Preferences */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-purple-400" /> Internship & Career Interests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Preferred Roles</p>
            <div className="flex flex-wrap gap-2">
              {['Full Stack Developer', 'AI/ML Engineer', 'Backend Specialist'].map(role => (
                <span key={role} className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-xs font-bold">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Location Preferences</p>
            <div className="flex flex-wrap gap-2">
              {['Remote', 'Hyderabad', 'Bangalore'].map(loc => (
                <span key={loc} className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 text-xs font-bold">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
