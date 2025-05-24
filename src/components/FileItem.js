import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatBytes, getFileExtension }  from 'utils/fileSystem';

export default function FileItem({ item, onPress, onLongPress }) {
  const getFileIcon = () => {
    if (item.isDirectory) {
      return '📁';
    }
    
    const extension = getFileExtension(item.name);
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
      default:
        return '📄';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress && onLongPress(item)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getFileIcon()}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.fileName} numberOfLines={1}>
          {item.name}
        </Text>
        
        <View style={styles.detailsContainer}>
          {!item.isDirectory && item.size !== undefined && (
            <Text style={styles.fileSize}>{formatBytes(item.size)}</Text>
          )}
          
          {item.modificationTime && (
            <Text style={styles.modificationDate}>
              {formatDate(item.modificationTime)}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.chevronContainer}>
        <Text style={styles.chevron}>
          {item.isDirectory ? '›' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  modificationDate: {
    fontSize: 12,
    color: '#666',
  },
  chevronContainer: {
    width: 20,
    alignItems: 'center',
  },
  chevron: {
    fontSize: 18,
    color: '#ccc',
  },
});