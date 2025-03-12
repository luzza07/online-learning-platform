"use client";
import { useRouter } from "next/navigation";
import { Button, Typography, Container, Box } from "@mui/material";
import { useQuizContext } from "./QuizContext";
import React, { useEffect } from "react";

// This component must be a function component that returns JSX
export default function QuizPage() {
  const {
    questions,
    currentQuestionIndex,
    answerQuestion,
    isQuizCompleted,
    score,
  } = useQuizContext();

  const router = useRouter();

  // Navigate to results when quiz is completed
  useEffect(() => {
    if (isQuizCompleted) {
      console.log("Quiz completed, navigating to results...");
      router.push("/quiz/result");
    }
  }, [isQuizCompleted, router]);

  // Safety handling for loading state
  if (!questions || questions.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={{ mt: 2 }}>Loading questions...</Typography>
      </Container>
    );
  }

  // If quiz is completed but we're still on this page for some reason,
  // provide a manual navigation button
  if (isQuizCompleted) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quiz completed! Your score: {score}/{questions.length}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/quiz/result")}
          sx={{ mt: 2 }}
        >
          View Results
        </Button>
      </Container>
    );
  }

  // Current question display
  return (
    <Container>
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Score: {score}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        {questions[currentQuestionIndex].question}
      </Typography>

      {questions[currentQuestionIndex].options.map((option, index) => (
        <Button
          key={index}
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mb: 2, py: 1.5, justifyContent: "flex-start", px: 3 }}
          onClick={() => answerQuestion(option)}
        >
          {option}
        </Button>
      ))}
    </Container>
  );
}
