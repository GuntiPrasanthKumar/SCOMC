import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Users, Heart, Trash2, Flame, Ambulance,
  BrainCircuit, Send, Navigation, CheckCircle2, Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { resources } from '../../data/mockData';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const resourceIcons = {
  Police: Shield,
  Volunteers: Users,
  'Medical Staff': Heart,
  'Sanitation Workers': Trash2,
  'Fire Brigade': Flame,
  Ambulances: Ambulance,
};

const iconColors = {
  Police: 'text-primary-400 bg-primary-500/20',
  Volunteers: 'text-purple-400 bg-purple-500/20',
  'Medical Staff': 'text-danger-400 bg-danger-500/20',
  'Sanitation Workers': 'text-emerald-400 bg-emerald-500/20',
  'Fire Brigade': 'text-amber-400 bg-amber-500/20',
  Ambulances: 'text-sky-400 bg-sky-500/20',
};

export default function ResourceDeployment() {
  const [items, setItems] = useState(resources);
  const [successMsg, setSuccessMsg] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleSmartDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setItems(prev => prev.map(res => {
        if (res.type === 'Police') {
          return { ...res, available: res.available - 25, deployed: res.deployed + 25 };
        }
        if (res.type === 'Medical Staff') {
          return { ...res, available: res.available - 15, deployed: res.deployed + 15 };
        }
        return res;
      }));
      setIsDeploying(false);
      setSuccessMsg('AI Suggested Resources successfully deployed to Zone B (Temple Area)! Response team dispatch synced.');
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1500);
  };

  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl gradient-primary text-white">
            <BrainCircuit size={24} />
          </div>
          Resource Deployment Module
        </h1>
        <p className="text-slate-500 mt-1">Real-time resource tracking and AI-driven deployment optimization</p>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3"
        >
          <CheckCircle2 className="text-emerald-500" />
          <span className="text-sm font-semibold">{successMsg}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Resources Grid & AI panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((res, idx) => {
              const IconComp = resourceIcons[res.type] || Shield;
              const pct = (res.deployed / res.total) * 100;
              return (
                <motion.div
                  key={res.type}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="card-static p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white">{res.type}</span>
                    <div className={`p-2 rounded-lg ${iconColors[res.type] || 'text-slate-400 bg-white/5'}`}>
                      <IconComp size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Total</span>
                      <p className="text-base font-bold text-white">{res.total}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Avail</span>
                      <p className="text-base font-bold text-success-600">{res.available}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Deploy</span>
                      <p className="text-base font-bold text-primary-600">{res.deployed}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary-500 h-1.5 transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Smart Deployment Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="card-static p-6 border-l-4 border-l-primary-500 relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-500/20 border border-primary-500/20 text-primary-400 rounded-xl mt-1">
                <BrainCircuit size={24} />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white">AI-Smart Deployment Assistant</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Based on recent crowd density alerts in <span className="font-semibold text-white">Zone B (Temple Area)</span> and traffic congestion around Begumpet, the system suggests the following deployment updates.
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                    <Clock size={14} /> Recommended Action & Response metrics
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1 pl-4 list-disc">
                    <li>Required Staff: <span className="font-semibold text-white">25 Police Officers</span> and <span className="font-semibold text-white">15 Medical volunteers</span></li>
                    <li>Priority Sector: <span className="font-semibold text-white">Zone B Temple Entrance</span></li>
                    <li>Estimated Dispatch Response Time: <span className="font-semibold text-white">12 minutes</span></li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSmartDeploy}
                    disabled={isDeploying}
                    className="btn btn-primary btn-sm flex items-center gap-1.5"
                  >
                    <Send size={14} /> {isDeploying ? 'Deploying...' : 'Approve & Deploy'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Map visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-static p-6 flex flex-col h-[480px]"
        >
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Navigation size={18} className="text-primary-500" />
            Resource Deployment Map Tracker
          </h3>
          <div className="flex-1 rounded-xl overflow-hidden">
            <MapContainer center={[17.0005, 81.8040]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[17.0005, 81.8040]} icon={customIcon}>
                <Popup>
                  <div className="p-1">
                    <h4 className="font-bold text-white">Municipal Command Center</h4>
                    <p className="text-xs text-slate-500">Central Hub & Dispatch Unit</p>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[17.4325, 78.4073]} icon={customIcon}>
                <Popup>
                  <div className="p-1">
                    <h4 className="font-bold text-white">Jubilee Hills Sub-Station</h4>
                    <p className="text-xs text-slate-500">Volunteers & Medical hub</p>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[17.2500, 78.3400]} icon={customIcon}>
                <Popup>
                  <div className="p-1">
                    <h4 className="font-bold text-white">Pushkaralu Ghat (Zone A)</h4>
                    <p className="text-xs text-slate-500">Active deployment zone</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
