"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useQuizContext } from "../QuizContext";
import { Button, Typography, Container, Box } from "@mui/material";

const QuizResult = () => {
  const { questions, score, selectedAnswers, resetQuiz } = useQuizContext();
  const router = useRouter();

  const handleRestart = () => {
    resetQuiz(); // Reset quiz state
    router.push("/quiz"); // Navigate to quiz page
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz Results
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your score: {score} out of {questions.length}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {questions.map((question, idx) => {
          const userAnswer = selectedAnswers.find(
            (ans) => ans.questionIndex === idx
          )?.selectedAnswer;

          return (
            <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="body1">
                <strong>Q{idx + 1}: {question.question}</strong>
              </Typography>
              <Typography variant="body2">
                Your answer: <strong>{userAnswer || "Not answered"}</strong>
              </Typography>
              <Typography
                variant="body2"
                color={userAnswer === question.correct_answer ? "green" : "red"}
              >
                Correct answer: <strong>{question.correct_answer}</strong>
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleRestart}>
        Take the Quiz Again
      </Button>
    </Container>
  );
};

export default QuizResult;