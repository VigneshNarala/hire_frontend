import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Briefcase, ArrowRight, Mail, Lock, Github, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, githubLogin } = useAuth();
  const navigate = useNavigate();

  const handleAuthResult = (user) => {
    if (user.role === 'placement') {
      navigate('/placement');
    } else {
      navigate('/student');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      handleAuthResult(user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await githubLogin();
      handleAuthResult(user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
              <Briefcase className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">SMART<span className="text-indigo-500">HIRE</span></span>
          </div>
          
          <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
            Elevate your <br/>
            <span className="gradient-text">Placement Game.</span>
          </h1>
          
          <p className="text-xl text-white/40 font-medium leading-relaxed max-w-md">
            AI-powered resume optimization, real-time coding profile verification, and domain-specific student rankings.
          </p>

          <div className="flex gap-4">
            <div className="px-5 py-3 glass-card flex items-center gap-2 text-xs font-bold text-white/60">
              <Sparkles className="h-4 w-4 text-amber-400" /> ATS Optimization
            </div>
            <div className="px-5 py-3 glass-card flex items-center gap-2 text-xs font-bold text-white/60">
              <Github className="h-4 w-4 text-white" /> GitHub Sync
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-card p-10 lg:p-12 relative overflow-hidden border-white/5 premium-shadow">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">Welcome back</h2>
            <p className="text-white/40 text-sm font-medium mt-1">Sign in to your Smart Hire account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Authenticating...' : 'Sign In Now'}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]"><span className="bg-slate-950 px-4 text-white/20">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
            >
              <Github className="h-5 w-5" /> GitHub
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/40 font-medium">
            New to the platform? <Link to="/register" className="text-indigo-400 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
