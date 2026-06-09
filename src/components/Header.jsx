import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Menu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/report': 'Report Issue',
  '/complaints': 'Track Complaints',
  '/emergency': 'Emergency Services',
  '/ai-detection': 'AI Detection',
  '/assets': 'Asset Management',
  '/incidents': 'Incident Management',
  '/flood-safety': 'Flood Safety Monitor',
  '/resources': 'Resource Management',
  '/events': 'Event Dashboard',
  '/crowd-monitor': 'Crowd Monitor',
  '/volunteers': 'Volunteer Management',
  '/lost-found': 'Lost & Found',
  '/servicenow': 'ServiceNow Integration',
  '/digital-twin': 'Digital Twin',
  '/analytics': 'Analytics & Reports',
  '/admin': 'Administration',
};

const mockNotifications = [
  { id: 1, title: 'Pothole reported on MG Road', time: '2 min ago', type: 'warning', unread: true },
  { id: 2, title: 'Water supply restored in Sector 14', time: '15 min ago', type: 'success', unread: true },
  { id: 3, title: 'Flood alert: Musi River level rising', time: '32 min ago', type: 'danger', unread: true },
  { id: 4, title: 'AI detected garbage dump on NH-44', time: '1 hr ago', type: 'info', unread: false },
  { id: 5, title: 'Event permit approved — Ganesh Chaturthi', time: '2 hrs ago', type: 'success', unread: false },
];

const typeColors = {
  warning: 'bg-accent-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  info: 'bg-primary-500',
};

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const pageTitle = pageTitles[location.pathname] || 'SCOMC';
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const roleBadge = {
    admin: { label: 'Administrator', color: 'bg-danger-50 text-danger-600' },
    staff: { label: 'Staff Officer', color: 'bg-primary-50 text-primary-600' },
    citizen: { label: 'Citizen', color: 'bg-success-50 text-success-600' },
  };

  const currentRole = roleBadge[user?.role] || roleBadge.citizen;

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Page Title + Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-800 leading-tight">{pageTitle}</h1>
          <p className="text-[11px] text-slate-400 font-medium leading-tight hidden sm:block">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search complaints, assets, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 pr-4 py-2.5 bg-slate-50/80 border-slate-200/60 focus:bg-white text-[13px] rounded-xl"
          />
          {searchQuery && (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
              ESC
            </kbd>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowUserMenu(false);
            }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-[19px] h-[19px]" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-danger-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-danger-500/30 ring-2 ring-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                  <span className="badge badge-info text-[10px]">{unreadCount} new</span>
                </div>
                <div className="max-h-[340px] overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 ${
                        notif.unread ? 'bg-primary-50/20' : ''
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${typeColors[notif.type]}`} />
                      <div className="min-w-0 flex-1">
                        <p className={`text-[13px] leading-snug ${notif.unread ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{notif.time}</span>
                      </div>
                      {notif.unread && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                  <button className="text-[12px] font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
                    View all notifications →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu((v) => !v);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-2 py-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-[13px] font-bold shadow-md shadow-primary-500/20">
              {userInitials}
            </div>
            <div className="hidden lg:flex flex-col items-start">
              <span className="text-[13px] font-semibold text-slate-700 leading-tight">
                {user?.name || 'User'}
              </span>
              <span className="text-[10.5px] text-slate-400 font-medium leading-tight">
                {user?.role === 'admin' ? 'Administrator' : user?.role === 'staff' ? 'Staff Officer' : 'Citizen'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden"
              >
                {/* User info */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white text-[15px] font-bold shadow-md shadow-primary-500/20">
                      {userInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-slate-800 truncate">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10.5px] font-semibold ${currentRole.color}`}>
                      {currentRole.label}
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer">
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-100 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-danger-600 hover:bg-danger-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
