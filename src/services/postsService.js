import api from './api';

export const postsService = {
  async getPosts(userId) {
    try {
      const response = await api.get(`/users/${userId}/posts.json`);
      const postsData = response.data;
      
      if (!postsData) {
        return [];
      }
      
      const posts = Object.keys(postsData).map(key => ({
        id: key,
        ...postsData[key]
      }));
      
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async createPost(userId, postData) {
    try {
      const newPost = {
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const response = await api.post(`/users/${userId}/posts.json`, newPost);
      
      return {
        id: response.data.name,
        ...newPost
      };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async updatePost(userId, postId, postData) {
    try {
      const updatedPost = {
        ...postData,
        updatedAt: new Date().toISOString(),
      };
      
      await api.put(`/users/${userId}/posts/${postId}.json`, updatedPost);
      
      return {
        id: postId,
        ...updatedPost
      };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  async deletePost(userId, postId) {
    try {
      await api.delete(`/users/${userId}/posts/${postId}.json`);
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  async getPost(userId, postId) {
    try {
      const response = await api.get(`/users/${userId}/posts/${postId}.json`);
      
      if (!response.data) {
        throw new Error('Post not found');
      }
      
      return {
        id: postId,
        ...response.data
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }
};