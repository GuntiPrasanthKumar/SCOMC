import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CircleAlert,
  Trash2,
  Droplets,
  Lightbulb,
  TreePine,
  TrafficCone,
  Camera,
  Upload,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  FileText,
  X,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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

const issueTypes = [
  {
    id: 'pothole',
    label: 'Pothole',
    icon: CircleAlert,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    activeBg: 'bg-orange-100',
    activeBorder: 'border-orange-500',
    description: 'Road damage, potholes, cracks',
  },
  {
    id: 'garbage',
    label: 'Garbage',
    icon: Trash2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    activeBg: 'bg-emerald-100',
    activeBorder: 'border-emerald-500',
    description: 'Waste overflow, illegal dumping',
  },
  {
    id: 'water-leakage',
    label: 'Water Leakage',
    icon: Droplets,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    activeBg: 'bg-blue-100',
    activeBorder: 'border-blue-500',
    description: 'Pipeline leak, water supply issue',
  },
  {
    id: 'street-light',
    label: 'Street Light Failure',
    icon: Lightbulb,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    activeBg: 'bg-amber-100',
    activeBorder: 'border-amber-500',
    description: 'Non-functional street lights',
  },
  {
    id: 'fallen-tree',
    label: 'Fallen Tree',
    icon: TreePine,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    activeBg: 'bg-green-100',
    activeBorder: 'border-green-500',
    description: 'Fallen or dangerous trees',
  },
  {
    id: 'traffic',
    label: 'Traffic Issue',
    icon: TrafficCone,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    activeBg: 'bg-rose-100',
    activeBorder: 'border-rose-500',
    description: 'Signal fault, traffic congestion',
  },
];

const steps = [
  { num: 1, label: 'Category' },
  { num: 2, label: 'Details' },
  { num: 3, label: 'Location' },
  { num: 4, label: 'Review' },
];

const priorityFromType = (type) => {
  const map = {
    pothole: 'High',
    garbage: 'Medium',
    'water-leakage': 'Critical',
    'street-light': 'Medium',
    'fallen-tree': 'High',
    traffic: 'High',
  };
  return map[type] || 'Medium';
};

const priorityBadgeClass = (priority) => {
  const map = {
    Critical: 'badge-danger',
    High: 'badge-warning',
    Medium: 'badge-info',
    Low: 'badge-neutral',
  };
  return map[priority] || 'badge-neutral';
};

const stepVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <span className="text-sm font-medium">Issue Location</span>
        <br />
        <span className="text-xs text-slate-500">
          {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </span>
      </Popup>
    </Marker>
  ) : null;
}

export default function ReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    issueType: '',
    description: '',
    photos: [],
    location: null,
    address: '',
  });

  const selectedType = issueTypes.find((t) => t.id === form.issueType);
  const priority = form.issueType ? priorityFromType(form.issueType) : '';

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canGoNext = () => {
    if (currentStep === 1) return !!form.issueType;
    if (currentStep === 2) return form.description.length >= 10;
    if (currentStep === 3) return form.location || form.address;
    return true;
  };

  const generatedId = `CMP-2024-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;

  if (submitted) {
    return (
      <div className="p-6 lg:p-8 max-w-[700px] mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="card-static p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Complaint Submitted Successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-slate-500 mb-6"
          >
            Your complaint has been registered and will be addressed by the concerned department.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-xl px-6 py-3 mb-8"
          >
            <FileText className="w-5 h-5 text-sky-600" />
            <span className="text-sm text-slate-500">Complaint ID:</span>
            <span className="text-lg font-bold text-sky-700">{generatedId}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/complaints" className="btn btn-primary">
              <ArrowRight className="w-4 h-4" />
              Track Status
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setForm({ issueType: '', description: '', photos: [], location: null, address: '' });
              }}
              className="btn btn-secondary"
            >
              Report Another Issue
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[900px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Report an Issue
        </h1>
        <p className="text-slate-500 mt-1">
          Help us improve your city by reporting civic issues.
        </p>
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-static p-5 mb-6"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep > step.num
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                      : currentStep === step.num
                      ? 'gradient-primary text-white shadow-md shadow-sky-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > step.num ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`hidden sm:block text-sm font-medium transition-colors ${
                    currentStep >= step.num ? 'text-slate-200' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-[2px] bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{
                        width: currentStep > step.num ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <div className="card-static p-6 lg:p-8 mb-6 min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                Select Issue Category
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Choose the type of issue you want to report.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {issueTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = form.issueType === type.id;
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setForm((f) => ({ ...f, issueType: type.id }))
                      }
                      className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? `${type.activeBg} ${type.activeBorder} shadow-md`
                          : `${type.bg} ${type.border} hover:shadow-sm`
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </motion.div>
                      )}
                      <div
                        className={`w-12 h-12 rounded-xl ${
                          isSelected ? 'bg-white/70' : 'bg-white'
                        } flex items-center justify-center mb-3 shadow-sm`}
                      >
                        <Icon className={`w-6 h-6 ${type.color}`} />
                      </div>
                      <h3 className="font-semibold text-white mb-1">
                        {type.label}
                      </h3>
                      <p className="text-xs text-slate-500">{type.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                Provide Details
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Add a photo and describe the issue in detail.
              </p>

              {/* Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Upload Photo or Video
                </label>
                <div
                  className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center
                    hover:border-primary-400 hover:bg-sky-50/30 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                    <Camera className="w-7 h-7 text-slate-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-slate-300 mb-1">
                    Upload Photo or Video
                  </p>
                  <p className="text-xs text-slate-400">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG, MP4 up to 10MB
                  </p>
                </div>
                {form.photos.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {form.photos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center relative"
                      >
                        <Upload className="w-5 h-5 text-slate-400" />
                        <button
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              photos: f.photos.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className="textarea"
                  placeholder="Describe the issue in detail — what you observed, how long it's been there, any hazards..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={4}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {form.description.length}/500 characters (minimum 10)
                </p>
              </div>

              {/* Auto Priority */}
              {priority && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="text-sm text-slate-300 mr-2">
                      Auto-assigned Priority:
                    </span>
                    <span className={`badge ${priorityBadgeClass(priority)}`}>
                      {priority}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                Select Location
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Click on the map to pin the issue location, or enter the address.
              </p>

              {/* Address Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Address / Landmark
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="e.g., MG Road near City Mall, Ward 12"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <MapContainer
                  center={[17.0005, 81.8040]}
                  zoom={12}
                  style={{ height: '320px', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker
                    position={form.location}
                    setPosition={(pos) =>
                      setForm((f) => ({ ...f, location: pos }))
                    }
                  />
                </MapContainer>
              </div>

              {form.location && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-slate-500 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-sky-500" />
                  Pinned at: {form.location[0].toFixed(4)},{' '}
                  {form.location[1].toFixed(4)}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                Review & Submit
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Please verify all the details before submitting your complaint.
              </p>

              <div className="space-y-4">
                {/* Category */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                    Issue Category
                  </p>
                  <div className="flex items-center gap-3">
                    {selectedType && (
                      <>
                        <div
                          className={`w-10 h-10 rounded-lg ${selectedType.bg} flex items-center justify-center`}
                        >
                          <selectedType.icon
                            className={`w-5 h-5 ${selectedType.color}`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {selectedType.label}
                          </p>
                          <span className={`badge ${priorityBadgeClass(priority)}`}>
                            {priority} Priority
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                    Description
                  </p>
                  <p className="text-sm text-slate-200">
                    {form.description || 'No description provided'}
                  </p>
                </div>

                {/* Location */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                    Location
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <p className="text-sm text-slate-200">
                      {form.address || 'No address provided'}
                      {form.location &&
                        ` (${form.location[0].toFixed(4)}, ${form.location[1].toFixed(4)})`}
                    </p>
                  </div>
                </div>

                {/* Citizen Info */}
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl">
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                    Submitted By
                  </p>
                  <p className="text-sm font-medium text-white">
                    Rajesh Kumar
                  </p>
                  <p className="text-xs text-slate-500">
                    +91 98765 43210 · rajesh@citizen.scomc.gov.in
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 1}
          className={`btn btn-secondary ${
            currentStep === 1 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        {currentStep < 4 ? (
          <button
            onClick={goNext}
            disabled={!canGoNext()}
            className={`btn btn-primary ${
              !canGoNext() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="btn btn-success btn-lg"
          >
            <CheckCircle2 className="w-5 h-5" />
            Submit Complaint
          </motion.button>
        )}
      </div>
    </div>
  );
}
