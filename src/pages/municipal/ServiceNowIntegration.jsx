import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, RefreshCw, Layers, Database, ShieldCheck,
  User, CheckCircle, ArrowRight, ClipboardList, Activity
} from 'lucide-react';
import { serviceNowTickets } from '../../data/mockData';

const statusColors = {
  Resolved: 'badge-success',
  'In Progress': 'badge-info',
  'Work in Progress': 'badge-info',
  Assigned: 'badge-warning',
};

const priorityColors = {
  Critical: 'badge-danger',
  High: 'badge-warning',
  Medium: 'badge-info',
  Low: 'badge-neutral',
};

export default function ServiceNowIntegration() {
  const [tickets, setTickets] = useState(serviceNowTickets);
  const [logs, setLogs] = useState([
    { timestamp: '16:45:12', type: 'SUCCESS', message: 'Synced complaint CMP-2024-003 with SNW-INC-001.' },
    { timestamp: '16:40:05', type: 'INFO', message: 'Triggered SLA warning for SNW-INC-001 (Critical water leakage).' },
    { timestamp: '15:20:10', type: 'SUCCESS', message: 'Created Work Order SNW-WO-002 from Incident INC-002.' },
    { timestamp: '14:30:15', type: 'SUCCESS', message: 'Work Order SNW-WO-001 created successfully and assigned to group.' },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLogs(prev => [
        { timestamp: new Date().toLocaleTimeString(), type: 'SUCCESS', message: 'Manual refresh: All Incident state objects synced with ServiceNow REST gateway.' },
        ...prev
      ]);
    }, 1200);
  };

  const steps = [
    { title: 'Citizen Complaint', desc: 'Complaint registered in SCOMC portal', icon: User, color: 'text-primary-600 bg-primary-50 border border-primary-100' },
    { title: 'AI Classification', desc: 'Auto categories & routing tags assigned', icon: Layers, color: 'text-purple-600 bg-purple-50 border border-purple-100' },
    { title: 'ServiceNow Sync', desc: 'Incident created instantly via REST API', icon: Database, color: 'text-teal-600 bg-teal-50 border border-teal-100' },
    { title: 'Work Order Dispatch', desc: 'ServiceNow creates detailed work orders', icon: ClipboardList, color: 'text-amber-600 bg-amber-50 border border-amber-100' },
    { title: 'Resolution & Sync', desc: 'Completed state reported back to SCOMC', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border border-emerald-100' },
  ];

  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl gradient-primary text-white">
              <Settings size={24} />
            </div>
            ServiceNow Integration Gateway
          </h1>
          <p className="text-slate-300 font-semibold mt-1">Monitor automated workflow mappings and real-time ServiceNow API state updates</p>
        </div>

        <button
          onClick={handleSync}
          disabled={isRefreshing}
          className="btn btn-primary btn-sm flex items-center gap-1.5 font-bold"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Syncing...' : 'Sync Gateway'}
        </button>
      </div>

      {/* Integration Status Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-static p-5 flex items-center gap-3 bg-white border border-slate-100">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Gateway API Status</span>
            <p className="text-sm font-extrabold text-white mt-0.5">Operational</p>
          </div>
        </div>
        <div className="card-static p-5 flex items-center gap-3 bg-white border border-slate-100">
          <div className="p-3 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
            <Activity size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Daily Synced Tickets</span>
            <p className="text-sm font-extrabold text-white mt-0.5">142 tickets</p>
          </div>
        </div>
        <div className="card-static p-5 flex items-center gap-3 bg-white border border-slate-100">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg Latency</span>
            <p className="text-sm font-extrabold text-white mt-0.5">320ms</p>
          </div>
        </div>
        <div className="card-static p-5 flex items-center gap-3 bg-white border border-slate-100">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Database size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">ServiceNow Build</span>
            <p className="text-sm font-extrabold text-white mt-0.5">Utah / V2 REST</p>
          </div>
        </div>
      </div>

      {/* Automated Pipeline Flow Visualizer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-static p-6 bg-white border border-slate-100"
      >
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Layers size={18} className="text-primary-500" />
          SCOMC ↔ ServiceNow Automated Workflow Lifecycle
        </h3>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-4 flex-1 w-full lg:w-auto">
                <div className="card-static p-4 flex items-center gap-3 flex-1 w-full text-left bg-slate-50/50 border border-slate-100">
                  <div className={`p-2.5 rounded-xl ${st.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white leading-tight">{st.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">{st.desc}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight size={20} className="text-slate-400 hidden lg:block shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Grid of tickets and logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ServiceNow Sync Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-static p-6 lg:col-span-2 bg-white border border-slate-100"
        >
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <ClipboardList size={18} className="text-primary-500" />
            ServiceNow Sync Status Log
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>SN Ticket ID</th>
                  <th>Source Map</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Group</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded border border-primary-100">
                        {t.id}
                      </span>
                    </td>
                    <td className="text-xs font-mono text-slate-300 font-semibold">{t.sourceComplaint || t.sourceIncident}</td>
                    <td className="text-xs text-slate-200 font-semibold">{t.category || t.type}</td>
                    <td>
                      <span className={`badge ${priorityColors[t.priority] || 'badge-neutral'}`}>{t.priority}</span>
                    </td>
                    <td>
                      <span className={`badge ${statusColors[t.status] || 'badge-neutral'}`}>{t.status}</span>
                    </td>
                    <td className="text-xs text-slate-200 font-semibold">{t.assignedGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Live Logs Feed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-static p-6 bg-white border border-slate-100"
        >
          <h3 className="text-base font-bold text-white border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Activity size={18} className="text-primary-500" />
            Gateway Live Logs
          </h3>
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {logs.map((log, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{log.timestamp}</span>
                  <span className={`badge text-[9px] py-0.5 px-1.5 ${log.type === 'SUCCESS' ? 'badge-success' : 'badge-info'}`}>{log.type}</span>
                </div>
                <p className="text-xs font-semibold text-slate-200 leading-normal">{log.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
