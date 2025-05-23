import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import UserLayout from "@/components/UserLayout";
import { motion } from "framer-motion";
import CareJourneyTimeline from "@/components/CareJourneyTimeline";

export default function CareJourney() {
  const { user } = useAuth();

  return (
    <UserLayout>
      <Helmet>
        <title>Your Care Journey | Super Health Care</title>
        <meta
          name="description"
          content="Track your personalized care journey with Super Health Care and celebrate your milestones."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-6xl mx-auto py-8 px-4"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Your Care Journey</h1>
          <p className="text-gray-600">
            Track your progress and celebrate milestones in your personalized care plan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <CareJourneyTimeline />
        </div>
      </motion.div>
    </UserLayout>
  );
}