import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Brain, CheckCircle2, AlertTriangle, ImageIcon,
  BarChart3, Tag, Building2, Ticket, X, RefreshCw, Loader2
} from 'lucide-react';
import { aiClassifications } from '../../data/mockData';

const classificationHistory = [
  { id: 1, timestamp: '2024-01-28 16:20', category: 'Pothole', confidence: 94, department: 'Roads & Infrastructure', ticketId: 'SNW-AI-0147' },
  { id: 2, timestamp: '2024-01-28 15:45', category: 'Garbage Overflow', confidence: 89, department: 'Sanitation', ticketId: 'SNW-AI-0146' },
  { id: 3, timestamp: '2024-01-28 14:30', category: 'Water Leakage', confidence: 91, department: 'Water Supply', ticketId: 'SNW-AI-0145' },
  { id: 4, timestamp: '2024-01-28 13:10', category: 'Broken Street Light', confidence: 93, department: 'Electrical', ticketId: 'SNW-AI-0144' },
  { id: 5, timestamp: '2024-01-28 11:55', category: 'Fallen Tree', confidence: 87, department: 'Horticulture', ticketId: 'SNW-AI-0143' },
  { id: 6, timestamp: '2024-01-28 10:20', category: 'Traffic Signal Fault', confidence: 85, department: 'Traffic Management', ticketId: 'SNW-AI-0142' },
];

export default function AIDetection() {
  const [uploadState, setUploadState] = useState('idle'); // idle | dragging | loading | result
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    setFileName(file.name);
    setUploadState('loading');

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * aiClassifications.length);
      const cls = aiClassifications[randomIdx];
      setResult({
        category: cls.label,
        confidence: Math.round(cls.confidence * 100),
        department: cls.department,
        ticketId: `SNW-AI-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      });
      setUploadState('result');
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadState('idle');
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setUploadState('dragging');
  };

  const handleDragLeave = () => {
    setUploadState('idle');
  };

  const handleReset = () => {
    setUploadState('idle');
    setFileName('');
    setResult(null);
  };

  const confidenceColor = (c) => {
    if (c >= 90) return 'text-success-600';
    if (c >= 80) return 'text-accent-600';
    return 'text-danger-500';
  };

  const confidenceBarColor = (c) => {
    if (c >= 90) return 'bg-success-500';
    if (c >= 80) return 'bg-accent-500';
    return 'bg-danger-500';
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl gradient-purple text-white">
              <Brain size={24} />
            </div>
            AI-Powered Issue Detection
          </h1>
          <p className="text-slate-500 mt-1">Upload infrastructure images for automated classification and ticket generation</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-success flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            Model Online
          </span>
        </div>
      </div>

      {/* Upload Area & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Upload size={20} className="text-primary-500" />
            Upload Image
          </h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => uploadState === 'idle' && fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
              ${uploadState === 'dragging'
                ? 'border-primary-400 bg-primary-50 scale-[1.02]'
                : uploadState === 'loading' || uploadState === 'result'
                  ? 'border-slate-200 bg-slate-50 cursor-default'
                  : 'border-slate-300 bg-white hover:border-primary-300 hover:bg-primary-50/30'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            <AnimatePresence mode="wait">
              {uploadState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                    <Upload size={36} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-200">Drop image here or click to browse</p>
                    <p className="text-sm text-slate-400 mt-1">Supports JPG, PNG, WEBP up to 10MB</p>
                  </div>
                </motion.div>
              )}

              {uploadState === 'dragging' && (
                <motion.div
                  key="drag"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center animate-bounce">
                    <Upload size={36} className="text-primary-600" />
                  </div>
                  <p className="text-lg font-semibold text-primary-600">Release to upload</p>
                </motion.div>
              )}

              {uploadState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-primary-100" />
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain size={28} className="text-primary-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-200">Analyzing Image...</p>
                    <p className="text-sm text-slate-400 mt-1">{fileName}</p>
                  </div>
                  <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {uploadState === 'result' && (
                <motion.div
                  key="result-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-2xl bg-success-50 flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-success-500" />
                  </div>
                  <p className="text-lg font-semibold text-success-600">Analysis Complete</p>
                  <p className="text-sm text-slate-400">{fileName}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-static p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-500" />
            Classification Results
          </h2>

          <AnimatePresence mode="wait">
            {uploadState === 'idle' && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-72 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <ImageIcon size={28} className="text-slate-300" />
                </div>
                <p className="text-slate-400 font-medium">Upload an image to see AI classification results</p>
                <p className="text-sm text-slate-300 mt-1">The model will detect and categorize infrastructure issues</p>
              </motion.div>
            )}

            {uploadState === 'loading' && (
              <motion.div
                key="loading-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 h-72 flex flex-col justify-center"
              >
                <div className="skeleton h-6 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-4 w-2/3" />
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-10 w-full mt-4" />
              </motion.div>
            )}

            {uploadState === 'result' && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Category */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-transparent rounded-xl">
                  <div className="p-2 rounded-lg gradient-primary text-white">
                    <Tag size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Detected Category</p>
                    <p className="text-xl font-bold text-white">{result.category}</p>
                  </div>
                </div>

                {/* Confidence */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Confidence Score</p>
                    <p className={`text-2xl font-bold ${confidenceColor(result.confidence)}`}>{result.confidence}%</p>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${confidenceBarColor(result.confidence)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Department & Ticket */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 size={14} className="text-slate-400" />
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Department</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{result.department}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Ticket size={14} className="text-slate-400" />
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Ticket ID</p>
                    </div>
                    <p className="text-sm font-semibold text-primary-600">{result.ticketId}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="btn btn-primary flex-1">
                    <CheckCircle2 size={16} />
                    Create Incident
                  </button>
                  <button className="btn btn-secondary flex-1">
                    <RefreshCw size={16} />
                    Override Classification
                  </button>
                  <button className="btn btn-ghost" onClick={handleReset}>
                    <X size={16} />
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Classification History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-static p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Loader2 size={20} className="text-primary-500" />
          Classification History
        </h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Image</th>
                <th>Category</th>
                <th>Confidence</th>
                <th>Department</th>
                <th>Ticket ID</th>
              </tr>
            </thead>
            <tbody>
              {classificationHistory.map((item, idx) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <td className="text-sm text-slate-300 whitespace-nowrap">{item.timestamp}</td>
                  <td>
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <ImageIcon size={16} className="text-slate-400" />
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-white">{item.category}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${confidenceBarColor(item.confidence)}`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${confidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-slate-300">{item.department}</td>
                  <td>
                    <span className="font-mono text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                      {item.ticketId}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
