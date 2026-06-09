import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert, User, Phone, MapPin, Calendar, Clock,
  ArrowLeft, CheckCircle2, AlertTriangle, Send, Share2, ClipboardList
} from 'lucide-react';
import { incidents } from '../../data/mockData';

const priorityColors = {
  Critical: 'badge-danger',
  High: 'badge-warning',
  Medium: 'badge-info',
  Low: 'badge-neutral',
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

export default function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(() => incidents.find((inc) => inc.id === id) || incidents[0]);
  const [notes, setNotes] = useState('');
  const [timeline, setTimeline] = useState([
    { status: 'Submitted', date: incident.createdAt, note: 'Incident logged by citizen through the SCOMC portal' },
    { status: 'Assigned', date: incident.createdAt, note: `Routed to ${incident.department} department` },
    { status: 'In Progress', date: '2024-01-28 11:30', note: `Assigned to team: ${incident.assignedTeam || 'Unassigned'}` },
  ]);

  const handleResolve = () => {
    const updatedTimeline = [
      ...timeline,
      { status: 'Resolved', date: new Date().toLocaleString(), note: notes || 'Incident resolved successfully.' }
    ];
    setTimeline(updatedTimeline);
    setIncident(prev => ({ ...prev, status: 'Resolved' }));
    setNotes('');
  };

  const handleEscalate = () => {
    const updatedTimeline = [
      ...timeline,
      { status: 'Escalated', date: new Date().toLocaleString(), note: 'Incident priority escalated to Critical. ServiceNow sync triggered.' }
    ];
    setTimeline(updatedTimeline);
    setIncident(prev => ({ ...prev, priority: 'Critical' }));
  };

  return (
    <div className="page-enter space-y-6">
      {/* Back button and Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate('/incidents')}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={16} /> Back to Incident Center
        </button>

        <div className="flex gap-2">
          <button onClick={handleEscalate} disabled={incident.priority === 'Critical'} className="btn btn-danger btn-sm disabled:opacity-50">
            <AlertTriangle size={16} /> Escalate Incident
          </button>
          {incident.status !== 'Resolved' && (
            <button onClick={handleResolve} className="btn btn-success btn-sm">
              <CheckCircle2 size={16} /> Resolve Incident
            </button>
          )}
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Summary Card */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-static p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="font-mono text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded">
                  {incident.id}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{incident.title}</h2>
              </div>
              <div className="flex gap-2">
                <span className={`badge ${priorityColors[incident.priority]}`}>{incident.priority}</span>
                <span className={`badge ${statusBadge(incident.status)}`}>{incident.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-500">Description</h3>
                <p className="text-white mt-1">{incident.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-300 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500">Location</h4>
                    <p className="text-sm font-medium text-white">{incident.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-300 mt-0.5">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500">Reported Date</h4>
                    <p className="text-sm font-medium text-white">{incident.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-300 mt-0.5">
                    <ClipboardList size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500">Department Assigned</h4>
                    <p className="text-sm font-medium text-white">{incident.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-300 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500">SLA Status</h4>
                    <p className="text-sm font-medium text-white">{incident.sla || 'Within SLA'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Log / Notes Form */}
          {incident.status !== 'Resolved' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-static p-6"
            >
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Send size={18} className="text-primary-500" />
                Add Resolution Action Note
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="textarea w-100 mb-4"
                placeholder="Type resolution actions, notes, or details about the work order here..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleResolve}
                  className="btn btn-primary btn-sm"
                >
                  Post Action & Resolve
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Panel for Citizen details and Timeline */}
        <div className="space-y-6">
          {/* Citizen Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <User size={18} className="text-primary-500" />
              Citizen Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-50 text-slate-500">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="text-sm font-semibold text-white">{incident.citizenName || 'Public Citizen'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-50 text-slate-500">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="text-sm font-semibold text-white">{incident.citizenPhone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-50 text-slate-500">
                  <Share2 size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Assigned Response Team</p>
                  <p className="text-sm font-semibold text-white">{incident.assignedTeam || 'Automated System'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Timeline Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-primary-500" />
              Activity Log Timeline
            </h3>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative pl-8 flex flex-col gap-1">
                  <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${step.status === 'Resolved' ? 'bg-success-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]' : 'bg-primary-500'}`} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{step.status}</span>
                    <span className="text-xs text-slate-400">{step.date.split(' ')[1] || step.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">{step.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
