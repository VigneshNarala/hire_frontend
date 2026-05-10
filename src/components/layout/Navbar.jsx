import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Award, User, LogOut, Briefcase } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NavLink = ({ to, icon: Icon, children, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
      active ? 'bg-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
    }`}
  >
    <Icon className="h-4 w-4" />
    {children}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">SMART<span className="text-indigo-500">HIRE</span></span>
            </Link>
            
            <div className="hidden md:flex gap-2">
              <NavLink to="/student" icon={LayoutDashboard} active={location.pathname === '/student'}>Dashboard</NavLink>
              <NavLink to="/certifications" icon={Award} active={location.pathname === '/certifications'}>Badges</NavLink>
              <NavLink to="/profile" icon={User} active={location.pathname === '/profile'}>Profile</NavLink>
              {user?.role === 'placement' && (
                <NavLink to="/placement" icon={GraduationCap} active={location.pathname === '/placement'}>TPO Hub</NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-xs font-bold text-white/80">{user?.name || 'Guest User'}</span>
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{user?.role || 'Observer'}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 transition-all"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
