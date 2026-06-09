import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Road, Lightbulb, Trees, Droplets, Filter,
  Activity, CheckCircle2, AlertTriangle, XCircle,
  Search, BarChart3, Package
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { assets, chartData } from '../../data/mockData';

const categoryIcons = {
  Roads: Road,
  'Street Lights': Lightbulb,
  Parks: Trees,
  'Water Pipelines': Droplets,
  'Drainage Systems': Filter,
};

const categoryColors = {
  Roads: 'from-slate-600 to-slate-800',
  'Street Lights': 'from-amber-400 to-amber-600',
  Parks: 'from-emerald-400 to-emerald-600',
  'Water Pipelines': 'from-blue-400 to-blue-600',
  'Drainage Systems': 'from-purple-400 to-purple-600',
};

const conditionBadge = (condition) => {
  switch (condition) {
    case 'Good': return 'badge-success';
    case 'Fair': return 'badge-warning';
    case 'Needs Maintenance': return 'badge-danger';
    case 'Critical': return 'badge-danger';
    default: return 'badge-neutral';
  }
};

const conditionIcon = (condition) => {
  switch (condition) {
    case 'Good': return <CheckCircle2 size={14} className="text-success-600" />;
    case 'Fair': return <AlertTriangle size={14} className="text-accent-600" />;
    case 'Needs Maintenance': return <AlertTriangle size={14} className="text-danger-500" />;
    case 'Critical': return <XCircle size={14} className="text-danger-600" />;
    default: return null;
  }
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AssetDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Roads', 'Street Lights', 'Parks', 'Water Pipelines', 'Drainage Systems'];

  const categoryCounts = {};
  assets.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  const filteredAssets = selectedCategory === 'All'
    ? assets
    : assets.filter((a) => a.category === selectedCategory);

  const conditionCounts = { Good: 0, Fair: 0, 'Needs Maintenance': 0, Critical: 0 };
  assets.forEach((a) => { conditionCounts[a.condition] = (conditionCounts[a.condition] || 0) + 1; });

  const getCategoryHealthSummary = (cat) => {
    const catAssets = assets.filter((a) => a.category === cat);
    const good = catAssets.filter((a) => a.condition === 'Good').length;
    const ratio = catAssets.length > 0 ? good / catAssets.length : 0;
    if (ratio >= 0.8) return { label: 'Healthy', color: 'text-success-600' };
    if (ratio >= 0.5) return { label: 'Fair', color: 'text-accent-600' };
    return { label: 'Attention', color: 'text-danger-500' };
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl gradient-primary text-white">
              <Package size={24} />
            </div>
            Asset Management Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Monitor and manage all municipal infrastructure assets</p>
        </div>
      </div>

      {/* Asset Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.keys(categoryIcons).map((cat, idx) => {
          const IconComp = categoryIcons[cat];
          const health = getCategoryHealthSummary(cat);
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              onClick={() => setSelectedCategory(cat)}
              className={`card p-4 cursor-pointer ${selectedCategory === cat ? 'ring-2 ring-primary-400' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[cat]} flex items-center justify-center mb-3`}>
                <IconComp size={20} className="text-white" />
              </div>
              <p className="text-sm font-medium text-slate-300">{cat}</p>
              <p className="text-2xl font-bold text-white">{categoryCounts[cat] || 0}</p>
              <div className="flex items-center gap-1 mt-1">
                {conditionIcon(health.label === 'Healthy' ? 'Good' : health.label === 'Fair' ? 'Fair' : 'Needs Maintenance')}
                <span className={`text-xs font-medium ${health.color}`}>{health.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Assets', value: assets.length, color: 'primary', icon: Package },
          { label: 'Healthy', value: conditionCounts['Good'], color: 'success', icon: CheckCircle2 },
          { label: 'Fair', value: conditionCounts['Fair'], color: 'accent', icon: AlertTriangle },
          { label: 'Needs Maintenance', value: conditionCounts['Needs Maintenance'], color: 'danger', icon: AlertTriangle },
          { label: 'Critical', value: conditionCounts['Critical'], color: 'danger', icon: XCircle },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * idx }}
            className={`card-static stat-card ${stat.color} p-4`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon size={20} className={`text-${stat.color}-500`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-500" />
            Asset Health Distribution
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData.assetHealth}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {chartData.assetHealth.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: '#64748b' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Asset Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-static p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={20} className="text-primary-500" />
              Asset Inventory
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Condition</th>
                  <th>Location</th>
                  <th>Last Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset, idx) => (
                  <motion.tr
                    key={asset.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx }}
                    onClick={() => navigate(`/assets/${asset.id}`)}
                    className="cursor-pointer"
                  >
                    <td>
                      <span className="font-mono text-sm text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {asset.id}
                      </span>
                    </td>
                    <td className="font-medium text-white">{asset.name}</td>
                    <td className="text-sm text-slate-300">{asset.type}</td>
                    <td>
                      <span className={`badge ${conditionBadge(asset.condition)} flex items-center gap-1 w-fit`}>
                        {conditionIcon(asset.condition)}
                        {asset.condition}
                      </span>
                    </td>
                    <td className="text-sm text-slate-300">{asset.location}</td>
                    <td className="text-sm text-slate-500">{asset.lastMaintenance}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
