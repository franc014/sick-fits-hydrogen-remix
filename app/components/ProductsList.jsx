import {useState} from 'react';
import {ProductCard} from './ProductCard';

export default function ProductsList({products, pageInfo}) {
  const [allProducts, setProducts] = useState(products);

  return (
    <div>
      <div className="grid grid-cols-2 gap-14">
        {allProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
