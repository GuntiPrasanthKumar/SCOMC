import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileWarning,
  ListChecks,
  Siren,
  ScanEye,
  Warehouse,
  ShieldAlert,
  CloudRainWind,
  PackageOpen,
  CalendarCheck,
  Users,
  HeartHandshake,
  Search as SearchIcon,
  Ticket,
  Building2,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Hexagon,
} from 'lucide-react';

const navGroups = [
  {
    label: 'MAIN',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'CITIZEN',
    items: [
      { name: 'Report Issue', path: '/report', icon: FileWarning },
      { name: 'Track Complaints', path: '/complaints', icon: ListChecks },
      { name: 'Emergency', path: '/emergency', icon: Siren },
    ],
  },
  {
    label: 'MUNICIPAL',
    items: [
      { name: 'AI Detection', path: '/ai-detection', icon: ScanEye },
      { name: 'Assets', path: '/assets', icon: Warehouse },
      { name: 'Incidents', path: '/incidents', icon: ShieldAlert },
      { name: 'Flood Safety', path: '/flood-safety', icon: CloudRainWind },
      { name: 'Resources', path: '/resources', icon: PackageOpen },
    ],
  },
  {
    label: 'EVENT',
    items: [
      { name: 'Event Dashboard', path: '/events', icon: CalendarCheck },
      { name: 'Crowd Monitor', path: '/crowd-monitor', icon: Users },
      { name: 'Volunteers', path: '/volunteers', icon: HeartHandshake },
      { name: 'Lost & Found', path: '/lost-found', icon: SearchIcon },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'ServiceNow', path: '/servicenow', icon: Ticket },
      { name: 'Digital Twin', path: '/digital-twin', icon: Building2 },
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Admin', path: '/admin', icon: ShieldCheck },
    ],
  },
];

export default function Sidebar({ collapsed: controlledCollapsed, onToggle }) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const handleToggle = onToggle || (() => setInternalCollapsed((c) => !c));
  const [expandedGroups, setExpandedGroups] = useState(
    navGroups.reduce((acc, group) => ({ ...acc, [group.label]: true }), {})
  );

  const toggleGroup = (label) => {
    if (collapsed) return;
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-full h-screen z-40 flex flex-col bg-[#0a0a0c]/80 backdrop-blur-xl border-r border-white/10 shadow-[2px_0_15px_rgba(0,0,0,0.5)] overflow-hidden shrink-0">
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
        <NavLink to="/" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-md shadow-primary-500/20">
            <Hexagon className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-[14px] font-bold tracking-tight text-white leading-tight">
                SCOMC
              </span>
              <span className="text-[10px] font-semibold text-slate-400 leading-tight truncate">
                Smart City Ops Center
              </span>
            </motion.div>
          )}
        </NavLink>
        <button
          onClick={handleToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <Menu className="w-[18px] h-[18px]" /> : <X className="w-[18px] h-[18px]" />}
        </button>
      </div>

      {/* Navigation Links List */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-3">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {/* Group Label */}
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 mb-1 cursor-pointer text-left"
              >
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-500">
                  {group.label}
                </span>
                {expandedGroups[group.label] ? (
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                )}
              </button>
            )}

            {/* Nav Items */}
            {(collapsed || expandedGroups[group.label]) && (
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/dashboard'}
                      className={({ isActive }) =>
                        `nav-item group relative flex items-center ${isActive ? 'active' : ''} ${
                          collapsed ? 'justify-center px-0 py-2.5 mx-auto w-10' : 'px-3 py-2.5'
                        }`
                      }
                      title={collapsed ? item.name : undefined}
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active indicator bar */}
                          {isActive && (
                            <motion.div
                              layoutId="activeNav"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary-400"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon
                            className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                              isActive ? 'text-primary-400' : 'text-slate-400 group-hover:text-white'
                            }`}
                            strokeWidth={isActive ? 2.2 : 1.8}
                          />
                          {!collapsed && (
                            <span className="truncate text-[13px] font-medium leading-none text-slate-300 group-hover:text-white">
                              {item.name}
                            </span>
                          )}

                          {/* Collapsed tooltip */}
                          {collapsed && (
                            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1a24] border border-white/10 text-white text-xs font-semibold rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl z-50">
                              {item.name}
                              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a1a24] border-l border-b border-white/10 rotate-45" />
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}

            {/* Divider between groups when collapsed */}
            {collapsed && group.label !== 'SYSTEM' && (
              <div className="mx-auto my-2 w-6 h-px bg-white/10" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer Status */}
      <div className="shrink-0 p-3 border-t border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-success-500/10 border border-success-500/20">
            <div className="w-2 h-2 rounded-full bg-success-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[10.5px] font-bold text-success-400 uppercase tracking-wider truncate">
              Systems Normal
            </span>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-2.5 h-2.5 rounded-full bg-success-500 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
