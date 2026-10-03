import { useSeo } from '@/hooks/useSeo';
import { site } from '@/data/site';
import { Hero } from '@/components/sections/Hero';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { BrandStory, FeaturedProducts, Pledge, PromotionalBanner, StonesTeaser, Testimonials } from '@/components/sections/HomeSections';
import { Newsletter } from '@/components/sections/Newsletter';

const orgLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/favicon.svg`,
    founder: { '@type': 'Person', name: site.founder },
    sameAs: [site.instagram],
    slogan: site.tagline,
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/` },
];

export default function Home() {
  useSeo({ canonicalPath: '/', jsonLd: orgLd });
  return (
    <>
      <Hero />
      <section className="sec" data-ss-section="home-intentions" aria-labelledby="h-intentions">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Find your piece</p>
            <h2 id="h-intentions">Shop by intention</h2>
            <p>Not by trend, not by price — by the feeling you're reaching for. Every bracelet lives in one of five quiet places.</p>
          </div>
          <CategoryGrid />
        </div>
      </section>
      <Pledge />
      <FeaturedProducts />
      <BrandStory />
      <StonesTeaser />
      <PromotionalBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
