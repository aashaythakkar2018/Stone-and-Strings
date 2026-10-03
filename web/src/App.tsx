import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

// Home is in the main bundle; everything else is code-split per route.
const Collection = lazy(() => import('@/pages/Collection'));
const Product = lazy(() => import('@/pages/Product'));
const Search = lazy(() => import('@/pages/Search'));
const Cart = lazy(() => import('@/pages/Cart'));
const About = lazy(() => import('@/pages/About'));
const Custom = lazy(() => import('@/pages/Custom'));
const OurStones = lazy(() => import('@/pages/OurStones'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const InfoPage = lazy(() => import('@/pages/InfoPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** URLs mirror Shopify's (/collections, /products, /pages, /policies) so links survive the migration. */
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/collections', element: <Navigate to="/collections/all" replace /> },
      { path: '/collections/:handle', element: <Collection /> },
      { path: '/products/:handle', element: <Product /> },
      { path: '/search', element: <Search /> },
      { path: '/cart', element: <Cart /> },
      { path: '/account', element: <InfoPage slug="account" /> },

      { path: '/pages/about', element: <About /> },
      { path: '/pages/custom', element: <Custom /> },
      { path: '/pages/our-stones', element: <OurStones /> },
      { path: '/pages/contact', element: <Contact /> },
      { path: '/pages/faq', element: <FAQ /> },
      { path: '/pages/care', element: <InfoPage slug="care" /> },
      { path: '/pages/repairs', element: <InfoPage slug="repairs" /> },
      { path: '/policies/:slug', element: <PolicyRoute /> },

      // Short aliases
      { path: '/about', element: <Navigate to="/pages/about" replace /> },
      { path: '/contact', element: <Navigate to="/pages/contact" replace /> },
      { path: '/faq', element: <Navigate to="/pages/faq" replace /> },
      { path: '/custom', element: <Navigate to="/pages/custom" replace /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

function PolicyRoute() {
  const { slug = '' } = useParams();
  return <InfoPage slug={slug} />;
}

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
