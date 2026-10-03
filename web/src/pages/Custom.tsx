import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { customFaqs, customLines, processSteps } from '@/data/custom';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { Accordion, AccordionItem, Badge } from '@/components/ui/Primitives';
import './pages.css';

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Custom Studio', to: '/pages/custom' }];

export default function Custom() {
  useSeo({
    title: 'Custom Studio — Birthstone, Family & Initial Bracelets | Stone & Strings',
    description:
      'Hand-strung custom bracelets made around your story: birthstone & family pieces, initial bracelets, and inspired-word designs. Every stone chosen with you — start yours today.',
    canonicalPath: '/pages/custom',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Custom gemstone bracelet design',
        provider: { '@type': 'Brand', name: 'Stone & Strings' },
        areaServed: ['US', 'CA'],
        name: 'Custom Studio — Birthstone, Family, Initial & Inspired-Word Bracelets',
        description:
          'Hand-strung custom bracelets designed with each customer: birthstone and family pieces, initial bracelets, and inspired-word bracelets. Stones, hardware, and details chosen together with Vidhi before anything is made.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: customFaqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
    ],
  });

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'Custom Studio' }]} />

      <div className="wrap chero" data-ss-section="custom-hero">
        <div className="chero__grid">
          <div>
            <p className="eyebrow">Custom Studio</p>
            <h1>A Bracelet Made Around Your Story</h1>
            <p className="chero__lede">
              Three ways to make it personal: a birthstone piece for the people you love, an initial that's only yours, or
              a word you want to carry. You choose the stones and the details — Vidhi hand-strings it in her Georgia studio.
            </p>
            <div className="chero__cta">
              <Button to="/pages/contact?topic=custom">Start your custom piece</Button>
              <Button variant="ghost" onClick={() => document.getElementById('lines')?.scrollIntoView({ behavior: 'smooth' })}>See the three lines</Button>
            </div>
            <ul className="trust-items chero__trust" role="list">
              <li className="t-item"><span className="dot" aria-hidden="true" />Designed with you before it's made</li>
              <li className="t-item"><span className="dot" aria-hidden="true" />Gold or silver hardware, your choice</li>
              <li className="t-item"><span className="dot" aria-hidden="true" />Free 30-day repair, same as every piece</li>
            </ul>
          </div>
          <SmartImage className="chero__img" eager image={{ tone: 'rust', alt: 'Custom family birthstone bracelet with dangling charms, laid on a wooden table', caption: 'Custom · made to order' }}>
            <Badge tone="lead">Made to order</Badge>
          </SmartImage>
        </div>
      </div>

      <div className="wrap process" data-ss-section="custom-process">
        <ol className="process__grid">
          {processSteps.map((s) => (
            <li className="process__step" key={s.num}>
              <span className="process__num" aria-hidden="true">{s.num}</span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div id="lines" />
      {customLines.map((line, i) => (
        <section key={line.id} className={`line${line.lead ? ' line--lead' : ''}${i % 2 === 1 ? ' line--reverse' : ''}`} data-ss-section={`custom-${line.id}`} aria-labelledby={`h-${line.id}`}>
          <div className="wrap line__grid">
            <SmartImage className="line__media" image={line.image} />
            <div className="line__copy">
              <span className="line__tag">{line.tag}</span>
              <h2 id={`h-${line.id}`}>{line.title}</h2>
              <p className="line__sub">{line.sub}</p>
              <div className="line__opts">
                {line.options.map((o) => (
                  <div className="line__opt" key={o.title}>
                    <h3>{o.title}</h3>
                    <p>{o.body}</p>
                  </div>
                ))}
              </div>
              <div className="line__checks">
                <b>You choose</b>
                <ul>{line.choices.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <div className="line__cta"><Link className="textlink" to={`/pages/contact?topic=${line.cta.topic}`}>{line.cta.label}</Link></div>
            </div>
          </div>
        </section>
      ))}

      <section className="sec sec--tight" style={{ borderTop: '1px solid var(--line)' }} data-ss-section="custom-faq" aria-labelledby="h-cfaq">
        <div className="wrap">
          <div className="sec-head sec-head--sm"><p className="eyebrow">Before you start</p><h2 id="h-cfaq">Good to know</h2></div>
          <div className="narrow">
            <Accordion>
              {customFaqs.map((f, i) => (
                <AccordionItem key={f.question} title={f.question} defaultOpen={i === 0}><p>{f.answer}</p></AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="center" style={{ marginTop: 44 }}>
            <Button to="/pages/contact?topic=custom">Start your custom piece</Button>
          </div>
        </div>
      </section>
    </>
  );
}
