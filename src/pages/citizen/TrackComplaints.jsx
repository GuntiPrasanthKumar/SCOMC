import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Building2,
  CircleAlert,
  Trash2,
  Droplets,
  Lightbulb,
  TreePine,
  TrafficCone,
  CheckCircle2,
  Loader2,
  Circle,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { complaints } from '../../data/mockData';

const typeIcons = {
  Pothole: CircleAlert,
  Garbage: Trash2,
  'Water Leakage': Droplets,
  'Street Light Failure': Lightbulb,
  'Fallen Tree': TreePine,
  'Traffic Issue': TrafficCone,
};

const typeColors = {
  Pothole: 'text-orange-600 bg-orange-50',
  Garbage: 'text-emerald-600 bg-emerald-50',
  'Water Leakage': 'text-blue-600 bg-blue-50',
  'Street Light Failure': 'text-amber-600 bg-amber-50',
  'Fallen Tree': 'text-green-700 bg-green-50',
  'Traffic Issue': 'text-rose-600 bg-rose-50',
};

const getStatusBadge = (status) => {
  const map = {
    Submitted: 'badge-info',
    Assigned: 'badge-purple',
    'In Progress': 'badge-warning',
    Resolved: 'badge-success',
  };
  return map[status] || 'badge-neutral';
};

const getTimelineForStatus = (complaint) => {
  const base = [
    {
      step: 'Submitted',
      date: complaint.createdAt,
      time: '10:30 AM',
      done: true,
    },
  ];

  if (['Assigned', 'In Progress', 'Resolved'].includes(complaint.status)) {
    base.push({
      step: 'Assigned',
      date: complaint.createdAt,
      time: '02:15 PM',
      done: true,
      assignedTo: complaint.assignedTo,
    });
  } else {
    base.push({ step: 'Assigned', date: '-', time: '-', done: false });
  }

  if (['In Progress', 'Resolved'].includes(complaint.status)) {
    const d = new Date(complaint.createdAt);
    d.setDate(d.getDate() + 1);
    base.push({
      step: 'In Progress',
      date: d.toISOString().split('T')[0],
      time: '09:00 AM',
      done: true,
      inProgress: complaint.status === 'In Progress',
    });
  } else {
    base.push({ step: 'In Progress', date: '-', time: '-', done: false });
  }

  if (complaint.status === 'Resolved') {
    base.push({
      step: 'Resolved',
      date: complaint.resolvedAt,
      time: '04:45 PM',
      done: true,
    });
  } else {
    base.push({ step: 'Resolved', date: '-', time: '-', done: false });
  }

  return base;
};

const getExpectedCompletion = (complaint) => {
  if (complaint.status === 'Resolved') return null;
  const created = new Date(complaint.createdAt);
  const daysMap = {
    Critical: 2,
    High: 4,
    Medium: 7,
    Low: 14,
  };
  const days = daysMap[complaint.priority] || 7;
  created.setDate(created.getDate() + days);
  return created.toISOString().split('T')[0];
};

export default function TrackComplaints() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filteredComplaints = complaints.filter((c) => {
    const matchSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const statuses = ['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'];
  const types = ['All', ...new Set(complaints.map((c) => c.type))];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Track Complaints
        </h1>
        <p className="text-slate-500 mt-1">
          Monitor the status and progress of your submitted complaints.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-static p-5 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by ID, type, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ minWidth: '160px' }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              className="select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ minWidth: '180px' }}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Types' : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-400 mt-3">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </p>
      </motion.div>

      {/* Complaints List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredComplaints.map((complaint, index) => {
            const Icon = typeIcons[complaint.type] || CircleAlert;
            const colorClasses = typeColors[complaint.type] || 'text-slate-300 bg-slate-50';
            const isExpanded = expandedId === complaint.id;
            const timeline = getTimelineForStatus(complaint);
            const expectedCompletion = getExpectedCompletion(complaint);

            return (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-static overflow-hidden"
              >
                {/* Complaint Card Header */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : complaint.id)
                  }
                  className="w-full p-5 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Icon & Type */}
                    <div className="flex items-center gap-3 lg:w-[220px]">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-primary-700 text-sm">
                          {complaint.id}
                        </span>
                        <p className="text-sm font-medium text-slate-200">
                          {complaint.type}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">
                        {complaint.description}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {complaint.location}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {complaint.department}
                        </span>
                      </div>
                    </div>

                    {/* Status & Date */}
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className={`badge ${getStatusBadge(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <span className="text-sm text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {complaint.createdAt}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Expanded Timeline */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-2 border-t border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-200 mb-5 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary-500" />
                          Status Timeline
                        </h3>

                        {/* Timeline */}
                        <div className="relative ml-5">
                          {/* Vertical line */}
                          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />

                          <div className="space-y-6">
                            {timeline.map((step, idx) => (
                              <div key={step.step} className="relative flex items-start gap-4">
                                {/* Dot */}
                                <div className="relative z-10 flex-shrink-0">
                                  {step.done && !step.inProgress ? (
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-200">
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                  ) : step.inProgress ? (
                                    <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-200">
                                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                      <Circle className="w-3 h-3 text-slate-400" />
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-0">
                                  <p
                                    className={`text-sm font-semibold ${
                                      step.done
                                        ? 'text-white'
                                        : 'text-slate-400'
                                    }`}
                                  >
                                    {step.step}
                                    {step.inProgress && (
                                      <span className="ml-2 badge badge-info text-[10px]">
                                        Current
                                      </span>
                                    )}
                                  </p>
                                  {step.done && (
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {step.date} at {step.time}
                                    </p>
                                  )}
                                  {step.assignedTo && (
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      Assigned to: <span className="font-medium text-slate-200">{step.assignedTo}</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expected Completion */}
                        {expectedCompletion && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 ml-5 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3"
                          >
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-slate-200">
                                Expected Completion
                              </p>
                              <p className="text-xs text-slate-500">
                                Based on {complaint.priority} priority SLA:{' '}
                                <span className="font-semibold text-amber-700">
                                  {expectedCompletion}
                                </span>
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Resolved info */}
                        {complaint.status === 'Resolved' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 ml-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-emerald-800">
                                Issue Resolved
                              </p>
                              <p className="text-xs text-emerald-600">
                                Resolved on {complaint.resolvedAt} by {complaint.assignedTo}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredComplaints.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-static p-12 text-center"
          >
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-1">
              No complaints found
            </h3>
            <p className="text-sm text-slate-400">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
