import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { loading, data, refetch };
};
