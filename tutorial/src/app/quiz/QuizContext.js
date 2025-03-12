"use client";
import React, { createContext, useState, useContext } from "react";
import quizData from "./quizQuestion.json";

// Create QuizContext
const QuizContext = createContext();

// Custom hook to access quiz context
export const useQuizContext = () => useContext(QuizContext);

// QuizContextProvider component that manages the quiz state
export const QuizContextProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Function to handle answering a question
  const answerQuestion = (answer) => {
    // Save the selected answer
    setSelectedAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionIndex: currentQuestionIndex, selectedAnswer: answer },
    ]);

    // Check if answer is correct and update score
    // Using correct_answer instead of correctAnswer
    if (answer === quizData[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      console.log(`Correct answer! New score: ${score + 1}`); // Debugging
    } else {
      console.log(`Incorrect. Answer was: ${quizData[currentQuestionIndex].correct_answer}`); // Debugging
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // This is the last question
      setIsQuizCompleted(true);
    }
  };

  // Add a debugging function to view your data structure
  const debugQuizData = () => {
    console.log("First question:", quizData[0]);
    console.log("correct_answer field exists:", quizData[0].hasOwnProperty("correct_answer"));
    return quizData[0];
  };

  // Function to reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setIsQuizCompleted(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions: quizData,
        currentQuestionIndex,
        answerQuestion,
        isQuizCompleted,
        score,
        selectedAnswers,
        resetQuiz,
        debugQuizData, // Include for debugging
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};