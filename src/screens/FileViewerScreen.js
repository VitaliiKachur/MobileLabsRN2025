import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { readTextFile }  from '../utils/filesSystem';

export default function FileViewerScreen({ navigation, route }) {
  const { filePath, fileName } = route.params;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: fileName,
      headerRight: () => (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('FileEditor', { filePath, fileName })}
        >
          <Text style={styles.editButtonText}>Редагувати</Text>
        </TouchableOpacity>
      ),
    });

    loadFileContent();
  }, [filePath, fileName, navigation]);

  const loadFileContent = async () => {
    setLoading(true);
    const fileContent = await readTextFile(filePath);
    if (fileContent !== null) {
      setContent(fileContent);
    } else {
      Alert.alert('Помилка', 'Не вдалося прочитати файл');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Завантаження файлу...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fileName}>📄 {fileName}</Text>
        <Text style={styles.fileInfo}>Режим перегляду</Text>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>
          {content || 'Файл порожній'}
        </Text>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.footerButtonText}>Назад</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.footerButton, styles.editFooterButton]}
          onPress={() => navigation.navigate('FileEditor', { filePath, fileName })}
        >
          <Text style={styles.editFooterButtonText}>Редагувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  fileInfo: {
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'monospace',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  editFooterButton: {
    backgroundColor: '#007AFF',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  editFooterButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  editButton: {
    marginRight: 16,
  },
  editButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});