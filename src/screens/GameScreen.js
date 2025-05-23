import React, { useEffect, useState } from 'react'; 
import { View, StyleSheet, Alert } from 'react-native';
import GameCard from '../components/GameCard';
import { useGame } from '../context/GameContext';
import { useIsFocused } from '@react-navigation/native'; 

const GameScreen = ({ navigation }) => {
  const {
    score,
    tasks,
    progress,
    updateScore,
    updateProgress,
    updateTasks
  } = useGame();

  const isFocused = useIsFocused(); 

  const [allTasksCompletedAlertShown, setAllTasksCompletedAlertShown] = useState(false);

  const handleGesturePerformed = (gestureType) => {
    updateProgress(gestureType);
  };

  useEffect(() => {
    const updatedTasks = tasks.map(task => {
      const currentProgress = progress[task.type] || 0;
      const wasCompleted = task.completed;
      const isNowCompleted = currentProgress >= task.target;

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
    });

    updateTasks(updatedTasks);
  }, [progress]); 

  useEffect(() => {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;

    if (completedTasksCount === totalTasksCount && totalTasksCount > 0 && !allTasksCompletedAlertShown) {
      console.log('GameScreen: All tasks completed!');
      
      setAllTasksCompletedAlertShown(true); 

      setTimeout(() => {
        Alert.alert(
          '🏆 Вітаємо!',
          `Ви виконали всі завдання! Набрано очок: ${score}`,
          [
            { 
              text: 'Переглянути завдання', 
              onPress: () => {
                navigation.navigate('Tasks');
              } 
            },
            { 
              text: 'Продовжити гру', 
              style: 'default', 
              onPress: () => {
              } 
            }
          ]
        );
      }, 500);
    }
  }, [tasks, score, navigation, allTasksCompletedAlertShown]);

  useEffect(() => {
    const allTasksNotCompleted = tasks.every(task => !task.completed);
    if (allTasksNotCompleted && allTasksCompletedAlertShown) {
      setAllTasksCompletedAlertShown(false);
    }
  }, [tasks, allTasksCompletedAlertShown]);


  return (
    <View style={styles.container}>
      <GameCard
        score={score}
        onScoreChange={updateScore}
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