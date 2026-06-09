import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, Clock, TrendingUp,
  Search, Filter, BarChart3, ExternalLink
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { incidents, departments } from '../../data/mockData';

const priorityColors = {
  Critical: { badge: 'badge-danger', bar: '#f43f5e' },
  High: { badge: 'badge-warning', bar: '#f59e0b' },
  Medium: { badge: 'badge-info', bar: '#0ea5e9' },
  Low: { badge: 'badge-neutral', bar: '#94a3b8' },
};

const statusBadge = (status) => {
  switch (status) {
    case 'Open': return 'badge-danger';
    case 'In Progress': return 'badge-info';
    case 'Resolved': return 'badge-success';
    case 'Closed': return 'badge-neutral';
    default: return 'badge-neutral';
  }
};

const slaBadge = (sla) => {
  switch (sla) {
    case 'Breached': return 'badge-danger';
    case 'At Risk': return 'badge-warning';
    case 'Within SLA': return 'badge-success';
    default: return 'badge-neutral';
  }
};

export default function IncidentCenter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: 'All',
    priority: 'All',
    status: 'All',
    search: '',
  });

  const filteredIncidents = incidents.filter((inc) => {
    if (filters.department !== 'All' && inc.department !== filters.department) return false;
    if (filters.priority !== 'All' && inc.priority !== filters.priority) return false;
    if (filters.status !== 'All' && inc.status !== filters.status) return false;
    if (filters.search && !inc.title.toLowerCase().includes(filters.search.toLowerCase()) && !inc.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const openCount = incidents.filter((i) => i.status === 'Open').length;
  const criticalCount = incidents.filter((i) => i.priority === 'Critical').length;
  const slaBreached = incidents.filter((i) => i.sla === 'Breached').length;
  const resolvedIncidents = incidents.filter((i) => i.status === 'Resolved');
  const avgResolution = resolvedIncidents.length > 0 ? 2.5 : 0;

  const priorityData = [
    { name: 'Critical', count: incidents.filter((i) => i.priority === 'Critical').length, color: '#f43f5e' },
    { name: 'High', count: incidents.filter((i) => i.priority === 'High').length, color: '#f59e0b' },
    { name: 'Medium', count: incidents.filter((i) => i.priority === 'Medium').length, color: '#0ea5e9' },
    { name: 'Low', count: incidents.filter((i) => i.priority === 'Low').length, color: '#94a3b8' },
  ];

  const statCards = [
    { label: 'Open Incidents', value: openCount, color: 'primary', icon: AlertTriangle, iconColor: 'text-primary-500' },
    { label: 'Critical', value: criticalCount, color: 'danger', icon: ShieldAlert, iconColor: 'text-danger-500' },
    { label: 'SLA Violations', value: slaBreached, color: 'accent', icon: Clock, iconColor: 'text-accent-500' },
    { label: 'Avg Resolution', value: `${avgResolution} days`, color: 'success', icon: TrendingUp, iconColor: 'text-success-500' },
  ];

  const uniqueDepartments = ['All', ...new Set(incidents.map((i) => i.department))];
  const uniquePriorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const uniqueStatuses = ['All', 'Open', 'In Progress', 'Resolved'];

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl gradient-danger text-white">
            <ShieldAlert size={24} />
          </div>
          Incident Management Center
        </h1>
        <p className="text-slate-500 mt-1">Track, manage, and resolve municipal incidents in real-time</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className={`card-static stat-card ${stat.color} p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <stat.icon size={24} className={stat.iconColor} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-static p-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Filter size={16} />
            Filters:
          </div>
          <select
            className="select py-2 text-sm w-auto min-w-[160px]"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          >
            {uniqueDepartments.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
          </select>
          <select
            className="select py-2 text-sm w-auto min-w-[130px]"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            {uniquePriorities.map((p) => <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
          </select>
          <select
            className="select py-2 text-sm w-auto min-w-[130px]"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            {uniqueStatuses.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="input py-2 text-sm pl-9"
              placeholder="Search incidents..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-static p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-danger-500" />
            Active Incidents
            <span className="badge badge-neutral ml-2">{filteredIncidents.length}</span>
          </h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>SLA</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((inc, idx) => (
                  <motion.tr
                    key={inc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx }}
                    onClick={() => navigate(`/incidents/${inc.id}`)}
                    className="cursor-pointer group"
                  >
                    <td>
                      <span className="font-mono text-sm text-primary-600 bg-primary-50 px-2 py-0.5 rounded group-hover:bg-primary-100 transition-colors">
                        {inc.id}
                      </span>
                    </td>
                    <td className="font-medium text-white max-w-[200px] truncate">{inc.title}</td>
                    <td className="text-sm text-slate-300">{inc.category}</td>
                    <td>
                      <span className={`badge ${priorityColors[inc.priority]?.badge || 'badge-neutral'}`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadge(inc.status)}`}>{inc.status}</span>
                    </td>
                    <td className="text-sm text-slate-300 max-w-[120px] truncate">{inc.department}</td>
                    <td>
                      <span className={`badge ${slaBadge(inc.sla)}`}>{inc.sla}</span>
                    </td>
                    <td className="text-sm text-slate-500 whitespace-nowrap">{inc.createdAt.split(' ')[0]}</td>
                  </motion.tr>
                ))}
                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-slate-400 py-8">
                      No incidents match the current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Priority Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-500" />
            Priority Distribution
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={priorityData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} width={60} />
              <Tooltip
                contentStyle={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(value) => [`${value} incidents`, 'Count']}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Quick Legend */}
          <div className="mt-4 space-y-2">
            {priorityData.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-slate-300">{p.name}</span>
                </div>
                <span className="font-semibold text-white">{p.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
