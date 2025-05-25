import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestoreDb } from "../config/firebase";

export const userService = {
  async getUserProfile(userId) {
    try {
      console.log('Fetching profile for user:', userId);
      const userRef = doc(firestoreDb, "userProfiles", userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        console.log('Profile found:', docSnap.data());
        return { success: true, data: docSnap.data() };
      } else {
        console.log('Profile not found, will create new one');
        return { success: false, error: "User profile not found" };
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUserProfile(userId, profileData) {
    try {
      console.log('Updating profile for user:', userId, 'with data:', profileData);
      
      if (!userId) {
        throw new Error("User ID is required");
      }

      const userRef = doc(firestoreDb, "userProfiles", userId);
      
      const dataToSave = {
        ...profileData,
        updatedAt: serverTimestamp(),
        ...(profileData.createdAt ? {} : { createdAt: serverTimestamp() })
      };

      console.log('Attempting to save:', dataToSave);
      
      await setDoc(userRef, dataToSave, { merge: true });
      
      console.log('Profile updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      
      let errorMessage = error.message;
      if (error.code === 'permission-denied') {
        errorMessage = "Недостатньо дозволів для збереження даних. Перевірте налаштування Firebase.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Сервіс тимчасово недоступний. Спробуйте пізніше.";
      }
      
      return { success: false, error: errorMessage };
    }
  }
};