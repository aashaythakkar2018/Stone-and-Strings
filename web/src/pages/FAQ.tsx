import { useSeo } from '@/hooks/useSeo';
import { siteFaqs } from '@/data/pages';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Accordion, AccordionItem } from '@/components/ui/Primitives';
import { Button } from '@/components/ui/Button';
import './pages.css';

const crumbs = [{ label: 'Home', to: '/' }, { label: 'FAQ', to: '/pages/faq' }];

export default function FAQ() {
  useSeo({
    title: 'FAQ — Stones, Sizing, Repairs & Custom Orders | Stone & Strings',
    description: 'Answers about natural vs. dyed stones, sizing, care, the free 30-day repair and custom bracelets from Stone & Strings. Find your answer or write to Vidhi.',
    canonicalPath: '/pages/faq',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: siteFaqs.flatMap((g) => g.items).map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
    ],
  });

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'FAQ' }]} />
      <div className="wrap page-head">
        <p className="eyebrow">Good to know</p>
        <h1>Frequently asked questions</h1>
      </div>
      <div className="wrap faqpage">
        {siteFaqs.map((g) => (
          <section key={g.group} className="faqpage__group" aria-labelledby={`faq-${g.group}`}>
            <h2 id={`faq-${g.group}`}>{g.group}</h2>
            <Accordion>
              {g.items.map((f) => (
                <AccordionItem key={f.question} title={f.question}><p>{f.answer}</p></AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
        <div className="faqpage__more">
          <p>Still wondering about something?</p>
          <Button to="/pages/contact" variant="ghost">Write to Vidhi</Button>
        </div>
      </div>
    </>
  );
}
