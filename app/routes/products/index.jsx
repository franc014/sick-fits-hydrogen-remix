import {useLoaderData} from '@remix-run/react';
import ProductsList from '~/components/ProductsList';

const ALL_PRODUCTS_QUERY = `#graphql
  query allProductsQuery {
    products(first: 2) {
      nodes {
        id
        title
        description
        handle
        image: featuredImage {
          url
          width
          height
          altText
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function loader({context}) {
  return await context.storefront.query(ALL_PRODUCTS_QUERY);
}

export default function Products() {
  const {products} = useLoaderData();

  return (
    <div>
      <h1>Products</h1>
      <ProductsList
        products={products.nodes}
        pageInfo={products.pageInfo}
      ></ProductsList>
    </div>
  );
}
