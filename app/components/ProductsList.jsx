import {useCallback, useEffect, useRef, useState} from 'react';
import {ProductCard} from './ProductCard';
import wait from 'waait';

export default function ProductsList({products, pageInfo}) {
  const {endCursor, hasNextPage} = pageInfo;
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [allProducts, setProducts] = useState(products);
  const [cursor, setCursor] = useState(endCursor);
  const [pending, setPending] = useState(false);
  const moreButtonRef = useRef(null);

  const fetchProduts = useCallback(
    async function () {
      setPending(true);
      const result = await fetch(`products/${cursor}/productsList`);

      const dt = await result.json();
      setProducts([...allProducts, ...dt.products.nodes]);
      setNextPage(dt.products.pageInfo.hasNextPage);
      setCursor(dt.products.pageInfo.endCursor);
      setPending(false);
    },
    [cursor, allProducts],
  );

  const handleIntersect = useCallback(
    function (entries) {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await wait(1000); // we make the lazy load more friendly to human perception
          fetchProduts();
        }
      });
    },
    [fetchProduts],
  );

  useEffect(
    function () {
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
      });

      const moreButton = moreButtonRef.current;
      if (moreButton) observer.observe(moreButton);

      return function () {
        if (moreButton) observer.unobserve(moreButton);
      };
    },
    [moreButtonRef, cursor, handleIntersect],
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
      {nextPage && (
        <div ref={moreButtonRef}>
          <button className="button my-4" onClick={handleLoadMoreProducts}>
            {pending ? `loading...` : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
