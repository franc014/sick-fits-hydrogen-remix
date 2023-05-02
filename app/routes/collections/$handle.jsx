import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {ProductCard} from '~/components/ProductCard';

const COLLECTION_BY_HANDLE_QUERY = `#graphql
  query CollectionByHandleQuery($handle: String!) {
    collection(handle: $handle) {
      handle
      description
      title
      products(first: 100) {
        edges {
          node {
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
        }
      }
    }
  }
`;

export async function loader({context, params}) {
  const {collection} = await context.storefront.query(
    COLLECTION_BY_HANDLE_QUERY,
    {
      variables: {handle: params.handle},
    },
  );

  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();
  const products = collection.products.edges;

  return (
    <div>
      <h1>{collection.title}</h1>

      <p>{collection.description}</p>
      <div className="grid grid-cols-2 gap-14 my-12">
        {products.map(({node}) => {
          return <ProductCard key={node.id} product={node} />;
        })}
      </div>
    </div>
  );
}
