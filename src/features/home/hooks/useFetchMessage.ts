import { useCallback, useState } from "react";
import axios from "axios";

export type Message = {
  id: string;
  sender: string;
  sentTime: string;
  title: string;
  priority: "緊急" | "高" | "中" | "低";
}

export const useFetchMessage = () => {
  const [data, setData] = useState<Message>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const decodeFromBase64 = (base64Str: string): Message | null => {
    try {
      const jsonStr = decodeURIComponent(escape(window.atob(base64Str)));
      const decodedMessage: Message = JSON.parse(jsonStr);
      return decodedMessage;
    } catch (error) {
      console.error("Error decoding Base64:", error);
      return null;
    }
  };

  const fetchRequest = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/index/${id}`);

      const decodedData = decodeFromBase64(res.data)

      setData(decodedData!);
      setLoading(false);
      setError(null);
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (axios.isAxiosError(e)) {
        setError(e.message);
      }
    }
  },[])

  return { data, loading, error, fetchRequest };
};
