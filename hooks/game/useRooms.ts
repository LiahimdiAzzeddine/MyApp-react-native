import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://192.168.11.119:3001"; // 👉 remplace par ton IP LAN quand tu testes sur mobile

// Typages
export interface Room {
  id: string;
  players: string[];
}

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch all rooms
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get<Room[]>(`${API_URL}/rooms`);
      setRooms(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Create a new room
const createRoom = useCallback(
  async (playerName: string, maxPlayers: number) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/rooms`, { playerName, maxPlayers });
      await fetchRooms();
      return res.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },
  [fetchRooms]
);


  // 🔹 Join a room
  const joinRoom = useCallback(async (roomId: string, playerName: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/rooms/${roomId}/join`, { playerName });
      await fetchRooms();
      return res.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);

  // 🔹 Leave a room
  const leaveRoom = useCallback(async (roomId: string, playerName: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/rooms/${roomId}/leave`, { playerName });
      await fetchRooms();
      return res.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);

  // 🔹 Delete a room
  const deleteRoom = useCallback(async (roomId: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API_URL}/rooms/${roomId}`);
      await fetchRooms();
      return res.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRooms]);

   // 🔹 Get a room by ID
  const getRoomById = useCallback(
    async (roomId: string) => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/rooms/${roomId}`);
        return res.data;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    deleteRoom,
    getRoomById
  };
}
