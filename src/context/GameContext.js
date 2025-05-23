import React, { createContext, useContext, useState } from 'react';
import { INITIAL_TASKS } from '../utils/constants';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [progress, setProgress] = useState({
    clicks: 0,
    doubleClicks: 0,
    longPress: 0,
    drag: 0,
    swipeRight: 0,
    swipeLeft: 0,
    pinch: 0,
    score: 0,
  });

  const updateScore = (points) => {
    const newScore = score + points;
    setScore(newScore);
    setProgress(prev => ({
      ...prev,
      score: newScore,
    }));
  };

  const updateProgress = (gestureType) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      [gestureType]: prevProgress[gestureType] + 1,
    }));
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const value = {
    score,
    tasks,
    progress,
    updateScore,
    updateProgress,
    updateTasks,
    setScore,
    setTasks,
    setProgress,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};