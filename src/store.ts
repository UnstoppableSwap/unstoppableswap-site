import create from "zustand";

export interface Provider {
  price: number;
  minSwapAmount: number;
  maxSwapAmount: number;
  uptime: number;
  age: number;
  multiAddr: string;
  testnet: boolean;
  relevancy: number;
}

const useStore = create((set) => ({
  providerList: [],
  setProviderList: (list: Provider[]) => {
    const sortedList = list.sort((a, b) => {
      if(a.testnet && !b.testnet) return 1;
      if(a.relevancy > b.relevancy) return -1;
      return 1;
    })

    // @ts-ignore
    set((state) => {
      return {
        providerList: sortedList,
        currentProvider: state.currentProvider
          ? sortedList.find((p) => p.multiAddr === state.currentProvider.multiAddr) ||
            sortedList[0]
          : sortedList[0], // Tries to find the same provider by peer id and falls back to first of list when no longer present
      };
    });
  },
  currentProvider: undefined,
  // @ts-ignore
  setCurrentProvider: (provider: Provider) => set({ currentProvider: provider }),
}));

export default useStore;
