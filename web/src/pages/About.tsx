import { useSeo } from '@/hooks/useSeo';
import { founderStatement, mission, site, vision } from '@/data/site';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Pledge } from '@/components/sections/HomeSections';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { Logo } from '@/components/brand/Logo';
import './pages.css';

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Meet Vidhi', to: '/pages/about' }];

export default function About() {
  useSeo({
    title: 'Meet Vidhi — The Story Behind Stone & Strings',
    description:
      'Meet Vidhi, the gemologist-trained founder of Stone & Strings, who hand-strings every gemstone bracelet in her Georgia studio. Read her story and the brand’s promise.',
    canonicalPath: '/pages/about',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Meet Vidhi',
        url: `${site.url}/pages/about`,
        mainEntity: { '@type': 'Person', name: site.founder, jobTitle: 'Founder', worksFor: { '@type': 'Organization', name: site.name } },
      },
    ],
  });

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'Meet Vidhi' }]} />

      <section className="about-hero" aria-labelledby="h-about">
        <div className="wrap about-hero__grid">
          <div>
            <p className="eyebrow">The studio</p>
            <h1 id="h-about">Meet Vidhi</h1>
            <p className="about-hero__lede">
              Trained as a gemologist under a master with thirty-five years at the bench, Vidhi started Stone &amp; Strings
              with a single bracelet made for someone she loved. She still strings every order herself, in a small home
              studio in Georgia.
            </p>
          </div>
          {/* PRODUCTION IMG: portrait of Vidhi at her studio bench, natural light */}
          <SmartImage className="about-hero__img" eager image={{ tone: 'warm', alt: 'Vidhi, founder of Stone & Strings, at her studio bench', caption: 'Vidhi at the bench' }} />
        </div>
      </section>

      <section className="statement" aria-labelledby="h-statement">
        <div className="wrap statement__in">
          <Logo variant="mark" className="statement__mark" title="" />
          <h2 id="h-statement" className="eyebrow">Founder's brand statement</h2>
          <blockquote>
            <p>“{founderStatement}”</p>
          </blockquote>
          <p className="statement__sig">Vidhi</p>
        </div>
      </section>

      <section className="sec mv" aria-label="Mission and vision">
        <div className="wrap mv__grid">
          <div className="mv__item">
            <p className="eyebrow">Mission</p>
            <h2>Meaning you can afford to wear every day</h2>
            <p>{mission}</p>
          </div>
          <div className="mv__item">
            <p className="eyebrow">Vision</p>
            <h2>A trusted name for handmade gemstone jewellery</h2>
            <p>{vision}</p>
          </div>
        </div>
      </section>

      <Pledge />

      <section className="sec packaging" aria-labelledby="h-pack">
        <div className="wrap packaging__grid">
          <figure className="packaging__img packaging__img--a">
            <img src="/images/packaging-box.webp" alt="Rust Stone & Strings gift box with an embossed bead pattern and a cream wordmark card" loading="lazy" decoding="async" />
          </figure>
          <div className="packaging__copy">
            <p className="eyebrow">Arrives ready to give</p>
            <h2 id="h-pack">Wrapped with the same care</h2>
            <p>
              Our packaging is designed with the same care as the pieces inside: a rust box embossed with our bead
              pattern, a cream carry bag, and a simple ribbon — so whether it's for you or someone you love, it's ready to give.
            </p>
            <Button to="/collections/all" variant="ghost">Shop the collection</Button>
          </div>
          <figure className="packaging__img packaging__img--b">
            <img src="/images/packaging-bag.webp" alt="Cream Stone & Strings carry bag with rust ribbon and small wrapped gift boxes" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>
    </>
  );
}
