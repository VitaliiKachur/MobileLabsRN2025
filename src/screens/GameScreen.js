import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import GameCard from '../components/GameCard';
import { INITIAL_TASKS } from '../utils/constants';

const GameScreen = ({ navigation }) => {
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

  // Update score and progress
  const handleScoreChange = (points) => {
    const newScore = score + points;
    setScore(newScore);
    
    setProgress(prev => ({
      ...prev,
      score: newScore,
    }));
  };

  // Update gesture progress
  const handleGesturePerformed = (gestureType) => {
    setProgress(prevProgress => {
      const newProgress = {
        ...prevProgress,
        [gestureType]: prevProgress[gestureType] + 1,
      };
      return newProgress;
    });
  };

  // Check and update completed tasks
  useEffect(() => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        const currentProgress = progress[task.type] || 0;
        const wasCompleted = task.completed;
        const isNowCompleted = currentProgress >= task.target;
        
        // Show completion alert for newly completed tasks
        if (!wasCompleted && isNowCompleted) {
          setTimeout(() => {
            Alert.alert(
              '🎉 Завдання виконано!',
              `Ви успішно виконали: "${task.title}"`,
              [{ text: 'Чудово!', style: 'default' }]
            );
          }, 100);
        }
        
        return {
          ...task,
          completed: isNowCompleted,
        };
      })
    );
  }, [progress]);

  // Check if all tasks are completed
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    
    if (completedTasks === totalTasks && totalTasks > 0) {
      setTimeout(() => {
        Alert.alert(
          '🏆 Вітаємо!',
          `Ви виконали всі завдання! Набрано очок: ${score}`,
          [
            { text: 'Переглянути завдання', onPress: () => navigation.navigate('Tasks') },
            { text: 'Продовжити гру', style: 'default' }
          ]
        );
      }, 500);
    }
  }, [tasks, score, navigation]);

  return (
    <View style={styles.container}>
      <GameCard
        score={score}
        onScoreChange={handleScoreChange}
        onGesturePerformed={handleGesturePerformed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});

export default GameScreen;