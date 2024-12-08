import { create } from 'zustand';

interface TransactionData {
  total_giving_help_count: number;
  total_receiving_help_count: number;
}

interface TransactionState {
  data: TransactionData | null;
  loading: boolean;
  error: string | null;
  fetchTransactions: (userId: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchTransactions: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('https://api.helpcircle.in/api/user-total-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const result = await response.json();

      if (result.success) {
        set({ data: result.data, loading: false });
      } else {
        set({ error: result.message || 'Failed to fetch data', loading: false });
      }
    } catch (error) {
      set({ error: 'An error occurred while fetching data', loading: false });
    }
  },
}));
