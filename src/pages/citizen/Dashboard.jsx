import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Bell,
  PlusCircle,
  Search,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { complaints, chartData, notifications } from '../../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const statCards = [
  {
    label: 'Active Complaints',
    value: 3,
    icon: FileText,
    color: 'primary',
    bgGradient: 'bg-primary-500/5',
    iconBg: 'bg-primary-500/20 border border-primary-500/20',
    iconColor: 'text-primary-400',
    valueColor: 'text-white',
    trend: '+1 this week',
    trendUp: true,
  },
  {
    label: 'Resolved',
    value: 7,
    icon: CheckCircle2,
    color: 'success',
    bgGradient: 'bg-success-500/5',
    iconBg: 'bg-success-500/20 border border-success-500/20',
    iconColor: 'text-success-400',
    valueColor: 'text-white',
    trend: '+2 this month',
    trendUp: true,
  },
  {
    label: 'Emergency Requests',
    value: 1,
    icon: AlertTriangle,
    color: 'danger',
    bgGradient: 'bg-rose-500/5',
    iconBg: 'bg-rose-500/20 border border-rose-500/20',
    iconColor: 'text-rose-400',
    valueColor: 'text-white',
    trend: 'Active now',
    trendUp: false,
  },
  {
    label: 'Notifications',
    value: 4,
    icon: Bell,
    color: 'accent',
    bgGradient: 'bg-amber-500/5',
    iconBg: 'bg-amber-500/20 border border-amber-500/20',
    iconColor: 'text-amber-400',
    valueColor: 'text-white',
    trend: '2 unread',
    trendUp: false,
  },
];

const getStatusBadge = (status) => {
  const map = {
    Submitted: 'badge-info',
    Assigned: 'badge-purple',
    'In Progress': 'badge-warning',
    Resolved: 'badge-success',
  };
  return map[status] || 'badge-neutral';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a24]/90 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 px-4 py-3">
        <p className="text-sm font-semibold text-slate-300 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CitizenDashboard() {
  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-grad-premium">Rajesh Kumar</span>
            </h1>
            <p className="text-slate-400 mt-1 text-sm lg:text-base font-light">
              Here's a summary of your municipal activity and complaints.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <Clock className="w-4 h-4 text-primary-400" />
            <span>Last login: Today, 10:00 AM</span>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={cardVariants}
              className={`premium-card p-5 ${card.bgGradient} relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`${card.iconBg} p-3 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                  {card.trendUp && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {card.trend}
                </span>
              </div>
              <h3 className={`text-3xl font-black ${card.valueColor} mb-1 relative z-10`}>
                {card.value}
              </h3>
              <p className="text-sm text-slate-400 font-medium relative z-10 tracking-wide uppercase">{card.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="premium-card p-6 mb-8"
      >
        <h2 className="text-lg font-bold text-white mb-4 tracking-wide">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/report"
            className="btn btn-primary btn-lg flex-1 justify-center"
          >
            <PlusCircle className="w-5 h-5" />
            Report New Issue
          </Link>
          <Link
            to="/complaints"
            className="btn btn-secondary btn-lg flex-1 justify-center"
          >
            <Search className="w-5 h-5" />
            Track Complaints
          </Link>
          <Link
            to="/emergency"
            className="btn btn-danger btn-lg flex-1 justify-center"
          >
            <Phone className="w-5 h-5" />
            Emergency Assistance
          </Link>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Complaints Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 premium-card overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="text-lg font-bold text-white tracking-wide">Recent Complaints</h2>
            <Link
              to="/complaints"
              className="text-sm font-bold text-primary-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-5">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Complaint ID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map((complaint, index) => (
                    <motion.tr
                      key={complaint.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                    >
                      <td>
                        <span className="font-bold text-primary-400">
                          {complaint.id}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-200">{complaint.type}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="text-slate-400 text-sm font-medium">{complaint.createdAt}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Complaint Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="premium-card p-5"
        >
          <h2 className="text-lg font-bold text-white mb-1 tracking-wide">
            Complaint Trend
          </h2>
          <p className="text-sm text-slate-400 mb-5 font-light">Last 7 months</p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData.complaintTrends}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="complaints"
                  name="Complaints"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fill="url(#colorComplaints)"
                  dot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0a0a0c', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#34d399"
                  strokeWidth={3}
                  fill="url(#colorResolved)"
                  dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#34d399', stroke: '#0a0a0c', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-400" />
              <span className="text-xs text-slate-400 font-medium">Complaints</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400 font-medium">Resolved</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notifications Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 premium-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-wide">
            <Bell className="w-5 h-5 text-amber-400" />
            Recent Notifications
          </h2>
          <span className="badge badge-warning">
            {notifications.filter((n) => !n.read).length} unread
          </span>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.08 }}
              className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                !notif.read
                  ? 'bg-primary-500/10 border border-primary-500/20'
                  : 'bg-white/5 border border-transparent'
              }`}
            >
              <div
                className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  notif.type === 'alert'
                    ? 'bg-rose-500'
                    : notif.type === 'warning'
                    ? 'bg-amber-500'
                    : notif.type === 'success'
                    ? 'bg-emerald-500'
                    : 'bg-primary-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200">{notif.message}</p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{notif.time}</p>
              </div>
              {!notif.read && (
               <span className="text-[10px] font-black text-primary-400 flex-shrink-0 mt-0.5 tracking-widest">
                  NEW
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
