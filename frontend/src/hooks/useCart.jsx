import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const fetchCart = async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
};

export const useCart = (userId) => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["cart", userId], () => fetchCart(userId), {
    enabled: !!userId,
  });

  const addOrUpdateCart = useMutation(
    (product) => axios.post(`${API_URL}/cart`, { product, userId }),
    {
      onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    }
  );

  const removeFromCart = useMutation(
    (productId) => axios.delete(`${API_URL}/cart/${userId}/${productId}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    }
  );

  return { cartQuery, addOrUpdateCart, removeFromCart };
};
