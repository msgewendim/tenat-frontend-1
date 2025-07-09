import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_API_URL } from '../utils/env.config';


export const useSocket = (room: string): { socket: Socket | null, isConnected: boolean } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(BASE_API_URL, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('joinRoom', room);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leaveRoom', room);
      newSocket.disconnect();
    };
  }, [room]);

  return { socket, isConnected };
};
