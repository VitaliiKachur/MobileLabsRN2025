import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getStorageInfo, formatBytes, initializeAppDataDirectory } from '../utils/filesSystem';

export default function HomeScreen({ navigation }) {
  const [storageInfo, setStorageInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await initializeAppDataDirectory();
      const storage = await getStorageInfo();
      setStorageInfo(storage);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося ініціалізувати застосунок');
    } finally {
      setLoading(false);
    }
  };

  const refreshStorageInfo = async () => {
    setLoading(true);
    const storage = await getStorageInfo();
    setStorageInfo(storage);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Ініціалізація...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Файловий менеджер</Text>
      
      <View style={styles.storageCard}>
        <Text style={styles.cardTitle}>Статистика пам'яті пристрою</Text>
        
        {storageInfo && (
          <View style={styles.storageInfo}>
            <View style={styles.storageRow}>
              <Text style={styles.storageLabel}>Загальний обсяг:</Text>
              <Text style={styles.storageValue}>{formatBytes(storageInfo.totalSpace)}</Text>
            </View>
            
            <View style={styles.storageRow}>
              <Text style={styles.storageLabel}>Вільний простір:</Text>
              <Text style={[styles.storageValue, styles.freeSpace]}>
                {formatBytes(storageInfo.freeSpace)}
              </Text>
            </View>
            
            <View style={styles.storageRow}>
              <Text style={styles.storageLabel}>Зайнятий простір:</Text>
              <Text style={[styles.storageValue, styles.usedSpace]}>
                {formatBytes(storageInfo.usedSpace)}
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${(storageInfo.usedSpace / storageInfo.totalSpace) * 100}%` 
                  }
                ]} 
              />
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={refreshStorageInfo}
        >
          <Text style={styles.refreshButtonText}>Оновити</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.fileManagerButton}
        onPress={() => navigation.navigate('FileManager')}
      >
        <Text style={styles.fileManagerButtonText}>Відкрити файловий менеджер</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  storageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  storageInfo: {
    marginBottom: 15,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storageLabel: {
    fontSize: 16,
    color: '#666',
  },
  storageValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  freeSpace: {
    color: '#4CAF50',
  },
  usedSpace: {
    color: '#FF9800',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF9800',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  fileManagerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  fileManagerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});