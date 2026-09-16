import { create } from 'zustand';

interface BookingState {
  bookingData: any;
  isSubmitting: boolean;
  error: string | null;
  setBookingData: (data: any) => void;
  setSubmitting: (submitting: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useBooking = create<BookingState>((set) => ({
  bookingData: null,
  isSubmitting: false,
  error: null,
  setBookingData: (data) => set({ bookingData: data }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  reset: () => set({ bookingData: null, isSubmitting: false, error: null }),
}));

export default useBooking;
