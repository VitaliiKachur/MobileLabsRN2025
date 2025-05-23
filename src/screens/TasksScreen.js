import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  RefreshControl 
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { INITIAL_TASKS } from '../utils/constants';

const TasksScreen = ({ navigation }) => {
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
  const [refreshing, setRefreshing] = useState(false);

  const updateProgressFromStorage = () => {
    setProgress({
      clicks: Math.floor(Math.random() * 15),
      doubleClicks: Math.floor(Math.random() * 7),
      longPress: Math.floor(Math.random() * 2),
      drag: Math.floor(Math.random() * 2),
      swipeRight: Math.floor(Math.random() * 2),
      swipeLeft: Math.floor(Math.random() * 2),
      pinch: Math.floor(Math.random() * 2),
      score: Math.floor(Math.random() * 150),
    });
  };

  useEffect(() => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        completed: (progress[task.type] || 0) >= task.target,
      }))
    );
  }, [progress]);

  const onRefresh = () => {
    setRefreshing(true);
    updateProgressFromStorage();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };


  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const renderTaskItem = ({ item }) => (
    <TaskItem task={item} progress={progress} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Завдання</Text>
      <Text style={styles.subtitle}>
        Виконайте всі завдання, щоб стати майстром жестів!
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Виконано</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalTasks - completedTasks}</Text>
          <Text style={styles.statLabel}>Залишилось</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completionPercentage}%</Text>
          <Text style={styles.statLabel}>Прогрес</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${completionPercentage}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Завантаження завдань...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3b82f6']}
            tintColor="#3b82f6"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default TasksScreen;