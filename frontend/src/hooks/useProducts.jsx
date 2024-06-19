import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const fetchProducts = async ({ pageParam = "", limit = 4 }) => {
  const response = await axios.get(`${apiUrl}/database/products?page=${pageParam}&limit=${limit}`);
  return response.data;
};

export const useProducts = () => {
  return useInfiniteQuery(
    ["products"],
    ({ pageParam = "" }) => fetchProducts({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );
};
