import {useLoaderData} from '@remix-run/react';
import FeaturedCollections from '~/components/FeaturedCollections';
const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart", sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        description
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

export const meta = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return await context.storefront.query(FEATURED_COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections} = useLoaderData();
  return (
    <div>
      <h1>Collections</h1>
      <FeaturedCollections collections={collections} />
    </div>
  );
}
