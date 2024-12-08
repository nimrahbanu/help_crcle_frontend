// src/store/usePinStore.ts
import {create} from 'zustand';
import { toast } from 'react-hot-toast';
import Api, { ApiResponse } from '../utils/Api';

interface PinStore {
  totalAvailablePin: number | null;
  fetchTotalPins: (userId: string) => Promise<void>;
}

export const usePinStore = create<PinStore>((set) => ({
  totalAvailablePin: null,
  fetchTotalPins: async (userId: string) => {
    try {
      const response: ApiResponse<number> = await Api.post<number>(
        'customer/total-available-pin',
        { user_id: userId }
      );

      if (response.success) {
        console.log("data",response.data)
        set({ totalAvailablePin: response.data || null });
        toast.success(`Total Available Pins: ${response.data}`); // Show success toast
      } else {
        toast.error('Failed to retrieve total pins.'); // Show error toast
      }
    } catch (err) {
      toast.error(`Error: ${err instanceof Error ? err.message : 'An unknown error occurred.'}`);
    }
  },
}));
