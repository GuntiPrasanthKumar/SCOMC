import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
