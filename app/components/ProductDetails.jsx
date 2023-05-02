import {Image} from '@shopify/hydrogen';
import ProductGallery from './ProductGallery';
import ProductOptions from './ProductOptions';

export default function ProductDetails({product, selectedVariant}) {
  return (
    <div>
      <section className="grid max-w-screen-lg mx-auto justify-center items-top gap-8 single-product">
        <ProductGallery media={product.media.nodes} />

        <div className="details">
          <h2>{product.title}</h2>
          <p className="mb-8">{product.description}</p>

          <h3 className="mt-8 mb-4">Variants</h3>

          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />

          {/*  <AddToCartButton
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          onClick={handleAddToCart}
        >
          <span className="border border-stone-400 py-4 px-2">
            Add {product.title}-{selectedVariant.title} to Cart
          </span>
        </AddToCartButton> */}
        </div>
      </section>
    </div>
  );
}
