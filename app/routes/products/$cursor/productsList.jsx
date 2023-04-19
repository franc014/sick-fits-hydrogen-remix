import {json} from '@shopify/remix-oxygen';

const PAGINATED_PRODUCTS_QUERY = `#graphql
  query paginatedProductsQuery($cursor: String) {
    products(first: 2, after: $cursor) {
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

export async function loader({params, context}) {
  const {products} = await context.storefront.query(PAGINATED_PRODUCTS_QUERY, {
    variables: {cursor: params.cursor},
  });
  //console.log(products);
  return json({products});
}
