import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Calendar, Wrench, QrCode,
  CheckCircle2, AlertTriangle, Clock, Send,
  Activity, FileText, DollarSign, Tag
} from 'lucide-react';
import { assets } from '../../data/mockData';

const maintenanceHistory = [
  { id: 1, date: '2024-01-15', type: 'Routine Inspection', description: 'Quarterly structural inspection completed. Minor wear detected.', status: 'Completed', crew: 'Team Alpha' },
  { id: 2, date: '2023-12-01', type: 'Preventive Maintenance', description: 'Scheduled maintenance performed. Surface treatment applied.', status: 'Completed', crew: 'Team Beta' },
  { id: 3, date: '2023-09-10', type: 'Emergency Repair', description: 'Emergency repair after monsoon damage. Drainage cleared and surface patched.', status: 'Completed', crew: 'Emergency Unit' },
  { id: 4, date: '2023-06-20', type: 'Routine Inspection', description: 'Bi-annual inspection. All parameters within acceptable range.', status: 'Completed', crew: 'Team Alpha' },
];

const conditionColor = (c) => {
  switch (c) {
    case 'Good': return { bg: 'bg-success-50', text: 'text-success-700', border: 'border-success-200', icon: <CheckCircle2 size={18} className="text-success-600" /> };
    case 'Fair': return { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200', icon: <AlertTriangle size={18} className="text-accent-600" /> };
    case 'Needs Maintenance': return { bg: 'bg-danger-50', text: 'text-danger-700', border: 'border-danger-200', icon: <AlertTriangle size={18} className="text-danger-600" /> };
    case 'Critical': return { bg: 'bg-danger-100', text: 'text-danger-800', border: 'border-danger-300', icon: <AlertTriangle size={18} className="text-danger-700" /> };
    default: return { bg: 'bg-slate-50', text: 'text-slate-200', border: 'border-slate-200', icon: null };
  }
};

const QRCodeSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="#0f172a">
    {/* QR Code pattern - simplified decorative pattern */}
    <rect x="5" y="5" width="25" height="25" rx="2" />
    <rect x="70" y="5" width="25" height="25" rx="2" />
    <rect x="5" y="70" width="25" height="25" rx="2" />
    <rect x="10" y="10" width="15" height="15" rx="1" fill="white" />
    <rect x="75" y="10" width="15" height="15" rx="1" fill="white" />
    <rect x="10" y="75" width="15" height="15" rx="1" fill="white" />
    <rect x="14" y="14" width="7" height="7" rx="0.5" />
    <rect x="79" y="14" width="7" height="7" rx="0.5" />
    <rect x="14" y="79" width="7" height="7" rx="0.5" />
    <rect x="35" y="5" width="5" height="5" />
    <rect x="45" y="5" width="5" height="5" />
    <rect x="55" y="5" width="5" height="5" />
    <rect x="35" y="15" width="5" height="5" />
    <rect x="50" y="15" width="5" height="5" />
    <rect x="60" y="15" width="5" height="5" />
    <rect x="35" y="25" width="5" height="5" />
    <rect x="45" y="25" width="5" height="5" />
    <rect x="5" y="35" width="5" height="5" />
    <rect x="15" y="35" width="5" height="5" />
    <rect x="25" y="35" width="5" height="5" />
    <rect x="35" y="35" width="5" height="5" />
    <rect x="45" y="35" width="5" height="5" />
    <rect x="55" y="35" width="5" height="5" />
    <rect x="65" y="35" width="5" height="5" />
    <rect x="75" y="35" width="5" height="5" />
    <rect x="85" y="35" width="5" height="5" />
    <rect x="5" y="45" width="5" height="5" />
    <rect x="20" y="45" width="5" height="5" />
    <rect x="35" y="45" width="5" height="5" />
    <rect x="50" y="45" width="5" height="5" />
    <rect x="65" y="45" width="5" height="5" />
    <rect x="80" y="45" width="5" height="5" />
    <rect x="5" y="55" width="5" height="5" />
    <rect x="15" y="55" width="5" height="5" />
    <rect x="30" y="55" width="5" height="5" />
    <rect x="45" y="55" width="5" height="5" />
    <rect x="55" y="55" width="5" height="5" />
    <rect x="70" y="55" width="5" height="5" />
    <rect x="85" y="55" width="5" height="5" />
    <rect x="5" y="65" width="5" height="5" />
    <rect x="25" y="65" width="5" height="5" />
    <rect x="35" y="65" width="5" height="5" />
    <rect x="50" y="65" width="5" height="5" />
    <rect x="60" y="65" width="5" height="5" />
    <rect x="75" y="65" width="5" height="5" />
    <rect x="90" y="65" width="5" height="5" />
    <rect x="35" y="75" width="5" height="5" />
    <rect x="50" y="75" width="5" height="5" />
    <rect x="60" y="75" width="5" height="5" />
    <rect x="70" y="70" width="25" height="25" rx="1" />
    <rect x="75" y="75" width="15" height="15" rx="0.5" fill="white" />
    <rect x="79" y="79" width="7" height="7" rx="0.5" />
  </svg>
);

export default function AssetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = assets.find((a) => a.id === id);
  const [form, setForm] = useState({ description: '', priority: 'Medium', cost: '' });

  if (!asset) {
    return (
      <div className="page-enter flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-danger-50 flex items-center justify-center">
          <AlertTriangle size={32} className="text-danger-500" />
        </div>
        <p className="text-lg font-semibold text-slate-200">Asset not found</p>
        <button className="btn btn-primary" onClick={() => navigate('/assets')}>
          <ArrowLeft size={16} />
          Back to Assets
        </button>
      </div>
    );
  }

  const cond = conditionColor(asset.condition);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Maintenance request submitted for ${asset.id}!\nDescription: ${form.description}\nPriority: ${form.priority}\nEstimated Cost: ₹${form.cost}`);
    setForm({ description: '', priority: 'Medium', cost: '' });
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/assets')}
          className="btn btn-ghost p-2"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{asset.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono text-sm text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{asset.id}</span>
            <span className={`badge ${cond.bg} ${cond.text} border ${cond.border} flex items-center gap-1`}>
              {cond.icon}
              {asset.condition}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-static p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={20} className="text-primary-500" />
            Asset Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Asset ID', value: asset.id, icon: <Tag size={16} className="text-primary-500" /> },
              { label: 'Type', value: asset.type, icon: <Activity size={16} className="text-primary-500" /> },
              { label: 'Category', value: asset.category, icon: <Tag size={16} className="text-accent-500" /> },
              { label: 'Installation Date', value: asset.installDate, icon: <Calendar size={16} className="text-primary-500" /> },
              { label: 'Location', value: asset.location, icon: <MapPin size={16} className="text-danger-500" /> },
              { label: 'Current Condition', value: asset.condition, icon: cond.icon },
              { label: 'Last Maintenance', value: asset.lastMaintenance, icon: <Wrench size={16} className="text-accent-500" /> },
              ...(asset.length ? [{ label: 'Length', value: asset.length, icon: <Activity size={16} className="text-slate-400" /> }] : []),
              ...(asset.watts ? [{ label: 'Wattage', value: asset.watts, icon: <Activity size={16} className="text-slate-400" /> }] : []),
              ...(asset.area ? [{ label: 'Area', value: asset.area, icon: <Activity size={16} className="text-slate-400" /> }] : []),
              ...(asset.diameter ? [{ label: 'Diameter', value: asset.diameter, icon: <Activity size={16} className="text-slate-400" /> }] : []),
              ...(asset.capacity ? [{ label: 'Capacity', value: asset.capacity, icon: <Activity size={16} className="text-slate-400" /> }] : []),
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * idx }}
                className="p-3 bg-slate-50 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{item.label}</p>
                </div>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <QrCode size={20} className="text-primary-500" />
            Asset QR Code
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 p-3 bg-white border-2 border-slate-200 rounded-2xl">
              <QRCodeSVG />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-200">{asset.id}</p>
              <p className="text-xs text-slate-400 mt-1">Scan for field access</p>
            </div>
            <button className="btn btn-secondary btn-sm w-full">
              Download QR Code
            </button>
          </div>
        </motion.div>
      </div>

      {/* Maintenance History & Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Clock size={20} className="text-primary-500" />
            Maintenance History
          </h2>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-300 via-primary-200 to-slate-200" />
            <div className="space-y-6">
              {maintenanceHistory.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex gap-4"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      entry.type === 'Emergency Repair'
                        ? 'bg-danger-100 text-danger-600'
                        : 'bg-primary-100 text-primary-600'
                    }`}>
                      {entry.type === 'Emergency Repair' ? <AlertTriangle size={14} /> : <Wrench size={14} />}
                    </div>
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white">{entry.type}</p>
                      <span className="badge badge-success text-[11px]">{entry.status}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{entry.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={12} />{entry.date}</span>
                      <span>• {entry.crew}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Request Maintenance Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Wrench size={20} className="text-accent-500" />
            Request Maintenance
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Issue Description</label>
              <textarea
                className="textarea"
                placeholder="Describe the maintenance issue in detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Priority</label>
              <select
                className="select"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Estimated Cost (₹)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  className="input pl-9"
                  placeholder="Enter estimated cost"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <Send size={16} />
              Submit Maintenance Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
