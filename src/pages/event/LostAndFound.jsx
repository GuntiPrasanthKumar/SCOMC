import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, MapPin, Phone, Clock, X, Plus, Link2, AlertCircle, CheckCircle2, Eye
} from 'lucide-react';
import { lostPersons, foundPersons } from '../../data/mockData';

const statusColors = {
  Searching: 'bg-red-100 text-red-700',
  Matched: 'bg-amber-100 text-amber-700',
  Reunited: 'bg-emerald-100 text-emerald-700',
};

const statusIcons = {
  Searching: AlertCircle,
  Matched: Eye,
  Reunited: CheckCircle2,
};

export default function LostAndFound() {
  const [activeTab, setActiveTab] = useState('lost');
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { id: 'lost', label: 'Lost Persons', count: lostPersons.length },
    { id: 'found', label: 'Found Persons', count: foundPersons.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-sky-600" />
            Lost & Found Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">Track and reunite missing persons during events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-4 h-4" />
          Register New
        </motion.button>
      </motion.div>

      {/* Matching Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 ring-1 ring-amber-200 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
          <Link2 className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-800">Potential Match Found!</p>
          <p className="text-xs text-amber-700 mt-0.5">
            <span className="font-medium">LP-002</span> (Savitri Bai) matched with{' '}
            <span className="font-medium">FP-001</span> (Unknown Elderly Woman) — Both descriptions and age match.
          </p>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition">
          Review Match
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {activeTab === 'lost' ? (
          <motion.div
            key="lost"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {lostPersons.map((person, i) => {
              const StatusIcon = statusIcons[person.status];
              return (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{person.name}</h3>
                        <p className="text-xs text-slate-500">{person.id} · Age {person.age} · {person.gender}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[person.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {person.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{person.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Last seen: {person.lastSeen}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reported by: {person.reportedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{person.reportedAt}</span>
                    </div>
                  </div>

                  {person.matchedWith && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full ring-1 ring-amber-200">
                        <Link2 className="w-3 h-3" />
                        Matched with {person.matchedWith}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="found"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {foundPersons.map((person, i) => {
              const StatusIcon = statusIcons[person.status];
              return (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{person.name}</h3>
                        <p className="text-xs text-slate-500">{person.id} · Age {person.age} · {person.gender}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[person.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {person.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{person.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Found at: {person.foundAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Found by: {person.foundBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{person.reportedAt}</span>
                    </div>
                  </div>

                  {person.matchedWith && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full ring-1 ring-emerald-200">
                        <Link2 className="w-3 h-3" />
                        Matched with {person.matchedWith}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 ring-1 ring-slate-100"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Register Person</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                    <input type="text" placeholder="Enter name" className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Age</label>
                    <input type="number" placeholder="Age" className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Gender</label>
                    <select className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Contact Number</label>
                    <input type="tel" placeholder="+91 ..." className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                  <textarea rows={3} placeholder="Physical description, clothing, any identifying marks..." className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Last Seen / Found At</label>
                  <input type="text" placeholder="Zone or location" className="w-full px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    Register
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
