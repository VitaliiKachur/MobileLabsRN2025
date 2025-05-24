import * as FileSystem from 'expo-file-system';

export const APP_DATA_DIR = FileSystem.documentDirectory + 'AppData/';

export const initializeAppDataDirectory = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
      console.log('AppData directory created');
    }
  } catch (error) {
    console.error('Error initializing AppData directory:', error);
  }
};

export const getDirectoryContents = async (dirPath) => {
  try {
    const contents = await FileSystem.readDirectoryAsync(dirPath);
    const items = [];
    
    for (const item of contents) {
      const itemPath = dirPath + item;
      const info = await FileSystem.getInfoAsync(itemPath);
      
      items.push({
        name: item,
        isDirectory: info.isDirectory,
        size: info.size,
        modificationTime: info.modificationTime,
        uri: itemPath,
      });
    }
    
    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
};

export const createDirectory = async (dirPath, name) => {
  try {
    const newDirPath = dirPath + name;
    await FileSystem.makeDirectoryAsync(newDirPath);
    return true;
  } catch (error) {
    console.error('Error creating directory:', error);
    return false;
  }
};

export const createTextFile = async (dirPath, fileName, content = '') => {
  try {
    const filePath = dirPath + fileName;
    await FileSystem.writeAsStringAsync(filePath, content);
    return true;
  } catch (error) {
    console.error('Error creating file:', error);
    return false;
  }
};

export const readTextFile = async (filePath) => {
  try {
    const content = await FileSystem.readAsStringAsync(filePath);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

export const writeTextFile = async (filePath, content) => {
  try {
    await FileSystem.writeAsStringAsync(filePath, content);
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
};

export const deleteItem = async (itemPath) => {
  try {
    await FileSystem.deleteAsync(itemPath);
    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    return false;
  }
};

export const getStorageInfo = async () => {
  try {
    const totalSpace = await FileSystem.getTotalDiskCapacityAsync();
    const freeSpace = await FileSystem.getFreeDiskStorageAsync();
    const usedSpace = totalSpace - freeSpace;
    
    return {
      totalSpace,
      freeSpace,
      usedSpace,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return {
      totalSpace: 0,
      freeSpace: 0,
      usedSpace: 0,
    };
  }
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (fileName) => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

export const isTextFile = (fileName) => {
  const textExtensions = ['txt', 'md', 'json', 'js', 'jsx', 'ts', 'tsx', 'css', 'html', 'xml'];
  return textExtensions.includes(getFileExtension(fileName));
};