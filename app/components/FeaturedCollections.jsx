import {CollectionCard} from './CollectionCard';

function FeaturedCollections({collections}) {
  return (
    <section className="grid grid-cols-2 gap-14">
      {collections.nodes.map((collection) => {
        return <CollectionCard key={collection.id} collection={collection} />;
      })}
    </section>
  );
}

export default FeaturedCollections;
