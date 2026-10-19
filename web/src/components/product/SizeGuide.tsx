import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { WRIST_SIZES } from '@/data/products';
import { Modal } from '@/components/ui/Modal';
import './SizeGuide.css';

/**
 * Homepage V2 #4 — sizing everywhere. One modal, opened from the hero, the footer and the PDP.
 * Ranges come from the product data (the approved PDP's wrist sizes), so the guide always matches
 * the size selector.
 */
const FIT = ['Petite', 'Most common', 'Standard', 'Relaxed'];

interface SizeGuideValue {
  openSizeGuide: () => void;
}

const SizeGuideContext = createContext<SizeGuideValue | null>(null);

export function useSizeGuide() {
  const ctx = useContext(SizeGuideContext);
  if (!ctx) throw new Error('useSizeGuide must be used inside <SizeGuideProvider>');
  return ctx;
}

export function SizeGuideProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openSizeGuide: () => setOpen(true) }), []);
  return (
    <SizeGuideContext.Provider value={value}>
      {children}
      <Modal open={open} onClose={() => setOpen(false)} title="Find your size">
        <p className="sizeguide__lede">
          Wrap a soft tape or a strip of paper around your wrist bone. Note the length, then pick the size it falls in.
          Between sizes? Size up for a relaxed fit.
        </p>
        <table className="sizeguide__table">
          <caption className="sr-only">Bracelet sizes by wrist measurement</caption>
          <thead>
            <tr><th scope="col">Size</th><th scope="col">Wrist</th><th scope="col">Fit</th></tr>
          </thead>
          <tbody>
            {WRIST_SIZES.map((label, i) => {
              const [name, range] = label.split(' — ');
              return (
                <tr key={label}>
                  <th scope="row">{name}</th>
                  <td>{range}</td>
                  <td>{FIT[i]}</td>
                </tr>
              );
            })}
            <tr>
              <th scope="row">Custom</th>
              <td>
                <Link to="/pages/contact?topic=custom" onClick={() => setOpen(false)} className="inline-link">Tell us your measurement</Link>
              </td>
              <td>Strung to fit</td>
            </tr>
          </tbody>
        </table>
        <p className="sizeguide__note">Bead size, clasp and metal are listed on every product page.</p>
      </Modal>
    </SizeGuideContext.Provider>
  );
}
