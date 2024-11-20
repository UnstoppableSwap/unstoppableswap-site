import { io } from "socket.io-client";
import useStore from "./store";

async function fetchProviders() {
  fetch("https://api.unstoppableswap.net/api/list")
    .then(response => response.json())
    .then(providers => useStore.getState().setProviderList(providers))
    .catch(error => console.error("Failed to fetch providers:", error));
}

export function setupPeriodicAPIFetch() {
  // Initial fetch
  fetchProviders();

  // Set up interval to fetch every minute
  const interval = setInterval(fetchProviders, 60000);

  // Clean up interval on unmount
  return () => clearInterval(interval);
}
