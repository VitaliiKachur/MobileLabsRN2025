import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase";

export const authService = {
  async signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async signOutUser() {
    try {
      await signOut(firebaseAuth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async resetUserPassword(email) {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteUserAccount(email, password) {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error("No authenticated user");

      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};