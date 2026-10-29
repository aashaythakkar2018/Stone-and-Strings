import { useSeo } from '@/hooks/useSeo';
import { site } from '@/data/site';
import { Hero } from '@/components/sections/Hero';
import { IntentionCards } from '@/components/sections/CategoryGrid';
import { BuildYourStack, FeaturedProducts, MeetVidhi, Pledge, PromotionalBanner, StonesTeaser, StudioBand } from '@/components/sections/HomeSections';
import { Newsletter } from '@/components/sections/Newsletter';
import { Reveal } from '@/components/ui/Motion';

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
      <section id="shop" className="sec sec--tight sec--white" data-ss-section="home-intentions" aria-labelledby="h-intentions">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="eyebrow">Find your piece</p>
            <h2 id="h-intentions">Shop by intention</h2>
            <p>Not by trend, not by price. By the feeling you're reaching for.</p>
          </Reveal>
          <IntentionCards />
        </div>
      </section>
      <Pledge />
      <FeaturedProducts />
      <StudioBand />
      <BuildYourStack />
      <MeetVidhi />
      <StonesTeaser />
      <PromotionalBanner />
      <Newsletter />
    </>
  );
}
