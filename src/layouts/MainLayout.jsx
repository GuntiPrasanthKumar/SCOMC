import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export default function MainLayout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resizing to switch between mobile and desktop sidebar modes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true); // Close drawer by default on mobile
      } else {
        setSidebarCollapsed(false); // Open dock by default on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar drawer automatically on route change (on mobile)
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex relative overflow-x-hidden w-full">
      {/* Sidebar Overlay Backdrop (Mobile Only) */}
      <AnimatePresence>
        {isMobile && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarCollapsed(true)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed top-0 bottom-0 left-0 z-40 transition-all duration-300 lg:sticky lg:h-screen shrink-0 overflow-hidden bg-[#0a0a0c] ${
          isMobile
            ? sidebarCollapsed ? '-translate-x-full w-0 opacity-0' : 'translate-x-0 w-[280px] opacity-100'
            : sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
        }`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen min-w-0">
        {/* Header - passes toggle handler for hamburger on mobile */}
        <Header onMenuToggle={() => setSidebarCollapsed((c) => !c)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
