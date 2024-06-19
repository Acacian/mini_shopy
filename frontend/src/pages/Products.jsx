import React from 'react';
import { useProducts } from '../hooks/useProducts';

const Products = () => {
  const { data, error, isLoading, isFetching } = useProducts();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.pages.map((page) =>
        page.data.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
