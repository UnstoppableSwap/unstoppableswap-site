import create from "zustand";

export interface Provider {
  price: number;
  minSwapAmount: number;
  maxSwapAmount: number;
  uptime?: number;
  age?: number;
  multiAddr: string;
  testnet: boolean;
}

const useStore = create((set) => ({
  providerList: [],
  setProviderList: (list: Provider[]) => {
    // @ts-ignore
    set((state) => {
      return {
        providerList: list,
        currentProvider: state.currentProvider
          ? list.find((p) => p.multiAddr === state.currentProvider.multiAddr) ||
            list[0]
          : list[0], // Tries to find the same provider by peer id and falls back to first of list when no longer present
      };
    });
  },
  currentProvider: undefined,
  // @ts-ignore
  setCurrentProvider: (provider: any) => set({ currentProvider: provider }),
}));

export default useStore;
