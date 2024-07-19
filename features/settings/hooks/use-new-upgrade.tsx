import { create } from "zustand";

type NewUpgradeState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewUpgrade = create<NewUpgradeState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
