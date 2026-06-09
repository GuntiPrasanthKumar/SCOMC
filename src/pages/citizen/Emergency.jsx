import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Flame,
  Users,
  Search,
  CloudRain,
  Phone,
  X,
  AlertTriangle,
  MapPin,
  Clock,
  Shield,
  Siren,
  Navigation,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle as LeafletCircle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const emergencyTypes = [
  {
    id: 'medical',
    label: 'Medical Emergency',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    hoverBg: 'hover:bg-rose-100',
    activeBg: 'bg-rose-100',
    activeBorder: 'border-rose-500',
    gradient: 'from-rose-500 to-red-600',
    desc: 'Heart attack, injury, accident',
    number: '108',
  },
  {
    id: 'fire',
    label: 'Fire Emergency',
    icon: Flame,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    hoverBg: 'hover:bg-orange-100',
    activeBg: 'bg-orange-100',
    activeBorder: 'border-orange-500',
    gradient: 'from-orange-500 to-red-500',
    desc: 'Fire, gas leak, explosion',
    number: '101',
  },
  {
    id: 'crowd',
    label: 'Crowd Incident',
    icon: Users,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hoverBg: 'hover:bg-amber-100',
    activeBg: 'bg-amber-100',
    activeBorder: 'border-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    desc: 'Stampede, crowd surge',
    number: '112',
  },
  {
    id: 'lost',
    label: 'Lost Person',
    icon: Search,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    hoverBg: 'hover:bg-purple-100',
    activeBg: 'bg-purple-100',
    activeBorder: 'border-purple-500',
    gradient: 'from-purple-500 to-indigo-600',
    desc: 'Missing child, elderly person',
    number: '112',
  },
  {
    id: 'flood',
    label: 'Flood Alert',
    icon: CloudRain,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hoverBg: 'hover:bg-blue-100',
    activeBg: 'bg-blue-100',
    activeBorder: 'border-blue-500',
    gradient: 'from-blue-500 to-cyan-600',
    desc: 'Waterlogging, flood rescue',
    number: '1070',
  },
];

const userLocation = [17.0005, 81.8040];

export default function Emergency() {
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [trackingStage, setTrackingStage] = useState(0);
  const [eta, setEta] = useState(8);
  const [distance, setDistance] = useState(2.3);

  const referenceNumber = `EMR-${Date.now().toString().slice(-8)}`;

  const handleEmergencyClick = () => {
    setShowModal(true);
    setTrackingStage(0);
    setEta(8);
    setDistance(2.3);
  };

  useEffect(() => {
    if (!showModal) return;

    const stages = [
      { delay: 1500, stage: 1 },
      { delay: 3000, stage: 2 },
      { delay: 5000, stage: 3 },
    ];

    const timers = stages.map(({ delay, stage }) =>
      setTimeout(() => setTrackingStage(stage), delay)
    );

    const etaTimer = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 1));
      setDistance((prev) => Math.max(prev - 0.3, 0.4));
    }, 4000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(etaTimer);
    };
  }, [showModal]);

  const selectedEmergency = emergencyTypes.find((t) => t.id === selectedType);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
          <Siren className="w-8 h-8 text-rose-500" />
          Emergency Assistance
        </h1>
        <p className="text-slate-500 mt-1">
          Get immediate help for emergencies. Select the type of emergency and press the button.
        </p>
      </motion.div>

      {/* Emergency Type Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Select Emergency Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {emergencyTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = selectedType === type.id;
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedType(type.id)}
                className={`relative p-5 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${type.activeBg} ${type.activeBorder} shadow-lg`
                    : `${type.bg} ${type.border} ${type.hoverBg} shadow-sm`
                }`}
              >
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                )}
                <div
                  className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-sm`}
                >
                  <Icon className={`w-7 h-7 ${type.color}`} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">
                  {type.label}
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {type.desc}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Emergency Button Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center mb-10"
      >
        <p className="text-sm text-slate-500 mb-6 text-center">
          Press the emergency button to send an immediate distress signal to nearby responders.
        </p>

        {/* Pulsing Emergency Button */}
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="absolute w-44 h-44 rounded-full border-2 border-rose-300 opacity-0"
              style={{
                animation: 'emergency-ring 2s ease-out infinite',
              }}
            />
            <span
              className="absolute w-44 h-44 rounded-full border-2 border-rose-300 opacity-0"
              style={{
                animation: 'emergency-ring 2s ease-out infinite 0.5s',
              }}
            />
            <span
              className="absolute w-44 h-44 rounded-full border-2 border-rose-300 opacity-0"
              style={{
                animation: 'emergency-ring 2s ease-out infinite 1s',
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleEmergencyClick}
            className="relative w-36 h-36 rounded-full bg-gradient-to-br from-rose-500 via-red-500 to-rose-700 text-white
              flex flex-col items-center justify-center gap-1 shadow-2xl shadow-rose-300/60
              cursor-pointer z-10 border-4 border-rose-300/30"
          >
            <AlertTriangle className="w-10 h-10 mb-1" />
            <span className="text-sm font-bold tracking-wider uppercase">
              Emergency
            </span>
          </motion.button>
        </div>

        {selectedEmergency && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">
              Helpline for {selectedEmergency.label}:
            </span>
            <span className="font-bold text-white">
              {selectedEmergency.number}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card-static overflow-hidden"
      >
        <div className="p-5 pb-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            Your Location
          </h2>
          <p className="text-sm text-slate-500">
            Your location is shared with emergency services for rapid response.
          </p>
        </div>
        <div className="px-5 pb-5">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: '300px', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={userLocation} icon={customIcon}>
                <Popup>
                  <span className="text-sm font-medium">Your Location</span>
                  <br />
                  <span className="text-xs text-slate-500">Rajahmundry, Andhra Pradesh</span>
                </Popup>
              </Marker>
              {/* Pulsing circle around user location */}
              <LeafletCircle
                center={userLocation}
                radius={300}
                pathOptions={{
                  color: '#f43f5e',
                  fillColor: '#f43f5e',
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
              <LeafletCircle
                center={userLocation}
                radius={150}
                pathOptions={{
                  color: '#f43f5e',
                  fillColor: '#f43f5e',
                  fillOpacity: 0.2,
                  weight: 1,
                }}
              />
            </MapContainer>
          </div>
        </div>
      </motion.div>

      {/* Emergency Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 card-static p-5"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-sky-500" />
          Emergency Helplines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Police', number: '100', icon: Shield, color: 'text-blue-600 bg-blue-50' },
            { label: 'Fire', number: '101', icon: Flame, color: 'text-orange-600 bg-orange-50' },
            { label: 'Ambulance', number: '108', icon: Heart, color: 'text-rose-600 bg-rose-50' },
            { label: 'Disaster', number: '1070', icon: CloudRain, color: 'text-cyan-600 bg-cyan-50' },
            { label: 'Women', number: '1091', icon: Users, color: 'text-purple-600 bg-purple-50' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-2`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                <p className="text-lg font-bold text-white">{item.number}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Emergency Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-rose-500 to-red-600 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Siren className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Emergency Request Sent!</h3>
                      <p className="text-rose-100 text-sm">Help is on the way</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Reference Number */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 text-center">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                    Reference Number
                  </p>
                  <p className="text-xl font-bold text-white">{referenceNumber}</p>
                </div>

                {/* Live Tracking */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                    Live Tracking
                  </h4>

                  <div className="space-y-3">
                    {[
                      { label: 'Request received', done: trackingStage >= 0 },
                      { label: 'Locating nearest responder', done: trackingStage >= 1 },
                      { label: 'Responder dispatched', done: trackingStage >= 2 },
                      { label: 'Responder en route', done: trackingStage >= 3 },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="flex items-center gap-3"
                      >
                        {item.done ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                            }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          </motion.div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            item.done ? 'text-slate-200 font-medium' : 'text-slate-400'
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ETA Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: trackingStage >= 2 ? 1 : 0.3 }}
                  className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">
                        Nearest responder is{' '}
                        <span className="font-bold text-sky-700">
                          {distance.toFixed(1)} km
                        </span>{' '}
                        away
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        <p className="text-sm font-bold text-sky-700">
                          ETA: {eta} minutes
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="tel:112"
                    className="btn btn-danger flex-1 justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    Call 112
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary flex-1 justify-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for pulse animation */}
      <style>{`
        @keyframes emergency-ring {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
