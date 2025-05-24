import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { readTextFile, writeTextFile }  from '../utils/filesSystem';

export default function FileEditorScreen({ navigation, route }) {
  const { filePath, fileName } = route.params;
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Редагування: ${fileName}`,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
        >
          <Text style={styles.headerButtonText}>Назад</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[styles.headerButton, hasChanges && styles.saveButton]}
          onPress={handleSave}
          disabled={!hasChanges || saving}
        >
          <Text style={[
            styles.headerButtonText,
            hasChanges && styles.saveButtonText,
            (!hasChanges || saving) && styles.disabledText
          ]}>
            {saving ? 'Збереження...' : 'Зберегти'}
          </Text>
        </TouchableOpacity>
      ),
    });

    loadFileContent();
  }, [filePath, fileName, navigation, hasChanges, saving]);

  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  const loadFileContent = async () => {
    setLoading(true);
    const fileContent = await readTextFile(filePath);
    if (fileContent !== null) {
      setContent(fileContent);
      setOriginalContent(fileContent);
    } else {
      Alert.alert('Помилка', 'Не вдалося прочитати файл');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!hasChanges || saving) return;

    setSaving(true);
    const success = await writeTextFile(filePath, content);
    
    if (success) {
      setOriginalContent(content);
      Alert.alert('Успіх', 'Файл збережено');
    } else {
      Alert.alert('Помилка', 'Не вдалося зберегти файл');
    }
    setSaving(false);
  };

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Незбережені зміни',
        'У вас є незбережені зміни. Що ви хочете зробити?',
        [
          { text: 'Скасувати', style: 'cancel' },
          { 
            text: 'Не зберігати', 
            style: 'destructive',
            onPress: () => navigation.goBack()
          },
          {
            text: 'Зберегти',
            onPress: async () => {
              await handleSave();
              navigation.goBack();
            }
          },
        ]
      );
    } else {
      navigation.goBack();
    }
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
        <Text style={styles.fileName}>📝 {fileName}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.fileInfo}>Режим редагування</Text>
          {hasChanges && (
            <Text style={styles.changesIndicator}>• Незбережені зміни</Text>
          )}
        </View>
      </View>
      
      <View style={styles.editorContainer}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.textInput}
            value={content}
            onChangeText={setContent}
            multiline
            placeholder="Введіть текст..."
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleBack}
        >
          <Text style={styles.footerButtonText}>Назад</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.footerButton,
            styles.saveFooterButton,
            (!hasChanges || saving) && styles.disabledButton
          ]}
          onPress={handleSave}
          disabled={!hasChanges || saving}
        >
          <Text style={[
            styles.saveFooterButtonText,
            (!hasChanges || saving) && styles.disabledButtonText
          ]}>
            {saving ? 'Збереження...' : 'Зберегти'}
          </Text>
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInfo: {
    fontSize: 14,
    color: '#666',
  },
  changesIndicator: {
    fontSize: 14,
    color: '#FF9800',
    marginLeft: 8,
    fontWeight: '500',
  },
  editorContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 0,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'monospace',
    padding: 16,
    minHeight: 200,
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
  saveFooterButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveFooterButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  disabledButtonText: {
    color: '#999',
  },
  headerButton: {
    paddingHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  saveButtonText: {
    color: 'white',
  },
  disabledText: {
    color: '#999',
  },
});