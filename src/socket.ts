import { io } from "socket.io-client";
import useStore from "./store";

export const setupSocket = () => {
  let socket;

  socket = io("https://asb.unstoppableswap.net", {
    path: "/api/socket.io",
  });

  socket.on("provider-refresh", useStore.getState().setProviderList);
};
