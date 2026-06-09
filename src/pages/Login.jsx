import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Activity,
  Users,
  Shield,
  UserCog,
  CheckCircle2,
  Brain,
  BarChart3,
  Building2,
  Loader2,
  Sparkles,
  Hexagon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = [
  { key: 'citizen', label: 'Citizen', icon: Users, redirect: '/dashboard' },
  { key: 'staff', label: 'Command Staff', icon: Shield, redirect: '/incidents' },
  { key: 'admin', label: 'Administrator', icon: UserCog, redirect: '/admin' },
];

const demoCredentials = {
  citizen: { email: 'citizen@scomc.gov.in', password: 'demo' },
  staff: { email: 'staff@scomc.gov.in', password: 'demo' },
  admin: { email: 'admin@scomc.gov.in', password: 'demo' },
};

const featuresHighlight = [
  { icon: CheckCircle2, text: 'Auto incident dispatch grids' },
  { icon: Brain, text: 'AI-Powered civic asset audits' },
  { icon: BarChart3, text: 'Real-time telemetry reports' },
  { icon: Building2, text: 'ServiceNow ITSM REST bridge' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeRole, setActiveRole] = useState('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentRole = roles.find((r) => r.key === activeRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password, activeRole);
      // Directly redirect based on active tab path mapping
      const path = activeRole === 'citizen' ? '/dashboard' : activeRole === 'staff' ? '/incidents' : '/admin';
      navigate(path);
    } catch {
      setError('Invalid credentials. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    const creds = demoCredentials[activeRole];
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex bg-[#050505] text-slate-200 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-primary-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-accent-900/10 blur-[130px] pointer-events-none" />

      {/* LEFT PANEL: Sliding feature card panel (lg screens) */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#0a0a0c] border-r border-white/5 p-12 flex-col justify-between z-10 shadow-2xl">
        {/* Glow dots */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary-500/10 blur-[100px] pointer-events-none" />
        
        {/* Top Header Logo */}
        <Link to="/" className="flex items-center gap-3 z-10 shrink-0 group w-max">
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
            <Hexagon size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">SCOMC</span>
        </Link>

        {/* Feature List */}
        <div className="space-y-8 z-10 max-w-md relative">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-bold uppercase tracking-widest text-primary-400 backdrop-blur-md">
              <Sparkles size={12} className="text-primary-400" /> Secured Command Bridge
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Real-Time <br />
              <span className="text-grad-glow">Command Matrix.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Authenticate to securely access municipal databases, coordinate dispatch systems, and manage live field operations.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            {featuresHighlight.map((f, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 group-hover:text-primary-400 transition-all text-slate-400">
                  <f.icon size={14} />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 mt-12 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Node Server Active • v2.4.1
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <Link to="/" className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform">
              <Hexagon size={20} strokeWidth={2.5} />
            </Link>
            <span className="text-xl font-black text-white tracking-tight">SCOMC</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">Access Gateway</h1>
            <p className="text-slate-400 text-xs sm:text-sm font-light">Enter your credentials to initiate secure session</p>
          </div>

          {/* Premium Role Slider Tabs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex relative mb-8 shadow-2xl">
            {roles.map((r) => {
              const active = activeRole === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    setActiveRole(r.key);
                    setError('');
                  }}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center gap-2 z-10 cursor-pointer ${
                    active ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="loginTabIndicator"
                      className="absolute inset-0 bg-primary-600/20 border border-primary-500/30 rounded-xl shadow-lg z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <r.icon size={14} className={active ? 'text-primary-400' : ''} />
                  <span className="hidden sm:inline">{r.label}</span>
                  <span className="sm:hidden">{r.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder={demoCredentials[activeRole].email}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Password
                </label>
                <button type="button" className="text-[10px] text-primary-400 font-bold hover:underline">
                  Reset Key?
                </button>
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all text-sm font-medium tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Config options */}
            <div className="flex items-center justify-between text-xs pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-primary-500 checked:border-primary-500 transition-colors cursor-pointer"
                  />
                  <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                </div>
                <span className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">Keep session active</span>
              </label>
            </div>

            {/* Error alerts */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-danger-500/10 border border-danger-500/20 text-danger-400 text-xs font-semibold rounded-xl text-center">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action dispatch button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-interactive w-full py-4 bg-white text-black hover:bg-slate-200 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-xl shadow-lg disabled:opacity-75 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Connect to Node <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofiller widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Demo Sandbox</p>
              <p className="text-xs text-slate-300 font-medium mt-1">
                {demoCredentials[activeRole].email}
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
            >
              Autofill
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
