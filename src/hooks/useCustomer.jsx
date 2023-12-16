import { create } from 'zustand';

const useCustomer = create((set) => ({
  customer: {},
  // setCustomer: (customer) => set({ customer }),
  setCustomer: (newCustomer) => set((prevState) => ({customer: { ...prevState.customer, ...newCustomer } })),
}));

export default useCustomer;