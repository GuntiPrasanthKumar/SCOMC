import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserCheck, Coffee, Moon, Search, Phone, Clock, MapPin, Filter, Tag, ChevronDown
} from 'lucide-react';
import { volunteers } from '../../data/mockData';

const dutyColors = {
  Active: { bg: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  Break: { bg: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  'Off-duty': { bg: 'bg-slate-100 text-slate-300', dot: 'bg-slate-400' },
};

const statCards = [
  { label: 'Total Volunteers', value: volunteers.length, icon: Users, color: 'bg-sky-50 text-sky-600 ring-sky-100' },
  { label: 'Active', value: volunteers.filter(v => v.duty === 'Active').length, icon: UserCheck, color: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { label: 'On Break', value: volunteers.filter(v => v.duty === 'Break').length, icon: Coffee, color: 'bg-amber-50 text-amber-600 ring-amber-100' },
  { label: 'Off Duty', value: volunteers.filter(v => v.duty === 'Off-duty').length, icon: Moon, color: 'bg-slate-50 text-slate-300 ring-slate-200' },
];

export default function VolunteerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const zones = useMemo(() => [...new Set(volunteers.map(v => v.zone))], []);
  const statuses = ['Active', 'Break', 'Off-duty'];

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(v => {
      const matchSearch = !searchQuery || v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.zone.toLowerCase().includes(searchQuery.toLowerCase());
      const matchZone = !zoneFilter || v.zone === zoneFilter;
      const matchStatus = !statusFilter || v.duty === statusFilter;
      return matchSearch && matchZone && matchStatus;
    });
  }, [searchQuery, zoneFilter, statusFilter]);

  // Zone assignment summary
  const zoneAssignments = useMemo(() => {
    const map = {};
    volunteers.forEach(v => {
      if (!map[v.zone]) map[v.zone] = { total: 0, active: 0 };
      map[v.zone].total += 1;
      if (v.duty === 'Active') map[v.zone].active += 1;
    });
    return Object.entries(map).map(([zone, data]) => ({ zone, ...data }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-sky-600" />
          Volunteer Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">Track, assign and manage event volunteers</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-xl p-4 ring-1 shadow-sm ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5" />
                <span className="text-2xl font-bold">{card.value}</span>
              </div>
              <p className="text-xs font-medium mt-1">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-4 flex flex-col md:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="appearance-none pl-9 pr-8 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition cursor-pointer"
          >
            <option value="">All Zones</option>
            {zones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-9 pr-8 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition cursor-pointer"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </motion.div>

      {/* Volunteer Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredVolunteers.map((vol, i) => (
            <motion.div
              key={vol.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {vol.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{vol.name}</h3>
                    <p className="text-xs text-slate-500">{vol.id}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${dutyColors[vol.duty].bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dutyColors[vol.duty].dot}`} />
                  {vol.duty}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vol.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vol.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vol.shift} Shift</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {vol.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1 text-[11px] font-medium bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">
                    <Tag className="w-2.5 h-2.5" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredVolunteers.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No volunteers match your filters</p>
          </div>
        )}
      </div>

      {/* Zone Assignment Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6"
      >
        <h2 className="text-base font-semibold text-white mb-4">Zone Assignment Dashboard</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {zoneAssignments.map((za) => (
            <div key={za.zone} className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4 text-center hover:ring-sky-300 transition-all">
              <div className="w-10 h-10 mx-auto rounded-full bg-sky-100 flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-sky-600" />
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-1">{za.zone.split(' - ')[1] || za.zone}</p>
              <p className="text-xs text-slate-500">{za.zone.split(' - ')[0]}</p>
              <div className="mt-3 flex items-center justify-center gap-4 text-xs">
                <div>
                  <p className="text-lg font-bold text-white">{za.total}</p>
                  <p className="text-slate-400">Assigned</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <p className="text-lg font-bold text-emerald-600">{za.active}</p>
                  <p className="text-slate-400">Active</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
