// stores/userStore.ts
import { create } from 'zustand';

// Define the types for your store's state and actions
interface UserStoreState {
  userId: string | null; // userId can be a string or null initially
  setUserId: (id: string) => void; // Function to set the userId
  clearUserId: () => void; // Function to clear the userId
}

// Create Zustand store with the type definition
const useUserStore = create<UserStoreState>((set) => ({
  userId: null, // Initially no user_id
  setUserId: (id: string) => set({ userId: id }), // Function to set the user_id
  clearUserId: () => set({ userId: null }), // Function to clear the user_id
}));

export default useUserStore;
