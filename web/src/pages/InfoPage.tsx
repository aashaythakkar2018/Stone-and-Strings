import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { infoPages, type InfoPageContent } from '@/data/pages';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import NotFound from './NotFound';
import './pages.css';

/** Generic text page (care, repairs, policies, account placeholder). */
export default function InfoPage({ slug }: { slug: string }) {
  const page = infoPages[slug];
  return page ? <InfoView slug={slug} page={page} /> : <NotFound />;
}

function InfoView({ slug, page }: { slug: string; page: InfoPageContent }) {
  const isPolicy = page.eyebrow === 'Policies';
  useSeo({
    title: page.seoTitle,
    description: page.description,
    canonicalPath: slug === 'account' ? '/account' : `/${isPolicy ? 'policies' : 'pages'}/${slug}`,
    noindex: page.noindex,
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: page.title }]} />
      <div className="wrap page-head">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
      </div>
      <div className="wrap info-page">
        {page.pending && <p className="info-page__pending" role="note">{page.pending}</p>}
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((b) => <p key={b}>{b}</p>)}
          </section>
        ))}
        <div className="info-page__foot">
          {slug === 'account' ? (
            <Button to="/collections/all">Continue shopping</Button>
          ) : (
            <p>Questions? <Link className="inline-link" to="/pages/contact">Write to the studio</Link> or read the <Link className="inline-link" to="/pages/faq">FAQ</Link>.</p>
          )}
        </div>
      </div>
    </>
  );
}
