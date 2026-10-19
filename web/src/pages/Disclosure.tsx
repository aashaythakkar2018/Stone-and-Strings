import { useSeo } from '@/hooks/useSeo';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import './pages.css';

/**
 * Homepage V2 #7 — the Disclosure Standard. Reframes the claim from "most brands won't tell you"
 * (FTC Jewelry Guides already require treatment disclosure) to "up front, in plain words".
 * Bracketed values are still to confirm with the studio and stay visible until they are.
 */
const LABELS = [
  { tag: 'Natural', tone: 'natural', body: 'Cut and polished only. Color and pattern are as the earth made them.' },
  { tag: 'Heat-treated', tone: 'heat', body: 'Gently heated to deepen or even out color. Common and permanent.' },
  { tag: 'Dyed', tone: 'dyed', body: 'Color added. Can fade over years with sun, water or perfume. Care notes included.' },
  { tag: 'Stabilized', tone: 'stabilized', body: 'Filled with resin so a soft stone holds up to daily wear.' },
  { tag: 'Plated', tone: 'plated', body: 'A thin precious-metal layer over a base metal. We name both.' },
  { tag: 'Gold-filled · Sterling', tone: 'metal', body: 'Solid-layer metals for clasps and findings. Listed with their karat or grade.' },
] as const;

const EXAMPLE = [
  { material: 'Black Onyx', tag: 'Dyed', tone: 'dyed', origin: '[origin]', care: 'Keep dry, avoid perfume' },
  { material: 'Clear Quartz', tag: 'Natural', tone: 'natural', origin: '[origin]', care: 'Wipe with a soft cloth' },
  { material: 'Clasp / findings', tag: '[metal]', tone: 'metal', origin: '—', care: 'Remove before swimming' },
] as const;

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Disclosure Standard', to: '/pages/disclosure' }];

export default function Disclosure() {
  useSeo({
    title: 'The Disclosure Standard — What’s in Your Bracelet | Stone & Strings',
    description:
      'How Stone & Strings labels every gemstone and metal: natural, heat-treated, dyed, stabilized or plated, shown up front on every product page. Read our standard.',
    canonicalPath: '/pages/disclosure',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'Disclosure Standard' }]} />
      <section className="wrap disc-hero">
        <p className="eyebrow disc-hero__eyebrow">The Stone &amp; Strings Disclosure Standard</p>
        <h1>What's in your bracelet, <em>in plain words.</em></h1>
        <p className="disc-hero__lede">
          Many gemstones are treated to improve color or durability. That's normal, and US guidelines expect sellers to
          disclose it. We go further: every treatment and every metal is shown up front on the product page and on the card
          in your box, never in the fine print.
        </p>
      </section>

      <section className="wrap disc-labels" aria-labelledby="h-labels">
        <h2 id="h-labels" className="eyebrow">The labels you'll see</h2>
        <Stagger as="ul" className="disc-legend" role="list" gap={0.06}>
          {LABELS.map((l) => (
            <StaggerItem key={l.tag} className="disc-legend__item">
              <span className={`disc-tag disc-tag--${l.tone}`}>{l.tag}</span>
              <p>{l.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="disc-example" aria-labelledby="h-example">
        <div className="wrap">
          <p className="eyebrow">Example · as shown on every product page</p>
          <h2 id="h-example">Held Ground</h2>
          <div className="disc-table-wrap">
            <table className="disc-table">
              <caption className="sr-only">Materials, labels, origin and care for Held Ground</caption>
              <thead>
                <tr><th scope="col">Material</th><th scope="col">Label</th><th scope="col">Origin</th><th scope="col">Care</th></tr>
              </thead>
              <tbody>
                {EXAMPLE.map((r) => (
                  <tr key={r.material}>
                    <th scope="row">{r.material}</th>
                    <td><span className={`disc-tag disc-tag--${r.tone}`}>{r.tag}</span></td>
                    <td>{r.origin}</td>
                    <td>{r.care}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wrap disc-proof" aria-labelledby="h-checked">
        {/* PRODUCTION IMG: the disclosure card that ships in every box */}
        <SmartImage className="disc-proof__img" image={{ tone: 'sand', alt: 'The disclosure card that ships in every box', caption: 'Photo · the disclosure card in every box' }} />
        <Reveal className="disc-proof__copy">
          <h2 id="h-checked">Checked by a trained gemologist</h2>
          <p>Vidhi checks every bead under a loupe before it's strung. If we're ever unsure of a treatment, we say so, and we don't sell it as natural.</p>
          <p>Questions about a stone? Write to us before you buy. We'll answer plainly.</p>
          <div><Button to="/collections/all" variant="ink">Shop honestly labeled bracelets</Button></div>
        </Reveal>
      </section>
    </>
  );
}
