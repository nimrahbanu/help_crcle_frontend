import { create } from 'zustand';
import { FormValues } from '../components/auth/RegisterForm';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface ApiState {
  loading: boolean;
  error: string | null;
  success: boolean;
  validationErrors: Record<string, string[]>; // Store detailed validation errors
  create_account: (data: FormValues) => Promise<void>;
  reset: () => void; // Action to reset the state
}

export const useRegisterStore = create<ApiState>((set) => ({
  loading: false,
  error: null,
  success: false,
  validationErrors: {}, // Initialize validation errors

  // Function to create an account
  create_account: async (data: FormValues) => {
    set({ loading: true, error: null, success: false, validationErrors: {} });

    try {
      const response = await fetch('https://api.helpcircle.in/api/customer/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        // Parse response as JSON
        const result = await response.json();

        console.log("Responce", result)

        if (!response.ok || !result.success) {
          if (result.validationErrors) {
            set({ validationErrors: result.validationErrors });
          } else {
            set({ error: result.message || 'Failed to create account' });
          }
        } else {
          set({ success: true });

          // Save the token in cookies for middleware access
          if (result.data?.token && result.data?.user_id) {
            const token = result.data.token;

            // Save the token and user_id in cookies
            Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'Lax' });

            if (result.data?.user_id && result.data?.name) {
              Cookies.set('user_id', result.data.user_id, { expires: 7, path: '/', sameSite: 'Lax' });

              Cookies.set('name', result.data.name, { expires: 7, path: '/', sameSite: 'Lax' });
            }

            { toast.success(result.message) }


          }





        }
      } else {
        // Handle non-JSON response
        const rawResponse = await response.text(); // Capture raw response for debugging
        console.error('Non-JSON response:', rawResponse); // Log non-JSON response

        throw new Error('Unknown Error');
      }
    } catch (error: any) {
      // Catch any other errors and set them in the state
      set({ error: error.message || 'An unexpected error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  // Reset function to reset the state to its initial values
  reset: () => set({
    loading: false,
    error: null,
    success: false,
    validationErrors: {},
  }),
}));
