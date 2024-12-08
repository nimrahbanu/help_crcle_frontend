import { create } from 'zustand';
import { LoginFormValues } from '../components/auth/loginForm';
import toast from 'react-hot-toast';

import Cookies from 'js-cookie';

interface ApiState {
  loading: boolean;
  error: string | null;
  success: boolean;
  validationErrors: Record<string, string[]>; // Store detailed validation errors
  login: (data: LoginFormValues) => Promise<void>;
  reset: () => void; // Action to reset the state
}

export const useLoginStore = create<ApiState>((set) => ({
  loading: false,
  error: null,
  success: false,
  validationErrors: {}, // Initialize validation errors

  // Function to handle login
  login: async (data) => {
    set({ loading: true, error: null, success: false, validationErrors: {} }); // Reset state before making the request

    try {
      // Call the API to perform login using fetch
      const response = await fetch('https://api.helpcircle.in/api/customer/login', {
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
          set({ error: result.message || 'Login failed' });
        }
      } else {
        // Set the success state if login is successful

        if(result.success){

          set({ success: true });


  
  
  
          // Save the token in cookies for middleware access
          if (result.data?.token && result.data?.user_id) {
            const token = result.data.token;
          
            // Save the token and user_id in cookies
            Cookies.set('token', token, { expires: 7 });

            if (result.data?.user_id && result.data?.name ) {
              Cookies.set('user_id', result.data.user_id, { expires: 7, path: '/', sameSite: 'Lax' });

              Cookies.set('name', result.data.name, { expires: 7, path: '/', sameSite: 'Lax' });
            }

            { toast.success(result.message) }

            
          }
          
  

        }

        
      



      }

      if(!result.success && result.message){


          set({ error: result.message || 'Login failed' });



      }
    } catch (error: any) {
      // Catch and set any unexpected errors
      set({ error: error.message });
    } finally {
      // Always set loading to false after the API call
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
