import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Users as UsersIcon, Building2, Cog, FileText, Plus, Download,
  Mail, MessageSquare, Brain, RefreshCw, Calendar, Shield, UserCircle, CheckCircle2
} from 'lucide-react';
import { users, departments } from '../../data/mockData';

const tabs = [
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'config', label: 'Configuration', icon: Cog },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const roleBadge = {
  Administrator: 'bg-purple-100 text-purple-700',
  'Department Head': 'bg-sky-100 text-sky-700',
  Citizen: 'bg-slate-100 text-slate-300',
  'Municipal Staff': 'bg-emerald-100 text-emerald-700',
};

const statusBadge = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-slate-100 text-slate-500',
  Suspended: 'bg-red-100 text-red-700',
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [configState, setConfigState] = useState({
    emailNotifications: true,
    smsAlerts: true,
    aiAutoClassification: false,
    serviceNowSync: true,
  });

  const toggleConfig = (key) => {
    setConfigState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const configOptions = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send email alerts for critical incidents and SLA breaches', icon: Mail },
    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Send SMS notifications to field staff and citizens', icon: MessageSquare },
    { key: 'aiAutoClassification', label: 'AI Auto-Classification', desc: 'Automatically classify and route complaints using AI', icon: Brain },
    { key: 'serviceNowSync', label: 'ServiceNow Sync', desc: 'Bidirectional sync with ServiceNow ITSM platform', icon: RefreshCw },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-sky-600" />
          Admin Panel
        </h1>
        <p className="text-sm text-slate-500 mt-1">System administration, user management and configuration</p>
      </motion.div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-white">System Users</h2>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-shadow">
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">ID</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Role</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Department</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Last Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{user.id}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="font-medium text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{user.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadge[user.role] || 'bg-slate-100 text-slate-300'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-300 text-sm">{user.department}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge[user.status] || 'bg-slate-100 text-slate-500'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{user.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <motion.div
            key="departments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {departments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">{dept.name}</h3>
                    <p className="text-xs text-slate-500">{dept.head}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center mb-4">
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-lg font-bold text-white">{dept.staff}</p>
                    <p className="text-[10px] text-slate-500">Staff</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-lg font-bold text-amber-600">{dept.activeIncidents}</p>
                    <p className="text-[10px] text-slate-500">Active Incidents</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Performance</span>
                    <span className={`font-bold ${dept.performance >= 90 ? 'text-emerald-600' : dept.performance >= 80 ? 'text-sky-600' : 'text-amber-600'}`}>
                      {dept.performance}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        dept.performance >= 90 ? 'bg-emerald-500' : dept.performance >= 80 ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Configuration Tab */}
        {activeTab === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6"
          >
            <h2 className="text-base font-semibold text-white mb-1">System Settings</h2>
            <p className="text-xs text-slate-500 mb-6">Configure system behavior and integrations</p>

            <div className="space-y-1">
              {configOptions.map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <motion.div
                    key={opt.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-sky-50 transition">
                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-sky-600 transition" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{opt.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleConfig(opt.key)}
                      className="relative"
                    >
                      <div className={`w-11 h-6 rounded-full transition-colors ${configState[opt.key] ? 'bg-sky-500' : 'bg-slate-200'}`} />
                      <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${configState[opt.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Date Range */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6">
              <h2 className="text-base font-semibold text-white mb-4">Report Parameters</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      defaultValue="2024-01-01"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      defaultValue="2024-01-31"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6">
              <h2 className="text-base font-semibold text-white mb-1">Export Reports</h2>
              <p className="text-xs text-slate-500 mb-5">Generate and download comprehensive reports</p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { format: 'PDF', desc: 'Full formatted report with charts and analysis', color: 'from-red-500 to-rose-500', icon: FileText },
                  { format: 'Excel', desc: 'Spreadsheet with detailed data tables and pivot views', color: 'from-emerald-500 to-green-500', icon: FileText },
                  { format: 'CSV', desc: 'Raw data export for custom processing and integration', color: 'from-sky-500 to-blue-500', icon: FileText },
                ].map((exp, i) => {
                  const Icon = exp.icon;
                  return (
                    <motion.button
                      key={exp.format}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden rounded-xl p-5 text-left border border-slate-200 hover:border-slate-300 hover:shadow-md transition group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${exp.color} flex items-center justify-center text-white mb-3`}>
                        <Download className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold text-white mb-1">Export as {exp.format}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{exp.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
