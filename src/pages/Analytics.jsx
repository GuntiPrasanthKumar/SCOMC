import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Clock, FileText, SmilePlus, CheckCircle2, Timer, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { chartData } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } })
};

const kpis = [
  { label: 'Citizen Satisfaction', value: '87%', icon: SmilePlus, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', trend: '+2.3%', up: true },
  { label: 'SLA Compliance', value: '92%', icon: CheckCircle2, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20', trend: '+1.1%', up: true },
  { label: 'Avg Resolution Time', value: '2.5 days', icon: Timer, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', trend: '-0.3 days', up: true },
  { label: 'Total Complaints', value: '1,240', icon: AlertCircle, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', trend: '+15', up: false },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a24]/90 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 px-4 py-3">
      <p className="text-xs font-semibold text-slate-400 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: p.color }}>
          <span className="font-semibold text-slate-200">{p.name}:</span> {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-400" />
          Analytics & Reports
        </h1>
        <p className="text-sm text-slate-400 mt-1">Comprehensive performance insights and trend analysis</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`premium-card p-5 border ${kpi.color} relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${kpi.up ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl font-black text-white relative z-10">{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold relative z-10">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid - 2 columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Complaint Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="premium-card p-6"
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-white tracking-wide">Complaint Trends</h2>
            <p className="text-xs text-slate-400 mt-0.5">Complaints submitted vs resolved over months</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData.complaintTrends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '12px', color: '#cbd5e1' }} />
              <Line type="monotone" dataKey="complaints" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#0a0a0c' }} name="Complaints" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0a0a0c' }} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Resolution Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="premium-card p-6"
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-white tracking-wide">Resolution Time by Category</h2>
            <p className="text-xs text-slate-400 mt-0.5">Average days to resolve complaints</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData.resolutionTime} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" d" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgDays" name="Avg Days" radius={[6, 6, 0, 0]} fill="#0ea5e9" barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="premium-card p-6"
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-white tracking-wide">Department Performance</h2>
            <p className="text-xs text-slate-400 mt-0.5">Performance score vs target by department</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData.departmentPerformance} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
              <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '12px', color: '#cbd5e1' }} />
              <Bar dataKey="score" name="Score" radius={[6, 6, 0, 0]} fill="#10b981" barSize={28} />
              <Bar dataKey="target" name="Target" radius={[6, 6, 0, 0]} fill="#334155" barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Asset Health Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="premium-card p-6"
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-white tracking-wide">Asset Health Distribution</h2>
            <p className="text-xs text-slate-400 mt-0.5">Overall condition of city assets</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData.assetHealth}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.assetHealth.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Event Analytics - Crowd Density */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="premium-card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Event Analytics — Crowd Density</h2>
            <p className="text-xs text-slate-400 mt-0.5">Pushkaralu visitor footfall tracking</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-sky-500/20 text-sky-400 px-3 py-1.5 rounded-full">Today</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData.crowdDensity} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="crowdAnalyticsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="count" name="Visitors" stroke="#f59e0b" strokeWidth={3} fill="url(#crowdAnalyticsGrad)" dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#0a0a0c' }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
