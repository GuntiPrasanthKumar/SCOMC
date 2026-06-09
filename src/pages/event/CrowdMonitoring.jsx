import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Users, AlertTriangle, ShieldCheck, ShieldAlert, Gauge } from 'lucide-react';
import { crowdZones, chartData } from '../../data/mockData';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const densityColor = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#f97316',
  Critical: '#ef4444',
};

const densityBg = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
};

const riskBg = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  High: 'bg-red-50 text-red-700 ring-red-200',
  Critical: 'bg-red-100 text-red-800 ring-red-300',
};

export default function CrowdMonitoring() {
  const totalCount = useMemo(() => crowdZones.reduce((s, z) => s + z.count, 0), []);
  const totalCapacity = useMemo(() => crowdZones.reduce((s, z) => s + z.capacity, 0), []);
  const overallPercent = Math.round((totalCount / totalCapacity) * 100);

  const riskCounts = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    crowdZones.forEach((z) => { counts[z.risk] = (counts[z.risk] || 0) + 1; });
    return counts;
  }, []);

  const riskCards = [
    { level: 'Low', count: riskCounts.Low, icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
    { level: 'Medium', count: riskCounts.Medium, icon: ShieldAlert, color: 'bg-amber-50 text-amber-600 ring-amber-100' },
    { level: 'High', count: riskCounts.High, icon: AlertTriangle, color: 'bg-orange-50 text-orange-600 ring-orange-100' },
    { level: 'Critical', count: riskCounts.Critical, icon: AlertTriangle, color: 'bg-red-50 text-red-600 ring-red-100' },
  ];

  // Gauge arc
  const gaugeAngle = (overallPercent / 100) * 180;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-sky-600" />
            Crowd Monitoring
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real-time zone density and capacity tracking</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {Object.entries(densityColor).map(([level, color]) => (
            <span key={level} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              {level}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Risk Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {riskCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.level}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-xl p-4 ring-1 ${card.color} shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5" />
                <span className="text-2xl font-bold">{card.count}</span>
              </div>
              <p className="text-xs font-medium mt-1">{card.level} Risk Zones</p>
            </motion.div>
          );
        })}
      </div>

      {/* Map + Gauge */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-white">Zone Density Map</h2>
          </div>
          <div className="h-[420px]">
            <MapContainer center={[17.25, 78.34]} zoom={14} className="h-full w-full" scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {crowdZones.map((zone) => (
                <CircleMarker
                  key={zone.id}
                  center={[zone.lat, zone.lng]}
                  radius={zone.density === 'Critical' ? 28 : zone.density === 'High' ? 22 : zone.density === 'Medium' ? 18 : 14}
                  pathOptions={{
                    color: densityColor[zone.density],
                    fillColor: densityColor[zone.density],
                    fillOpacity: 0.35,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <p className="font-bold text-sm text-white">{zone.name}</p>
                      <div className="mt-1 space-y-0.5 text-xs text-slate-300">
                        <p>Density: <span className="font-semibold">{zone.density}</span></p>
                        <p>Count: <span className="font-semibold">{zone.count.toLocaleString()}</span></p>
                        <p>Capacity: <span className="font-semibold">{zone.capacity.toLocaleString()}</span></p>
                        <p>Utilization: <span className="font-semibold">{Math.round((zone.count / zone.capacity) * 100)}%</span></p>
                        <p>Risk: <span className="font-semibold">{zone.risk}</span></p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </motion.div>

        {/* Gauge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6 flex flex-col items-center justify-center"
        >
          <Gauge className="w-5 h-5 text-slate-400 mb-2" />
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Overall Attendance</h3>
          {/* SVG Gauge */}
          <div className="relative w-44 h-24">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Value arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={overallPercent >= 90 ? '#ef4444' : overallPercent >= 70 ? '#f59e0b' : '#10b981'}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${(gaugeAngle / 180) * 251.2} 251.2`}
              />
              <text x="100" y="88" textAnchor="middle" className="text-3xl font-bold" fill="#0f172a" fontSize="32">
                {overallPercent}%
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">{totalCount.toLocaleString()} / {totalCapacity.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">across all zones</p>

          <div className="w-full mt-6 pt-4 border-t border-slate-100 space-y-2">
            {crowdZones.map((z) => {
              const pct = Math.round((z.count / z.capacity) * 100);
              return (
                <div key={z.id} className="text-xs">
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span className="truncate pr-2">{z.name.split(' - ')[1] || z.name}</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: densityColor[z.density],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Zone Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-white">Zone Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Zone Name</th>
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Density</th>
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider text-right">Count</th>
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider text-right">Capacity</th>
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider text-right">Utilization</th>
                <th className="px-5 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crowdZones.map((zone) => {
                const utilization = Math.round((zone.count / zone.capacity) * 100);
                return (
                  <tr key={zone.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{zone.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${densityBg[zone.density]}`}>
                        {zone.density}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-slate-200 font-medium">{zone.count.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right text-slate-500">{zone.capacity.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`font-semibold ${utilization > 100 ? 'text-red-600' : utilization > 80 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {utilization}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${riskBg[zone.risk]}`}>
                        {zone.risk}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
