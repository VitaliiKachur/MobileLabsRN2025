import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { formatBytes, getFileExtension }  from '../utils/filesSystem';

export default function FileInfoScreen({ navigation, route }) {
  const { fileItem } = route.params;

  const getFileTypeDescription = () => {
    if (fileItem.isDirectory) {
      return 'Папка';
    }
    
    const extension = getFileExtension(fileItem.name);
    switch (extension) {
      case 'txt':
        return 'Текстовий файл';
      case 'js':
        return 'JavaScript файл';
      case 'jsx':
        return 'React компонент';
      case 'json':
        return 'JSON файл';
      case 'md':
        return 'Markdown файл';
      case 'css':
        return 'CSS файл';
      case 'html':
        return 'HTML файл';
      default:
        return extension ? `${extension.toUpperCase()} файл` : 'Файл';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Невідомо';
    const date = new Date(timestamp);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getFileIcon = () => {
    if (fileItem.isDirectory) {
      return '📁';
    }
    
    const extension = getFileExtension(fileItem.name);
    switch (extension) {
      case 'txt':
        return '📄';
      case 'js':
      case 'jsx':
        return '📜';
      case 'json':
        return '📋';
      case 'md':
        return '📝';
      case 'css':
        return '🎨';
      case 'html':
        return '🌐';
      default:
        return '📄';
    }
  };

  const InfoRow = ({ label, value, valueStyle }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.fileIcon}>{getFileIcon()}</Text>
          <Text style={styles.fileName}>{fileItem.name}</Text>
          <Text style={styles.fileType}>{getFileTypeDescription()}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Основна інформація</Text>
          
          <InfoRow 
            label="Назва файлу:" 
            value={fileItem.name} 
          />
          
          <InfoRow 
            label="Тип:" 
            value={getFileTypeDescription()} 
          />
          
          {!fileItem.isDirectory && (
            <InfoRow 
              label="Розширення:" 
              value={getFileExtension(fileItem.name) || 'Відсутнє'} 
            />
          )}
          
          <InfoRow 
            label="Розмір:" 
            value={fileItem.isDirectory ? 'Папка' : formatBytes(fileItem.size || 0)}
            valueStyle={!fileItem.isDirectory ? styles.sizeValue : null}
          />
          
          <InfoRow 
            label="Дата модифікації:" 
            value={formatDate(fileItem.modificationTime)} 
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Шлях до файлу</Text>
          <Text style={styles.pathText}>{fileItem.uri}</Text>
        </View>

        {!fileItem.isDirectory && (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Статистика</Text>
            
            <InfoRow 
              label="Розмір у байтах:" 
              value={(fileItem.size || 0).toLocaleString()} 
            />
            
            {fileItem.size && fileItem.size > 0 && (
              <>
                <InfoRow 
                  label="Розмір у KB:" 
                  value={(fileItem.size / 1024).toFixed(2)} 
                />
                
                {fileItem.size > 1024 * 1024 && (
                  <InfoRow 
                    label="Розмір у MB:" 
                    value={(fileItem.size / (1024 * 1024)).toFixed(2)} 
                  />
                )}
              </>
            )}
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
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
  scrollContainer: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  fileIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  fileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  fileType: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  sizeValue: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  pathText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});