import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Layers, Eye, EyeOff, MapPin, AlertTriangle, Activity, Droplets, Users, Shield
} from 'lucide-react';
import { mapLocations } from '../../data/mockData';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const layerConfig = {
  complaint: { label: 'Complaints', color: '#3b82f6', icon: MapPin },
  asset: { label: 'Assets', color: '#10b981', icon: Shield },
  incident: { label: 'Incidents', color: '#ef4444', icon: AlertTriangle },
  crowd: { label: 'Crowd Density', color: '#f59e0b', icon: Users },
  flood: { label: 'Flood Alerts', color: '#f97316', icon: Droplets },
  resource: { label: 'Resources', color: '#8b5cf6', icon: Activity },
};

export default function DigitalTwin() {
  const [layers, setLayers] = useState({
    complaint: true,
    asset: true,
    incident: true,
    crowd: true,
    flood: true,
    resource: true,
  });

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredLocations = useMemo(() => {
    return mapLocations.filter(loc => layers[loc.type]);
  }, [layers]);

  const activeAlerts = useMemo(() => {
    return mapLocations.filter(loc => loc.status === 'Critical' || loc.status === 'High' || loc.status === 'High Density');
  }, []);

  return (
    <div className="space-y-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-sky-600" />
          Smart City Digital Twin
        </h1>
        <p className="text-sm text-slate-500 mt-1">Unified spatial view of all city operations</p>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200"
        style={{ height: 'calc(100vh - 140px)' }}
      >
        <MapContainer
          center={[17.0005, 81.8040]}
          zoom={12}
          className="h-full w-full"
          scrollWheelZoom
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map((loc) => {
            const cfg = layerConfig[loc.type];
            return (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={8}
                pathOptions={{
                  color: cfg.color,
                  fillColor: cfg.color,
                  fillOpacity: 0.6,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {cfg.label}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-white">{loc.title}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-300">
                      <span>Type: <span className="font-medium capitalize">{loc.type}</span></span>
                      <span>·</span>
                      <span>Status: <span className="font-semibold">{loc.status}</span></span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Layer Toggle Panel (Top Right) */}
        <div className="absolute top-4 right-4 z-[1000]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg ring-1 ring-slate-200 p-4 w-56"
          >
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Map Layers
            </h3>
            <div className="space-y-2.5">
              {Object.entries(layerConfig).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <label
                    key={key}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={layers[key]}
                        onChange={() => toggleLayer(key)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-[18px] bg-slate-200 rounded-full peer-checked:bg-sky-500 transition-colors" />
                      <div className="absolute left-0.5 top-[1px] w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-[14px]" />
                    </div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition">
                      {cfg.label}
                    </span>
                    <Icon className="w-3 h-3 text-slate-400 ml-auto" />
                  </label>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg ring-1 ring-slate-200 p-4"
          >
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-slate-500">Items on Map</p>
                <p className="text-xl font-bold text-white">{filteredLocations.length}</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-xs text-slate-500">Active Alerts</p>
                <p className="text-xl font-bold text-red-600">{activeAlerts.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
