import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async ({ pageParam = 0 }) => {
  const response = await axios.get(`http://localhost:3000/products`, {
    params: { page: pageParam, limit: 4 },
  });
  return response.data;
};

export const useProducts = () => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["products"], fetchProducts, {
    getNextPageParam: (lastPage, allPages) => {
      // 예제 로직: lastPage에 nextPage 정보가 포함되어 있다고 가정
      return lastPage.nextPage ?? false;
    },
  });

  return {
    productsQuery: { data, error, isLoading, isFetching, fetchNextPage, hasNextPage },
  };
};
