import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GraduationCap, ArrowRight, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'placement') {
        navigate('/placement');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Hero/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-indigo-950 to-black relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Aditya AI-Resume</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-[1.1]">
            Fast-track your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">career growth</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
            Join the elite placement platform exclusive to Aditya University. Get ATS-optimized resumes, real-time GitHub skill verification, and dynamic domain rankings.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm font-medium shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> AI Resume Scoring
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm font-medium shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> GitHub Verification
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-gray-500 font-medium">Sign in to access your dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl text-sm text-center font-medium shadow-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 hover:bg-gray-100 focus:bg-white transition-colors duration-200 outline-none"
                    placeholder="you@aditya.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 hover:bg-gray-100 focus:bg-white transition-colors duration-200 outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-indigo-500/30"
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-10 p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs text-center text-gray-500 font-medium">
            <p className="mb-1 text-gray-700">Demo Credentials:</p>
            <p>student@example.com / 12345678</p>
            <p>placement@example.com / 12345678</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
