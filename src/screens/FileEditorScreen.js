import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { readTextFile, writeTextFile, deleteItem } from '../utils/filesSystem'; 

export default function FileEditorScreen({ navigation, route }) {
  const { filePath, fileName } = route.params;
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = useCallback(async () => {
    if (!hasChanges || saving) return;

    setSaving(true);
    try {
      const success = await writeTextFile(filePath, content);
      
      if (success) {
        setOriginalContent(content);
        Alert.alert('Успіх', 'Файл збережено');
      } else {
        Alert.alert('Помилка', 'Не вдалося зберегти файл');
      }
    } catch (error) {
      console.error('Error saving file:', error);
      Alert.alert('Помилка', 'Помилка при збереженні файлу');
    }
    setSaving(false);
  }, [hasChanges, saving, filePath, content]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Видалення файлу',
      `Ви впевнені, що хочете видалити файл "${fileName}"?\n\nЦю дію неможливо скасувати.`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Видалити', 
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              const success = await deleteItem(filePath);
              
              if (success) {
                Alert.alert(
                  'Успіх', 
                  'Файл видалено',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.goBack()
                    }
                  ]
                );
              } else {
                Alert.alert('Помилка', 'Не вдалося видалити файл');
                setDeleting(false);
              }
            } catch (error) {
              console.error('Error deleting file:', error);
              Alert.alert('Помилка', 'Помилка при видаленні файлу');
              setDeleting(false);
            }
          }
        },
      ]
    );
  }, [filePath, fileName, navigation]);

  const handleBack = useCallback(() => {
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
  }, [hasChanges, handleSave, navigation]);

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
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            style={[styles.headerButton, styles.deleteHeaderButton]}
            onPress={handleDelete}
            disabled={deleting}
          >
            <Text style={[
              styles.deleteButtonText,
              deleting && styles.disabledText
            ]}>
              {deleting ? 'Видалення...' : 'Видалити'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
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
        </View>
      ),
    });
  }, [navigation, fileName, hasChanges, saving, deleting, handleBack, handleSave, handleDelete]);

  useEffect(() => {
    loadFileContent();
  }, [filePath]);

  useEffect(() => {
    setHasChanges(content !== originalContent && originalContent !== '');
  }, [content, originalContent]);

  const loadFileContent = async () => {
    setLoading(true);
    try {
      console.log('Loading file from path:', filePath); 
      const fileContent = await readTextFile(filePath);
      console.log('File content loaded:', fileContent !== null);
      
      if (fileContent !== null) {
        setContent(fileContent);
        setOriginalContent(fileContent);
      } else {
        Alert.alert('Помилка', 'Не вдалося прочитати файл');
      }
    } catch (error) {
      console.error('Error loading file:', error);
      Alert.alert('Помилка', 'Помилка при завантаженні файлу: ' + error.message);
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

  if (deleting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
        <Text style={styles.loadingText}>Видалення файлу...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        <TextInput
          style={styles.textInput}
          value={content}
          onChangeText={(text) => {
            console.log('Text changed, length:', text.length); 
            setContent(text);
          }}
          multiline
          placeholder="Введіть текст..."
          placeholderTextColor="#999"
          textAlignVertical="top"
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          editable={true} 
          selectTextOnFocus={false}
          blurOnSubmit={false}
          onFocus={() => console.log('TextInput focused')}
          onBlur={() => console.log('TextInput blurred')}
        />
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
            styles.deleteFooterButton,
          ]}
          onPress={handleDelete}
          disabled={deleting}
        >
          <Text style={[
            styles.deleteFooterButtonText,
            deleting && styles.disabledButtonText
          ]}>
            {deleting ? 'Видалення...' : 'Видалити'}
          </Text>
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
    </KeyboardAvoidingView>
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
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    textAlignVertical: 'top',
    paddingTop: 0,
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
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  saveFooterButton: {
    backgroundColor: '#4CAF50',
  },
  deleteFooterButton: {
    backgroundColor: '#FF3B30',
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
  deleteFooterButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  disabledButtonText: {
    color: '#999',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 16,
  },
  deleteHeaderButton: {
    marginRight: 8,
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
  deleteButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  saveButtonText: {
    color: 'white',
  },
  disabledText: {
    color: '#999',
  },
});