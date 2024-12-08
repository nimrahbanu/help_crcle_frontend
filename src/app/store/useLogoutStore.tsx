import { create } from 'zustand';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface GlobalState {
  logout: (router: any) => Promise<void>;
}

export const useGlobalStore = create<GlobalState>(() => ({
  logout: async (router) => {
    // Remove cookies
    Cookies.remove('token');
    Cookies.remove('user_id');
    Cookies.remove('name');

    // Ensure cookies are removed before navigating
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Redirect to login page
    router.push('/login');
    router.refresh();

    // Display success message
    toast.success('Logged Out Successfully!');
  },
}));
