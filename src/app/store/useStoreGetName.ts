import { create } from 'zustand';

// Define the shape of your store's state
interface CustomerStoreState {
  sponsor_name: string;
  load: boolean;
  err: string | null;
  fetchCustomerName: (user_id: string) => Promise<void>;
}

// Define your Zustand store with TypeScript types
const useCustomerStore = create<CustomerStoreState>((set) => ({
  sponsor_name: '',
  load: false,
  err: null,

  // Action to fetch name by customer ID
  fetchCustomerName: async (user_id: string) => {
    set({ load: true, err: null });

    try {
      const response = await fetch('https://api.helpcircle.in/api/customer/get-name-by-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id, // Use the user_id as the key in the payload
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer name');
      }

      const data = await response.json();

      if (data.success) {
        set({ sponsor_name: data.data, load: false });
      } else {
        set({ err: 'Failed to retrieve customer name', load: false });
      }
    } catch (error) {
      set({ err: error instanceof Error ? error.message : 'An error occurred', load: false });
    }
  },
}));

export default useCustomerStore;
