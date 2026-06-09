import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Waves, AlertTriangle, ShieldAlert, CheckCircle2,
  BellRing, Navigation, ArrowUpRight, TrendingUp, Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { floodData, chartData } from '../../data/mockData';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const statusColors = {
  Normal: 'badge-success',
  Warning: 'badge-warning',
  Alert: 'badge-danger',
};

export default function FloodSafety() {
  const [currentLevel, setCurrentLevel] = useState(floodData.currentLevel);
  const [alerts, setAlerts] = useState(floodData.alerts);
  const [newAlertMsg, setNewAlertMsg] = useState('');

  const handleLevelIncrease = () => {
    setCurrentLevel(prev => +(prev + 0.3).toFixed(1));
  };

  const handleLevelDecrease = () => {
    setCurrentLevel(prev => +(prev - 0.3).toFixed(1));
  };

  const handlePostAlert = (e) => {
    e.preventDefault();
    if (!newAlertMsg) return;
    setAlerts(prev => [
      { id: Date.now(), message: newAlertMsg, severity: 'Alert', time: 'Just now' },
      ...prev
    ]);
    setNewAlertMsg('');
  };

  const pctOfDanger = Math.min((currentLevel / floodData.dangerLevel) * 100, 100);

  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl gradient-primary text-white">
              <Waves size={24} />
            </div>
            Flood & River Safety Module
          </h1>
          <p className="text-slate-500 mt-1">Real-time river water levels, risk zone mapping, and automatic safety alerts</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleLevelDecrease} className="btn btn-secondary btn-sm">
            Simulate Level Down
          </button>
          <button onClick={handleLevelIncrease} className="btn btn-danger btn-sm">
            Simulate Level Up
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level Indicator and Recharts Area Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level circular gauge card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-static p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-slate-500 mb-4">River Water Level</h3>
              
              {/* SVG Ring Gauge */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={currentLevel >= floodData.warningLevel ? '#f59e0b' : currentLevel >= floodData.dangerLevel ? '#f43f5e' : '#0ea5e9'}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * pctOfDanger) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-extrabold text-white">{currentLevel}m</p>
                  <p className="text-xs text-slate-400">Danger: {floodData.dangerLevel}m</p>
                </div>
              </div>

              <div className="mt-4">
                <span className={`badge ${currentLevel >= floodData.dangerLevel ? 'badge-danger' : currentLevel >= floodData.warningLevel ? 'badge-warning' : 'badge-success'}`}>
                  {currentLevel >= floodData.dangerLevel ? 'Critical Danger' : currentLevel >= floodData.warningLevel ? 'Warning Level' : 'Normal'}
                </span>
              </div>
            </motion.div>

            {/* General metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="card-static p-6 md:col-span-2 space-y-4"
            >
              <h3 className="text-sm font-semibold text-slate-500">Live Station Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-400">Warning Threshold</span>
                  <p className="text-lg font-bold text-slate-200">{floodData.warningLevel} meters</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-400">Normal Range</span>
                  <p className="text-lg font-bold text-slate-200">{floodData.normalLevel} meters</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-400">Active Risk Zones</span>
                  <p className="text-lg font-bold text-slate-200">{floodData.riskZones.length}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-400">Last Scanned Update</span>
                  <p className="text-xs font-semibold text-slate-200 mt-1">{floodData.lastUpdated}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Historical Trend Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-500" />
              River Level Gauge Trends (Last 24 Hours)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.waterLevel}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[8, 20]} />
                  <Tooltip contentStyle={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorLevel)" />
                  <Area type="monotone" dataKey="danger" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Map view */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Navigation size={18} className="text-primary-500" />
              Risk Zone Visualizer Map
            </h3>
            <div className="h-[280px]">
              <MapContainer center={[17.0005, 81.8040]} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {floodData.riskZones.map((zone, idx) => (
                  <Marker key={idx} position={[zone.lat, zone.lng]} icon={customIcon}>
                    <Popup>
                      <div className="p-1">
                        <h4 className="font-bold text-white">{zone.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">Water level: <span className="font-semibold">{zone.level}m</span></p>
                        <p className="text-xs mt-1">Status: <span className={`badge ${statusColors[zone.status]}`}>{zone.status}</span></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </motion.div>
        </div>

        {/* Safety Alerts Feed */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <BellRing size={18} className="text-danger-500" />
              Safety Alerts Feed
            </h3>
            
            <form onSubmit={handlePostAlert} className="mb-4 space-y-2">
              <input
                type="text"
                className="input py-2 text-sm"
                placeholder="Broadcast emergency safety alert..."
                value={newAlertMsg}
                onChange={(e) => setNewAlertMsg(e.target.value)}
              />
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary btn-sm flex items-center gap-1.5">
                  <ArrowUpRight size={14} /> Broadcast
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
                  <div className="text-danger-500 mt-0.5">
                    <ShieldAlert size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-semibold mb-1">{alert.time}</p>
                    <p className="text-sm font-medium text-slate-200 leading-tight">{alert.message}</p>
                    <span className="badge badge-danger text-[10px] py-0 px-1.5 mt-2">{alert.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card-static p-6"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
              <Info size={18} className="text-primary-500" />
              SOP Action Guidelines
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-success-500 mt-0.5 shrink-0" />
                <span>Level &gt; 16.0m: Initiate flood warning system & deploy alerts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-success-500 mt-0.5 shrink-0" />
                <span>Level &gt; 17.0m: Set restricted access to lower level ghats.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-success-500 mt-0.5 shrink-0" />
                <span>Level &gt; 18.0m: Activate automatic evacuation route guides.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
