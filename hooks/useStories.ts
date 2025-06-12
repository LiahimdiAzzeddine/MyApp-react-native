import { useEffect, useState } from "react";
import axios from "axios";

export interface Story {
  id: number;
  title: string;
  image: string;
}

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchStories = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/stories/");
      setStories(response.data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { stories, loading, error };
};
