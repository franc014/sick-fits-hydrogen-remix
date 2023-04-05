import {useLoaderData} from '@remix-run/react';
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

      <section className="grid grid-cols-2 gap-14">
        {collections.nodes.map((collection) => {
          return <p key={collection.id}>{collection.title}</p>;
        })}
      </section>
    </div>
  );
}
