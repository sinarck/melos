import { AnimatePresence, motion } from "framer-motion";

const loadingMessages = [
  "Retrieving your snap — just a moment!",
  '"A cozy house with a bonfire and s\'mores..."',
  "Finding songs matching image vibe description",
  "Displaying your songs",
];

export default function LoadingAnimation({
  loadingMessageIndex,
}: {
  loadingMessageIndex: number;
}) {
  return (
    <div className="mt-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
      <AnimatePresence mode="wait">
        <motion.div
          key={loadingMessageIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.p
            className="text-white text-lg font-semibold"
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            {loadingMessages[loadingMessageIndex]}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
