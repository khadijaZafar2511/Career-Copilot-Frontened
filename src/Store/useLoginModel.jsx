import { create } from "zustand";

export const  useLoginModal = create((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal:()=>set({isOpen:false})
}));