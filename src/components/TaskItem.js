import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task, progress }) => {
  const isCompleted = task.completed;
  const currentProgress = progress[task.type] || 0;
  const progressPercent = Math.min((currentProgress / task.target) * 100, 100);

  return (
    <View style={[styles.container, isCompleted && styles.completed]}>
      <View style={styles.header}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {task.title}
        </Text>
        <Text style={[styles.status, isCompleted && styles.completedStatus]}>
          {isCompleted ? '✅' : '⏳'}
        </Text>
      </View>
      
      <Text style={[styles.description, isCompleted && styles.completedText]}>
        {task.description}
      </Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${progressPercent}%` }]} 
          />
        </View>
        <Text style={[styles.progressText, isCompleted && styles.completedText]}>
          {currentProgress}/{task.target}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completed: {
    backgroundColor: '#f0f9ff',
    borderColor: '#22c55e',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  status: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  completedText: {
    color: '#22c55e',
  },
  completedStatus: {
    color: '#22c55e',
  },
});

export default TaskItem;