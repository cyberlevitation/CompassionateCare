import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Fade in transition for components
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Slide up transition for components
export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.4 
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Page transition with slide effect
export const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.2 }
  }
};

// Form field transition with staggered effect
export const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggeredItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  }
};

// A wrapper component for animating page transitions
type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// A wrapper for animating form fields with staggered effect
export const StaggeredFormFields = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggeredContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// A wrapper component for animating components with fade in effect
export const FadeIn = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// A wrapper component for animating components with slide up effect
export const SlideUp = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated list item component
export const AnimatedListItem = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          delay,
          type: "spring",
          damping: 25,
          stiffness: 500
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hover transition for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
};

// A wrapper for route transitions
export const AnimatedRoutes = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
};