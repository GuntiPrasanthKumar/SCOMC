import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Users, Heart, Search, AlertTriangle, UtensilsCrossed,
  Eye, UserCheck, Package, Clock, MapPin, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { eventStats, chartData } from '../../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' } })
};

const statCards = [
  { label: 'Total Visitors', value: eventStats.totalVisitors.toLocaleString(), icon: Users, color: 'bg-sky-50 text-sky-600', ring: 'ring-sky-100' },
  { label: 'Active Volunteers', value: eventStats.activeVolunteers, icon: UserCheck, color: 'bg-emerald-50 text-emerald-600', ring: 'ring-emerald-100' },
  { label: 'Medical Requests', value: eventStats.medicalRequests, icon: Heart, color: 'bg-rose-50 text-rose-600', ring: 'ring-rose-100' },
  { label: 'Lost & Found', value: eventStats.lostAndFound, icon: Search, color: 'bg-amber-50 text-amber-600', ring: 'ring-amber-100' },
  { label: 'Emergencies', value: eventStats.emergencies, icon: AlertTriangle, color: 'bg-red-50 text-red-600', ring: 'ring-red-100' },
  { label: 'Food Distributed', value: eventStats.foodDistributed.toLocaleString(), icon: UtensilsCrossed, color: 'bg-violet-50 text-violet-600', ring: 'ring-violet-100' },
];

const timelineEvents = [
  { time: '06:00 AM', title: 'Gates Opened', desc: 'Main ghat gates opened for devotees', status: 'completed' },
  { time: '08:30 AM', title: 'Morning Puja', desc: 'Special morning prayers commenced', status: 'completed' },
  { time: '10:00 AM', title: 'VIP Arrival', desc: 'State minister visit and inspection', status: 'completed' },
  { time: '12:00 PM', title: 'Mass Feeding', desc: 'Annadanam serving started at food court', status: 'active' },
  { time: '02:00 PM', title: 'Cultural Program', desc: 'Folk dance performances at main stage', status: 'upcoming' },
  { time: '06:00 PM', title: 'Evening Aarti', desc: 'Grand river aarti ceremony', status: 'upcoming' },
  { time: '09:00 PM', title: 'Gates Close', desc: 'Systematic crowd dispersal begins', status: 'upcoming' },
];

const quickActions = [
  { label: 'View Crowds', icon: Eye, color: 'from-sky-500 to-cyan-500' },
  { label: 'Manage Volunteers', icon: UserCheck, color: 'from-emerald-500 to-teal-500' },
  { label: 'Lost & Found', icon: Package, color: 'from-amber-500 to-orange-500' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-sky-600">{payload[0].value.toLocaleString()} visitors</p>
    </div>
  );
};

export default function EventDashboard() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 p-6 md:p-8 text-white shadow-lg"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pushkaralu Event Management</h1>
            <p className="text-white/80 mt-1 text-sm md:text-base">Real-time monitoring & coordination dashboard — Day 5 of 12</p>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ring-1 ${card.ring}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color} mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Timeline */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Crowd Density Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Crowd Density Timeline</h2>
              <p className="text-sm text-slate-500">Visitor footfall throughout the day</p>
            </div>
            <span className="text-xs font-medium bg-sky-50 text-sky-600 px-3 py-1.5 rounded-full">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.crowdDensity} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#crowdGradient)" dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Event Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Event Timeline</h2>
          <div className="space-y-0">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ring-4 ${
                    ev.status === 'completed' ? 'bg-emerald-500 ring-emerald-100' :
                    ev.status === 'active' ? 'bg-sky-500 ring-sky-100 animate-pulse' :
                    'bg-slate-300 ring-slate-100'
                  }`} />
                  {i < timelineEvents.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 ${ev.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-200'}`} />
                  )}
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">{ev.time}</span>
                  </div>
                  <p className={`text-sm font-semibold mt-0.5 ${ev.status === 'active' ? 'text-sky-700' : 'text-slate-200'}`}>{ev.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden bg-gradient-to-r ${action.color} text-white rounded-xl p-5 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{action.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-80" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
