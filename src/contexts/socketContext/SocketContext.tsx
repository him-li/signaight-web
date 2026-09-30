"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_SOCKET_URL, SOCKET_SECURE } from "@/constants";
import { getTokenSelector } from "@/store/authSlice/auth.slice";
import { useAppSelector } from "@/store/store";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onEvent: <T>(event: string, callback: (data: T) => void) => void;
  offEvent: (event: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onEvent: () => {},
  offEvent: () => {},
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listeners = useRef(new Map<string, (...args: any[]) => void>());
  const token = useAppSelector(getTokenSelector);

  useEffect(() => {
    if (token) {
      const socket = io(SERVER_SOCKET_URL, {
        path: "/api/v1/ws/socket.io/",
        transports: ["websocket", "polling"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        auth: token as any,
        secure: SOCKET_SECURE,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Connected");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected");
        setIsConnected(false);
      });
      return () => {
        listeners.current.forEach((cb, event) => {
          socket.off(event, cb);
        });
        socket.disconnect();
      };
    }
  }, [token]);

  const onEvent = useCallback(
    <T,>(event: string, callback: (data: T) => void) => {
      const socket = socketRef.current;
      if (!socket) return;

      const wrappedCallback = (data: T) => callback(data);
      listeners.current.set(event, wrappedCallback);
      socket.on(event, wrappedCallback);
    },
    [],
  );

  const offEvent = useCallback((event: string) => {
    const socket = socketRef.current;
    const cb = listeners.current.get(event);
    if (socket && cb) {
      socket.off(event, cb);
      listeners.current.delete(event);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, isConnected, onEvent, offEvent }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
