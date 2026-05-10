import React, { useEffect, useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Plus, Link as LinkIcon } from 'lucide-react';
import { studentApi } from '../api/studentApi';

const CertificationPortal = () => {
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

  const handleLinkCredly = async () => {
    const url = prompt("Enter your Credly Public Profile URL:");
    if (!url) return;
    try {
      await studentApi.syncCredly(url);
      fetchProfile();
      alert('Credly profile linked and badges verified!');
    } catch (err) {
      alert('Failed to link: ' + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center text-white/50">Loading Certification Portal...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            Certification Portal <ShieldCheck className="text-emerald-400 h-6 w-6" />
          </h1>
          <p className="text-white/50">Verified badges from Credly and other top industry platforms.</p>
        </div>
        <button onClick={handleLinkCredly} className="glass-button flex items-center gap-2">
          <LinkIcon className="h-4 w-4" /> Link Credly Profile
        </button>
      </div>

      {!profile?.credlyUrl ? (
        <div className="glass-card p-12 text-center flex flex-col items-center max-w-2xl mx-auto mt-12">
          <div className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <Award className="h-10 w-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">No Verified Certificates Yet</h2>
          <p className="text-white/40 mb-8">Link your Credly profile to automatically sync and verify your professional certifications. Verified badges boost your readiness score by up to 20%.</p>
          <button onClick={handleLinkCredly} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl shadow-indigo-500/20">
            Connect My Credly
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Badges */}
          {[
            { id: 1, title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Oct 2025', image: 'https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941b2/image.png' },
            { id: 2, title: 'Meta Front-End Developer', issuer: 'Meta', date: 'Dec 2025', image: 'https://images.credly.com/images/46889241-11e0-47e2-8924-4299b8417937/image.png' },
            { id: 3, title: 'Google Data Analytics', issuer: 'Google', date: 'Jan 2026', image: 'https://images.credly.com/images/569c73e0-63e5-47d5-89f4-279c09d57a9f/image.png' }
          ].map(badge => (
            <div key={badge.id} className="glass-card p-6 group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <img src={badge.image} alt={badge.title} className="h-16 w-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h3 className="font-bold text-white text-sm line-clamp-1">{badge.title}</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{badge.issuer}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-white/30">Issued {badge.date}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED
                </span>
              </div>
              <button className="w-full mt-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs hover:bg-white/10 transition flex items-center justify-center gap-2">
                <ExternalLink className="h-3 w-3" /> View Credly Badge
              </button>
            </div>
          ))}
          
          <button className="glass-card p-6 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-white/20 hover:text-white/40 hover:border-white/20 transition-all">
            <Plus className="h-8 w-8" />
            <span className="text-sm font-bold">Add Another Provider</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationPortal;
