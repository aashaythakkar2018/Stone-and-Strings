import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCollection, getCollectionProducts } from '@/data/catalog';
import { site } from '@/data/site';
import { useSeo } from '@/hooks/useSeo';
import { filterProducts, filtersFromParams, paramsFrom, sortFromParams, sortProducts, type ProductFilters, type SortKey } from '@/utils/filterProducts';
import { Breadcrumbs, breadcrumbJsonLd, type Crumb } from '@/components/layout/Breadcrumbs';
import { CollectionHeader } from '@/components/collection/CollectionHeader';
import { CollectionToolbar } from '@/components/collection/CollectionToolbar';
import { CollectionFilters } from '@/components/collection/CollectionFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { TrustStrip } from '@/components/sections/HomeSections';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import NotFound from './NotFound';

const PAGE_SIZE = 9;

export default function Collection() {
  const { handle } = useParams();
  const collection = getCollection(handle);
  if (!collection) return <NotFound kind="collection" />;
  // Keyed so filter/pagination state resets between collections.
  return <CollectionView key={collection.handle} handle={collection.handle} />;
}

function CollectionView({ handle }: { handle: string }) {
  const collection = getCollection(handle)!;
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const all = useMemo(() => getCollectionProducts(collection), [collection]);
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const sort = useMemo(() => sortFromParams(params), [params]);
  const results = useMemo(() => sortProducts(filterProducts(all, filters), collection.kind === 'new' && sort === 'featured' ? 'newest' : sort), [all, filters, sort, collection.kind]);
  const stoneOptions = useMemo(() => [...new Set(all.flatMap((p) => p.stones))], [all]);

  const update = (f: ProductFilters, s: SortKey = sort) => {
    setParams(paramsFrom(f, s), { replace: true });
    setVisible(PAGE_SIZE);
  };

  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }];
  if (collection.handle !== 'all') crumbs.push({ label: 'Shop', to: '/collections/all' });
  crumbs.push({ label: collection.title, to: `/collections/${collection.handle}` });

  useSeo({
    title: collection.seoTitle,
    description: collection.seoDescription,
    canonicalPath: `/collections/${collection.handle}`,
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: collection.title, description: collection.description, url: `${site.url}/collections/${collection.handle}` },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: all.filter((p) => !p.pricePending).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${site.url}/products/${p.handle}`,
          name: p.fullTitle,
        })),
      },
    ],
  });

  const shown = results.slice(0, visible);

  return (
    <>
      <Breadcrumbs items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { label: c.label } : c))} />
      <CollectionHeader collection={collection} stoneTags={stoneOptions} />

      {all.length > 0 && (
        <CollectionToolbar
          stoneOptions={stoneOptions}
          filters={filters}
          sort={sort}
          shown={results.length}
          total={all.length}
          onToggleStone={(s) => update({ ...filters, stones: s == null ? [] : filters.stones.includes(s) ? filters.stones.filter((x) => x !== s) : [...filters.stones, s] })}
          onSort={(s) => update(filters, s)}
          onOpenFilters={() => setDrawerOpen(true)}
          onChange={(f) => update(f)}
        />
      )}

      <div className="wrap gridwrap" data-ss-section="collection-grid">
        {all.length === 0 ? (
          <EmptyState
            title={`${collection.title} pieces are on the bench`}
            actions={<><Button to="/collections/all">Shop all bracelets</Button><Button to="/pages/custom" variant="ghost">Request a custom piece</Button></>}
          >
            Nothing in this collection is listed yet — Vidhi strings each piece to order, and new work arrives here first. In the meantime, a custom piece can be made with this stone.
          </EmptyState>
        ) : results.length === 0 ? (
          <EmptyState
            title="No pieces match those filters"
            actions={<Button variant="ghost" onClick={() => update({ stones: [], intentions: [], treatments: [], inStockOnly: false })}>Clear filters</Button>}
          >
            Try removing a filter or two — or browse every piece in {collection.title}.
          </EmptyState>
        ) : (
          <>
            <h2 className="sr-only">Pieces in {collection.title}</h2>
            <ProductGrid products={shown} eagerCount={3} />
            {results.length > visible && (
              <div className="loadmore">
                <p>Showing {shown.length} of {results.length}</p>
                <div className="loadmore__bar" aria-hidden="true"><span style={{ transform: `scaleX(${shown.length / results.length})` }} /></div>
                <Button variant="ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more</Button>
              </div>
            )}
          </>
        )}
      </div>

      <TrustStrip />

      {collection.kind === 'intention' ? (
        <section className="sec sec--tight" data-ss-section="collection-cross-links" aria-labelledby="h-other">
          <div className="wrap">
            <div className="sec-head sec-head--sm"><p className="eyebrow">Looking for a different feeling?</p><h2 id="h-other">The other four intentions</h2></div>
            <CategoryGrid exclude={collection.intention} meta="cta" />
            <div className="center" style={{ marginTop: 44 }}><Link className="textlink" to="/pages/our-stones">Or explore by stone instead →</Link></div>
          </div>
        </section>
      ) : (
        <section className="sec sec--tight" aria-labelledby="h-other">
          <div className="wrap">
            <div className="sec-head sec-head--sm"><p className="eyebrow">Find your piece</p><h2 id="h-other">Shop by intention</h2></div>
            <CategoryGrid meta="cta" />
          </div>
        </section>
      )}

      <CollectionFilters
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        products={all}
        value={filters}
        onApply={(f) => update(f)}
        showIntentions={collection.kind !== 'intention'}
      />
    </>
  );
}
