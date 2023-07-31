import create from "zustand";

export interface Provider {
  price: number;
  minSwapAmount: number;
  maxSwapAmount: number;
  uptime: number;
  age: number;
  multiAddr: string;
  peerId: string;
  testnet: boolean;
  relevancy: number;
}

const useStore = create((set) => ({
  providerList: null as (Provider[] | null),
  setProviderList: (list: Provider[]) => {
    const sortedList = list.sort((a, b) => {
      if (a.testnet && !b.testnet) return 1;
      if (!a.testnet && b.testnet) return -1;
      if (a.relevancy > b.relevancy) return -1;
      return 1;
    });

    // @ts-ignore
    set((state) => {
      return {
        providerList: sortedList,
        currentProvider: state.currentProvider
          ? sortedList.find((p) => p.peerId === state.currentProvider.peerId) ||
            sortedList[0]
          : sortedList[0], // Tries to find the same provider by peer id and falls back to first of list when no longer present
      };
    });
  },
}));

export default useStore;
