import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollManager />
      <a className="skip" href="#main">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageSkeleton />}>
          <div className="page-enter" key={pathname}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
