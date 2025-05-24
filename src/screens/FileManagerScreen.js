import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FileItem from '../components/FileItem';
import InputModal from '../components/InputModal';
import {
  APP_DATA_DIR,
  getDirectoryContents,
  createDirectory,
  createTextFile,
  deleteItem,
  isTextFile,
}  from '../utils/filesSystem';

export default function FileManagerScreen({ navigation, route }) {
  const [currentPath, setCurrentPath] = useState(APP_DATA_DIR);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [showFileContentModal, setShowFileContentModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadDirectory();
    }, [currentPath])
  );

  const loadDirectory = async () => {
    setLoading(true);
    try {
      const contents = await getDirectoryContents(currentPath);
      setItems(contents);
    } catch (error) {
      console.error('Error loading directory:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити вміст папки');
    }
    setLoading(false);
  };

  const getBreadcrumb = () => {
    const relativePath = currentPath.replace(APP_DATA_DIR, '');
    if (relativePath === '') return 'AppData';
    return 'AppData/' + relativePath;
  };

  const canGoBack = () => {
    return currentPath !== APP_DATA_DIR;
  };

  const goBack = () => {
    if (canGoBack()) {
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/', currentPath.length - 2) + 1);
      setCurrentPath(parentPath);
    }
  };

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.uri + '/');
    } else if (isTextFile(item.name)) {
      navigation.navigate('FileViewer', {
        filePath: item.uri,
        fileName: item.name,
      });
    } else {
      Alert.alert('Інформація', 'Цей тип файлу не підтримується для перегляду');
    }
  };

  const handleItemLongPress = (item) => {
    const options = [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Інформація',
        onPress: () => navigation.navigate('FileInfo', { fileItem: item }),
      },
    ];

    if (!item.isDirectory && isTextFile(item.name)) {
      options.splice(1, 0, {
        text: 'Редагувати',
        onPress: () => navigation.navigate('FileEditor', {
          filePath: item.uri,
          fileName: item.name,
        }),
      });
    }

    options.push({
      text: 'Видалити',
      style: 'destructive',
      onPress: () => confirmDelete(item),
    });

    Alert.alert(item.name, 'Оберіть дію:', options);
  };

  const confirmDelete = (item) => {
    const itemType = item.isDirectory ? 'папку' : 'файл';
    const message = item.isDirectory 
      ? `Ви впевнені, що хочете видалити папку "${item.name}" та весь її вміст?\n\nЦю дію неможливо скасувати.`
      : `Ви впевнені, що хочете видалити файл "${item.name}"?\n\nЦю дію неможливо скасувати.`;

    Alert.alert(
      `Видалення ${itemType}`,
      message,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => handleDelete(item),
        },
      ]
    );
  };

  const handleDelete = async (item) => {
    const itemType = item.isDirectory ? 'папку' : 'файл';
    
    try {
      const success = await deleteItem(item.uri);
      if (success) {
        await loadDirectory(); 
        Alert.alert('Успіх', `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} видалено`);
      } else {
        Alert.alert('Помилка', `Не вдалося видалити ${itemType}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Помилка', `Помилка при видаленні ${itemType}`);
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const success = await createDirectory(currentPath, folderName);
      if (success) {
        setShowCreateFolderModal(false);
        await loadDirectory();
        Alert.alert('Успіх', `Папка "${folderName}" створена`);
      } else {
        Alert.alert('Помилка', 'Не вдалося створити папку');
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      Alert.alert('Помилка', 'Помилка при створенні папки');
    }
  };

  const handleCreateFileStep1 = (fileName) => {
    if (!fileName.endsWith('.txt')) {
      setNewFileName(fileName + '.txt');
    } else {
      setNewFileName(fileName);
    }
    setShowCreateFileModal(false);
    setShowFileContentModal(true);
  };

  const handleCreateFileStep2 = async (content) => {
    try {
      const success = await createTextFile(currentPath, newFileName, content);
      if (success) {
        setShowFileContentModal(false);
        setNewFileName('');
        await loadDirectory();
        Alert.alert('Успіх', `Файл "${newFileName}" створено`);
      } else {
        Alert.alert('Помилка', 'Не вдалося створити файл');
      }
    } catch (error) {
      console.error('Error creating file:', error);
      Alert.alert('Помилка', 'Помилка при створенні файлу');
    }
  };

  const renderFileItem = ({ item }) => (
    <FileItem
      item={item}
      onPress={handleItemPress}
      onLongPress={handleItemLongPress}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.breadcrumbContainer}>
          {canGoBack() && (
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>← Назад</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.breadcrumb}>{getBreadcrumb()}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowCreateFolderModal(true)}
          >
            <Text style={styles.actionButtonText}>+ Папка</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowCreateFileModal(true)}
          >
            <Text style={styles.actionButtonText}>+ Файл</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderFileItem}
          keyExtractor={(item) => item.uri}
          style={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Папка порожня</Text>
            </View>
          }
        />
      )}

      <InputModal
        visible={showCreateFolderModal}
        title="Створити папку"
        placeholder="Назва папки"
        onConfirm={handleCreateFolder}
        onCancel={() => setShowCreateFolderModal(false)}
      />

      <InputModal
        visible={showCreateFileModal}
        title="Створити файл"
        placeholder="Назва файлу (без розширення)"
        onConfirm={handleCreateFileStep1}
        onCancel={() => setShowCreateFileModal(false)}
      />

      <InputModal
        visible={showFileContentModal}
        title={`Вміст файлу "${newFileName}"`}
        placeholder="Введіть вміст файлу"
        multiline
        onConfirm={handleCreateFileStep2}
        onCancel={() => {
          setShowFileContentModal(false);
          setNewFileName('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  breadcrumb: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});