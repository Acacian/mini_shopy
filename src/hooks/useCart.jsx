import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCart = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  const response = await axios.get(`http://localhost:3000/cart/${userId}`);
  return response.data;
};

export const useCart = (userId) => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["cart", userId], () => fetchCart(userId), {
    enabled: !!userId, // userId가 있을 때만 쿼리를 실행
  });

  console.log("Cart data:", cartQuery.data);

  const addOrUpdateCart = useMutation(
    (product) => axios.post(`http://localhost:3000/cart`, { product, userId }),
    {
      onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    }
  );

  const removeFromCart = useMutation(
    (productId) => axios.delete(`http://localhost:3000/cart/${userId}/${productId}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["cart", userId]),
    }
  );

  return { cartQuery, addOrUpdateCart, removeFromCart };
};
