import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Briefcase, ArrowRight, User, Mail, Lock, Hash, MapPin, Sparkles } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [studentId, setStudentId] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = { name, email, password, role };
    if (role === 'student') {
      payload.studentId = studentId;
      payload.branch = branch;
    }

    try {
      const user = await register(payload);
      if (user.role === 'placement') navigate('/placement');
      else navigate('/student');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
              <Briefcase className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">SMART<span className="text-indigo-500">HIRE</span></span>
          </div>
          <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
            Start your <br/>
            <span className="gradient-text">Journey today.</span>
          </h1>
          <p className="text-xl text-white/40 font-medium leading-relaxed max-w-md">
            Join thousands of students getting hired by top tech giants through AI-driven readiness tracking.
          </p>
        </div>

        <div className="glass-card p-10 lg:p-12 relative overflow-hidden border-white/5 premium-shadow">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">Create Account</h2>
            <p className="text-white/40 text-sm font-medium mt-1">Get started with your placement journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@aditya.edu" className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Role</label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none appearance-none">
                  <option value="student" className="bg-slate-900">Student</option>
                  <option value="placement" className="bg-slate-900">Placement Officer</option>
                </select>
              </div>
            </div>

            {role === 'student' && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Roll Number</label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                    <input type="text" required value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="23CSE001" className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Branch</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-indigo-400" />
                    <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none appearance-none">
                      <option value="CSE" className="bg-slate-900">CSE</option>
                      <option value="IT" className="bg-slate-900">IT</option>
                      <option value="ECE" className="bg-slate-900">ECE</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group mt-4">
              {loading ? 'Creating Account...' : 'Get Started'}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/40 font-medium">
            Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
