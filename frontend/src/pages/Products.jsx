import React from "react";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </React.Fragment>
      ))}
      {isFetching && <div>Loading more...</div>}
      {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
    </div>
  );
}
