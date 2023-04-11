import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

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
  console.log(params);
  const {collection} = await context.storefront.query(
    COLLECTION_BY_HANDLE_QUERY,
    {
      variables: {handle: params.collectionHandle},
    },
  );

  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();
  console.log('here', collection);

  return (
    <div>
      <h1>{collection.title}</h1>
    </div>
  );
}
