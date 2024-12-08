// src/hooks/useLogout.ts
'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        router.push('/login'); // Redirect to login page
        router.refresh(); // Refresh to ensure state is reset


      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout.');
    }
  };

  return handleLogout;
};
