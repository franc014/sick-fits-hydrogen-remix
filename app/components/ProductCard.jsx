import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
/* import { AddToCart } from "./AddToCard.client"; */

export function ProductCard({product}) {
  return (
    <div className="bg-white border border-neutral-300 relative flex flex-col shadow-2xl shadow-neutral-300">
      <Image data={product.image} className="w-full h-80 object-cover " />

      <h3>
        <Link
          to={`/products/${product.handle}`}
          className="bg-red-600 inline leading-1 text-5xl text-center text-white py-0 px-4 "
        >
          {product.title}
        </Link>
      </h3>
      {/* <PriceTag>{formatMoney(product.price)}</PriceTag> */}

      <p className="flex-grow mt-2 py-6 px-12 leading-7">
        {product.description}
      </p>
      <div
        className="buttonList grid w-full border-t-2 
      border-stone-200 gap-2 place-items-center"
      >
        {/*   <AddToCart /> */}
      </div>
    </div>
  );
}
