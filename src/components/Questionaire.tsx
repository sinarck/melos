"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/LoadingAnimation";

const questions = [
  {
    id: 1,
    text: "Placeholder Question 1",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    id: 2,
    text: "Placeholder Question 2",
    options: ["Option A", "Option B", "Option C"],
  },
  {
    id: 3,
    text: "Placeholder Question 3",
    options: ["Choice X", "Choice Y", "Choice Z"],
  },
  {
    id: 4,
    text: "Placeholder Question 4",
    options: ["Pick 1", "Pick 2", "Pick 3"],
  },
  {
    id: 5,
    text: "Placeholder Question 5",
    options: ["Select A", "Select B", "Select C"],
  },
];

const blobColors = [
  "#3730a3",
  "#6b21a8",
  "#9d174d",
  "#4c1d95",
  "#5b21b6",
  "#7e22ce",
  "#6d28d9",
  "#8b5cf6",
  "#a78bfa",
];

const Blob = ({
  color,
  initialX,
  initialY,
}: {
  color: string;
  initialX: number;
  initialY: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-screen filter blur-xl"
      style={{
        background: color,
        width: `${30 + Math.random() * 20}vw`,
        height: `${30 + Math.random() * 20}vw`,
        opacity: 0.5 + Math.random() * 0.5,
      }}
      initial={{
        x: `${initialX}vw`,
        y: `${initialY}vh`,
      }}
      animate={{
        x: [
          `${initialX}vw`,
          `${(initialX + 30) % 100}vw`,
          `${(initialX + 60) % 100}vw`,
          `${initialX}vw`,
        ],
        y: [
          `${initialY}vh`,
          `${(initialY + 30) % 100}vh`,
          `${(initialY + 60) % 100}vh`,
          `${initialY}vh`,
        ],
        scale: [1, 1.1, 0.9, 1.2, 1],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

const Background = React.memo(() => {
  const getBlobPosition = (index: number) => {
    const positions = [
      { x: 5, y: 5 }, // top-left corner
      { x: 15, y: 15 }, // near top-left
      { x: 25, y: 10 }, // top area
      { x: 60, y: 15 }, // top-right
      { x: 30, y: 40 }, // middle-left
      { x: 70, y: 45 }, // middle-right
      { x: 10, y: 70 }, // bottom-left
      { x: 50, y: 75 }, // bottom-middle
      { x: 85, y: 80 }, // bottom-right
    ];
    return positions[index % positions.length];
  };

  return (
    <>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900" />
      {blobColors.map((color, index) => {
        const position = getBlobPosition(index);
        return (
          <Blob
            key={`blob-${index}`}
            color={color}
            initialX={position.x}
            initialY={position.y}
          />
        );
      })}
    </>
  );
});

Background.displayName = "Background";

export default function Questionnaire() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (selectedAnswer) {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
      setSelectedAnswer("");
    }
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleFinish = async () => {
    setIsLoading(true);
    setCurrentQuestion(0);
    setSelectedAnswer("");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/playground");
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gray-900">
      <Background />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingAnimation loadingMessageIndex={0} />
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full relative z-10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {questions[currentQuestion].text}
            </h2>
            <Select onValueChange={setSelectedAnswer} value={selectedAnswer}>
              <SelectTrigger className="w-full mb-4 bg-gray-800/80 text-white border-gray-700">
                <SelectValue placeholder="Select an answer" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/95 text-white border-gray-700 z-50">
                {questions[currentQuestion].options.map((option, index) => (
                  <SelectItem
                    key={index}
                    value={option}
                    className="hover:bg-gray-700 focus:bg-gray-700"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-4">
              <Button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex-1 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Back
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={handleFinish}
                  disabled={!selectedAnswer}
                  className="flex-1 bg-green-600 text-white hover:bg-green-500 transition-colors"
                >
                  Finish
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 transition-opacity"
                >
                  Next
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
