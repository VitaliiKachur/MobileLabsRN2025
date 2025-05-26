import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { postsService } from '../services/postsService';

const CreatePostScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { userId } = useContext(AuthContext);
  const { post } = route.params || {};
  const isEditing = !!post;

  useEffect(() => {
    if (isEditing) {
      setTitle(post.title || '');
      setContent(post.content || '');
    }
  }, [isEditing, post]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    setIsLoading(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
      };

      if (isEditing) {
        await postsService.updatePost(userId, post.id, postData);
        Alert.alert('Success', 'Post updated successfully');
      } else {
        await postsService.createPost(userId, postData);
        Alert.alert('Success', 'Post created successfully');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'create'} post`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Post' : 'New Post'}
        </Text>
        
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter post title..."
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            autoFocus={!isEditing}
          />
          <Text style={styles.characterCount}>{title.length}/100</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write your post content here..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
          <Text style={styles.characterCount}>{content.length}/1000</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
    minWidth: 60,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontWeight: '500',
  },
  contentInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 200,
    maxHeight: 300,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
});

export default CreatePostScreen;