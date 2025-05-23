import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { format, differenceInDays, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Award, Calendar, Heart, Star, Check, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

// Care journey milestone types
interface Milestone {
  id: number;
  type: 'appointment' | 'assessment' | 'goal' | 'achievement';
  title: string;
  description: string;
  date: string;
  completed: boolean;
  icon: keyof typeof icons;
  celebration?: boolean;
}

// Custom journey types
interface CareJourney {
  id: string;
  userId: string;
  startDate: string;
  currentPhase: string;
  milestones: Milestone[];
  nextMilestone?: Milestone;
}

// Icons for different milestone types
const icons = {
  'appointment': Calendar,
  'assessment': Check,
  'goal': Star,
  'achievement': Trophy,
  'heart': Heart,
  'sparkles': Sparkles
};

export default function CareJourneyTimeline() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch user's care journey from the API
  const { data: careJourney, isLoading } = useQuery<CareJourney>({
    queryKey: ['/api/care-journey'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    enabled: !!user,
  });

  // Fallback data for demonstration if no journey exists yet
  const defaultJourney: CareJourney = {
    id: 'demo-journey',
    userId: user?.id || 'user',
    startDate: new Date().toISOString(),
    currentPhase: 'Initial Assessment',
    milestones: [
      {
        id: 1,
        type: 'appointment',
        title: 'Initial Consultation',
        description: 'Your first meeting with our care team to discuss your needs.',
        date: new Date().toISOString(),
        completed: true,
        icon: 'appointment',
        celebration: true
      },
      {
        id: 2,
        type: 'assessment',
        title: 'Care Assessment',
        description: 'Comprehensive evaluation of your care requirements.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        icon: 'assessment'
      },
      {
        id: 3,
        type: 'goal',
        title: 'Care Plan Creation',
        description: 'Development of your personalized care plan.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        icon: 'goal'
      },
      {
        id: 4,
        type: 'achievement',
        title: 'First Month Milestone',
        description: 'Celebrating one month of successful care service.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        icon: 'achievement',
        celebration: true
      }
    ],
  };

  // Use fetched data or fallback to demo data
  const journey = careJourney || defaultJourney;

  // Launch confetti celebration effect
  const triggerCelebration = () => {
    setShowCelebration(true);

    // Launch confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create colorful confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#e30613', '#333333', '#ffc107', '#28a745', '#007bff'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#e30613', '#333333', '#ffc107', '#28a745', '#007bff'],
      });
    }, 250);

    // Hide celebration after animation completes
    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  // Show milestone details when clicked
  const handleMilestoneClick = (milestone: Milestone) => {
    setActiveMilestone(milestone);
    
    // If this is a celebration milestone and it's completed, trigger the celebration
    if (milestone.celebration && milestone.completed) {
      triggerCelebration();
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPP');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Calculate days until a milestone
  const getDaysUntil = (dateString: string) => {
    try {
      const days = differenceInDays(parseISO(dateString), new Date());
      if (days < 0) return 'Past due';
      if (days === 0) return 'Today';
      return `${days} day${days !== 1 ? 's' : ''} from now`;
    } catch (error) {
      return 'Unknown';
    }
  };

  // Animation variants for the timeline
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Find the next milestone
  const nextMilestone = journey?.milestones.find(m => !m.completed);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md relative overflow-hidden">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center p-8 rounded-lg"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block"
              >
                <Trophy size={80} className="text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mt-4">
                Congratulations!
              </h2>
              <p className="text-white text-xl mt-2">
                {activeMilestone?.title} achieved!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Care Journey</h2>
        {journey && (
          <p className="text-gray-600">
            Journey started on {formatDate(journey.startDate)}
          </p>
        )}
        {nextMilestone && (
          <div className="mt-2 flex items-center">
            <div className="bg-primary-50 p-2 rounded-full">
              {React.createElement(icons[nextMilestone.icon], {
                className: "h-5 w-5 text-primary",
              })}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Next milestone: <span className="font-bold">{nextMilestone.title}</span></p>
              <p className="text-xs text-gray-500">{getDaysUntil(nextMilestone.date)}</p>
            </div>
          </div>
        )}
      </div>

      {journey && journey.milestones.length > 0 ? (
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline line */}
          <div className="absolute left-[25px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Milestones */}
          {journey.milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.id} 
              className="relative pl-12 pb-8 cursor-pointer"
              variants={itemVariants}
              onClick={() => handleMilestoneClick(milestone)}
            >
              {/* Milestone icon */}
              <div 
                className={`absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                  milestone.completed 
                    ? 'border-green-500 bg-green-100' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                {React.createElement(icons[milestone.icon], {
                  className: `h-6 w-6 ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`,
                })}
              </div>
              
              {/* Milestone content */}
              <div className={`p-4 rounded-lg ${
                milestone.completed 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <h3 className="text-lg font-semibold flex items-center">
                  {milestone.title}
                  {milestone.completed && (
                    <Check className="ml-2 h-5 w-5 text-green-500" />
                  )}
                </h3>
                <p className="text-gray-600 mt-1">{milestone.description}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">
                    {formatDate(milestone.date)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full ${
                    milestone.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.completed ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600">
            Your care journey will be displayed here as you progress through your care plan.
          </p>
        </div>
      )}
      
      {/* Add milestone button for demo purposes */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            if (journey && journey.milestones.length > 0) {
              // Mark the next incomplete milestone as completed
              const nextIncomplete = journey.milestones.find(m => !m.completed);
              if (nextIncomplete) {
                const updatedMilestones = journey.milestones.map(m => 
                  m.id === nextIncomplete.id ? { ...m, completed: true } : m
                );
                
                // Show toast
                toast({
                  title: "Milestone Achieved!",
                  description: `Congratulations on completing: ${nextIncomplete.title}`,
                  variant: "default",
                });
                
                // Trigger celebration if it's a celebration milestone
                if (nextIncomplete.celebration) {
                  setActiveMilestone(nextIncomplete);
                  triggerCelebration();
                }
              }
            }
          }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full flex items-center"
        >
          <Star className="mr-2 h-4 w-4" />
          Complete Next Milestone
        </button>
      </div>
    </div>
  );
}