import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

import {
  Users,
  Brain,
  Building2,
  Calendar,
  Settings,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Activity,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const features = [
  {
    icon: Users,
    title: 'Citizen Portal',
    description: 'A beautiful dashboard for submitting complaints, tracking resolution progress, and dispatching emergency assistance.',
    gradient: 'from-sky-400 to-blue-600',
    border: '#38bdf8',
    delay: 0.1,
  },
  {
    icon: Brain,
    title: 'AI Classification Engine',
    description: 'Auto-classify civic issues from photographs instantly. Auto-generates routing parameters and ServiceNow tickets.',
    gradient: 'from-fuchsia-400 to-purple-600',
    border: '#d946ef',
    delay: 0.2,
  },
  {
    icon: Building2,
    title: 'Asset Lifecycle Manager',
    description: 'Comprehensive digital inventory of roads, streetlights, pipelines, and parks with detailed health indicators.',
    gradient: 'from-amber-400 to-orange-600',
    border: '#fbbf24',
    delay: 0.3,
  },
  {
    icon: Calendar,
    title: 'Pushkaralu Event System',
    description: 'Real-time volunteer grids, crowd density analytics, heatmaps, and digital matching systems for missing persons.',
    gradient: 'from-emerald-400 to-teal-600',
    border: '#34d399',
    delay: 0.4,
  },
  {
    icon: Settings,
    title: 'ServiceNow Integration',
    description: 'Continuous REST synchronization. Auto-generates work orders and triggers real-time citizen SMS updates.',
    gradient: 'from-slate-400 to-slate-600',
    border: '#94a3b8',
    delay: 0.5,
  },
  {
    icon: BarChart3,
    title: 'Digital Twin Command',
    description: 'Interactive full-screen spatial maps layering active incidents, crowd monitors, flood danger, and patrol teams.',
    gradient: 'from-rose-400 to-red-600',
    border: '#fb7185',
    delay: 0.6,
  },
];

const stats = [
  { label: 'Complaints Resolved', value: 15420, suffix: '', gradient: 'from-sky-400 to-blue-500' },
  { label: 'Active Incidents', value: 342, suffix: '', gradient: 'from-rose-400 to-red-500' },
  { label: 'Assets Tracked', value: 12500, suffix: '', gradient: 'from-amber-400 to-orange-500' },
  { label: 'SLA Response Rate', value: 98.5, suffix: '%', gradient: 'from-emerald-400 to-teal-500' },
];

/* ──────────────────────────────────────────────
   3D CANVAS COMPONENTS
   ────────────────────────────────────────────── */

/* ──────────────────────────────────────────────
   IMAGE BACKGROUND COMPONENT
   ────────────────────────────────────────────── */

function ImageBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only apply parallax on desktop
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Parallax Container */}
      <motion.div
        animate={{
          x: mousePosition.x * -10,
          y: mousePosition.y * -10,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute inset-[-2%] w-[104%] h-[104%]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url('/images/hero-bg-2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </motion.div>
      
      {/* Dark navy overlay (45% opacity) */}
      <div className="absolute inset-0 bg-[#000000]/45" />
      
      {/* Additional gradient to blend seamlessly into the black features section below */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] opacity-95" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────── */

function StatCircleCard({ label, value, suffix, gradient, idx }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const finalTarget = Number(value);

  useEffect(() => {
    if (!isInView || isNaN(finalTarget)) return;
    
    let start = 0;
    const isFloat = !Number.isInteger(finalTarget);
    const increment = finalTarget > 0 ? (finalTarget / 60) : 1;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalTarget) {
        setCount(finalTarget);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [finalTarget, isInView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="premium-card p-6 md:p-8 text-center relative overflow-hidden group w-full"
    >
      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <p className="text-3xl lg:text-4xl font-extrabold text-white leading-none tracking-tight">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] md:text-xs text-slate-400 font-semibold mt-3 uppercase tracking-[0.1em] md:tracking-[0.2em]">{label}</p>
    </motion.div>
  );
}

/* ---- Navbar ---- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'premium-glass-strong border-b border-white/10' : 'bg-transparent'}`}>
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between relative">
        <Link to="/" className="flex items-center group z-10">
          <img 
            src="/images/smartgov-logo.png" 
            alt="SmartGov Logo" 
            className="h-[38px] md:h-[44px] lg:h-[52px] w-auto object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform duration-300 mix-blend-screen rounded-xl overflow-hidden"
          />
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 z-10">
          {['Features', 'Command Center'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 z-10">
          <Link to="/login" className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors">
            Log In
          </Link>
          <Link to="/login" className="btn-interactive btn-premium-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 rounded-full">
            Portal Access <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden premium-glass-strong border-t border-white/10 px-6 py-8 space-y-6 absolute w-full"
          >
            {['Features', 'Command Center'].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold text-slate-300 uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link to="/login" className="btn-interactive btn-premium-secondary py-3 text-center text-sm rounded-xl">
                Log In
              </Link>
              <Link to="/login" className="btn-interactive btn-premium-primary py-3 text-center text-sm rounded-xl">
                Portal Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ──────────────────────────────────────────────
   MAIN LANDING COMPONENT
   ────────────────────────────────────────────── */
export default function Landing() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 relative overflow-x-hidden selection:bg-primary-500/30">
      <ImageBackground />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full min-h-screen flex items-center pt-24 pb-12 z-10">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-6 lg:gap-8 mt-10 lg:mt-0 max-w-[600px] mx-auto md:mx-0"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-400"
            >
              <Sparkles size={14} className="text-primary-400 animate-pulse" />
              <span>Next-Gen Urban Command Core</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              Transforming <br className="hidden sm:block" /> Cities With <br className="hidden sm:block" />
              <span className="text-grad-glow">Digital Twins</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-light">
              The Spatial Command Center integration layer. Auto-routing complaints, managing infrastructure, and dispatching safety grids instantly.
            </p>

            <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 pt-4">
              <Link to="/login" className="btn-interactive btn-premium-primary w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-full">
                Enter Nexus <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FLOATING METRICS ===== */}
      <section className="py-16 md:py-20 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, idx) => (
              <StatCircleCard key={s.label} {...s} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="py-24 md:py-32 relative z-10 bg-gradient-to-b from-transparent to-black/80">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-[10px] md:text-xs font-bold text-primary-500 uppercase tracking-[0.3em] block">Platform Architecture</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Spatial Integration Grid
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed px-4">
              Every node is linked dynamically to ensure real-time command, dispatch, and accountability across the municipal mesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: f.delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className="premium-card p-6 md:p-8 group relative flex flex-col h-full"
                >
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundImage: `linear-gradient(90deg, ${f.border}, transparent)` }}
                  />
                  
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light flex-grow">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COMMAND BLOCK BANNER ===== */}
      <section id="command-center" className="py-20 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="premium-glass-strong rounded-[30px] md:rounded-[40px] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden border border-white/10 mx-auto w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-transparent pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight relative z-10">
              Enter The <span className="text-grad-glow">Command Core</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-light relative z-10">
              Access the digital command core to orchestrate volunteer safety operations, monitor assets in 3D, and synchronize global tickets.
            </p>
            <Link
              to="/login"
              className="btn-interactive inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform relative z-10"
            >
              Access Gateway
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 bg-black py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/images/smartgov-logo.png" 
              alt="SmartGov Logo" 
              className="h-[24px] w-auto object-contain mix-blend-screen grayscale brightness-200"
            />
          </div>
          <p className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Smart City Operations Command Center
          </p>
        </div>
      </footer>
    </div>
  );
}
