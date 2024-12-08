import { create } from 'zustand';
import toast from 'react-hot-toast';

// Define the interface for the store's state and actions
interface UpdatePasswordState {
    loading: boolean;
    error: string | null;
    success: boolean;
    validationErrors: Record<string, string[]>; // Store detailed validation errors
    updatePassword: (data: PasswordUpdateValues) => Promise<void>;
    reset: () => void; // Reset the state
}

// Interface for the password update form values
interface PasswordUpdateValues {
    user_id: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

// Create the zustand store
export const usePasswordUpdateStore = create<UpdatePasswordState>((set) => ({
    loading: false,
    error: null,
    success: false,
    validationErrors: {},

    updatePassword: async (data) => {
        set({ loading: true, error: null, success: false, validationErrors: {} }); // Reset state before making the request

        try {
            // Call the API to perform login using fetch
            const response = await fetch('https://api.helpcircle.in/api/customer/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // Check if the API call was successful
            if (!response.ok) {
                if (result.validationErrors) {
                    // Set validation errors if provided by the API
                    set({ validationErrors: result.validationErrors });
                } else {
                    // Set a general error message if no validation errors
                    set({ error: result.message || 'Update failed' });
                }
            } else {
                // Set the success state if login is successful
                if (result.success === true) {
                    // Check if result.data and result.data.token exist
                    if (result.data && result.data.token) {
                        console.log(result.data.token); // Access token safely
                    }

                    set({ success: true });
                    toast.success(result.message);
                } else {
                    set({ error: result.message || 'Update failed' });
                }
            }
        } catch (error: any) {
            // Catch and set any unexpected errors
            set({ error: error.message });
        } finally {
            // Always set loading to false after the API call
            set({ loading: false });
        }
    },

    // Reset the state to its initial values
    reset: () =>
        set({
            loading: false,
            error: null,
            success: false,
            validationErrors: {},
        }),
}));
