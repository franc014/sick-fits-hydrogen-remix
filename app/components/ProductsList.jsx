import {useCallback, useState} from 'react';
import {ProductCard} from './ProductCard';

export default function ProductsList({products, pageInfo}) {
  const {endCursor, hasNextPage} = pageInfo;
  const [allProducts, setProducts] = useState(products);
  const [cursor, setCursor] = useState(endCursor);

  const fetchProduts = useCallback(
    async function () {
      const result = await fetch(`products/${cursor}/productsList`);

      const dt = await result.json();
      console.log(dt);
    },
    [cursor],
  );

  function handleLoadMoreProducts() {
    fetchProduts();
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-14">
        {allProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <button className="button my-4" onClick={handleLoadMoreProducts}>
        Load more
      </button>
    </div>
  );
}
