import { HeroSection } from '@/components/ui/HeroSection';
import { site } from '@/data/site';
import windowShadow from '@/assets/images/window-shadow.webp';

/**
 * home-hero — the only H1 on the homepage. Split layout (HeroSection) with the brand-kit
 * cover treatment on the panel: rust field + window-light shadow. Copy is the approved
 * prototype's; the info row uses only confirmed facts (no phone/street address exists yet).
 */
export function Hero() {
  return (
    <HeroSection
      data-ss-section="home-hero"
      aria-label="Introduction"
      brand={{ text: site.name }}
      slogan={site.tagline}
      title={<>Handmade gemstone bracelets, <em>worn for meaning</em></>}
      subtitle="Strung one at a time in a small Georgia studio — chosen for the moment you're in, and labelled with the honest truth of every material inside. This is jewellery you understand before you wear it."
      callToAction={{ text: 'Shop by intention', to: '/collections/all' }}
      secondaryAction={{ text: 'Design a custom piece', to: '/pages/custom' }}
      backgroundImage={windowShadow}
      imageAlt="Warm window light falling across a rust-toned surface"
      panel={
        <>
          <div className="hero2__script" aria-hidden="true">
            <span className="script">made for the way<br />you move through the day</span>
          </div>
          <span className="hero2__tag">Vidhi's hands · natural light</span>
        </>
      }
      info={[
        { type: 'website', label: site.url.replace(/^https?:\/\//, '') },
        { type: 'instagram', label: site.instagramHandle, href: site.instagram },
        { type: 'location', label: `Handmade in ${site.location}` },
      ]}
    />
  );
}
