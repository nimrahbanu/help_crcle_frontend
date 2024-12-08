// useProfileStore.ts
import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProfileStore {
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  submitProfile: (formData: any, userId: string) => Promise<void>;
  resetMessages: () => void;
}

const useProfileStore = create<ProfileStore>()(
  devtools((set) => ({
    isLoading: false,
    successMessage: null,
    errorMessage: null,

    resetMessages: () => set({ successMessage: null, errorMessage: null }),

    submitProfile: async (formData, userId) => {

        
      set({ isLoading: true, successMessage: null, errorMessage: null });

      try {
        const response = await fetch('https://api.helpcircle.in/api/customer/profile-update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, user_id: userId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred during submission.');
        }

        if (data.success) {
          set({ successMessage: data.message || 'Profile updated successfully!' });
        } else {
          set({ errorMessage: data.message || 'Failed to update profile.' });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        set({ errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred.' });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useProfileStore;
