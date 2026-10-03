import { useEffect, useState } from 'react';
import type { Product, TreatmentStatus } from '@/types/product';
import { stoneName } from '@/data/stones';
import { intentions } from '@/data/intentions';
import { emptyFilters, filterProducts, type ProductFilters } from '@/utils/filterProducts';
import { Drawer } from '@/components/ui/Drawer';
import { AccordionItem, Accordion } from '@/components/ui/Primitives';
import { Button } from '@/components/ui/Button';
import { treatmentLabel } from '@/components/product/ProductBits';

interface Props {
  open: boolean;
  onClose: () => void;
  products: Product[];
  value: ProductFilters;
  onApply: (f: ProductFilters) => void;
  showIntentions: boolean;
}

function Check({ checked, onChange, label, n }: { checked: boolean; onChange: () => void; label: string; n: number }) {
  return (
    <label className="fcheck">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="fcheck__box" aria-hidden="true" />
      <span className="fcheck__label">{label}</span>
      <span className="fcheck__n"><span aria-hidden="true">{n}</span><span className="sr-only">{`, ${n} ${n === 1 ? 'piece' : 'pieces'}`}</span></span>
    </label>
  );
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

/** Full filter drawer: stone, intention, treatment, availability, price. Works on every screen size. */
export function CollectionFilters({ open, onClose, products, value, onApply, showIntentions }: Props) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { if (open) setDraft(value); }, [open, value]);

  const stoneOpts = [...new Set(products.flatMap((p) => p.stones))];
  const treatmentOpts = [...new Set(products.map((p) => p.treatment))] as TreatmentStatus[];
  const prices = products.filter((p) => !p.pricePending).map((p) => p.price);
  const floor = prices.length ? Math.min(...prices) : 0;
  const ceil = prices.length ? Math.max(...prices) : 0;
  const preview = filterProducts(products, draft).length;
  const count = (pred: (p: Product) => boolean) => products.filter(pred).length;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      title="Filter"
      className="fdrawer"
      footer={
        <div className="fdrawer__foot">
          <button type="button" className="textlink" onClick={() => setDraft(emptyFilters)}>Clear all</button>
          <Button onClick={() => { onApply(draft); onClose(); }}>
            Show {preview} {preview === 1 ? 'piece' : 'pieces'}
          </Button>
        </div>
      }
    >
      <Accordion>
        <AccordionItem title="Stone" defaultOpen>
          <fieldset className="fgroup"><legend className="sr-only">Stone</legend>
            {stoneOpts.map((s) => (
              <Check key={s} label={stoneName(s)} checked={draft.stones.includes(s)} onChange={() => setDraft({ ...draft, stones: toggle(draft.stones, s) })} n={count((p) => p.stones.includes(s))} />
            ))}
          </fieldset>
        </AccordionItem>
        {showIntentions && (
          <AccordionItem title="Intention" defaultOpen>
            <fieldset className="fgroup"><legend className="sr-only">Intention</legend>
              {intentions.map((i) => (
                <Check key={i.handle} label={i.title} checked={draft.intentions.includes(i.handle)} onChange={() => setDraft({ ...draft, intentions: toggle(draft.intentions, i.handle) })} n={count((p) => p.intention === i.handle)} />
              ))}
            </fieldset>
          </AccordionItem>
        )}
        <AccordionItem title="Stone treatment" defaultOpen>
          <fieldset className="fgroup"><legend className="sr-only">Stone treatment</legend>
            {treatmentOpts.map((t) => (
              <Check key={t} label={treatmentLabel(t)} checked={draft.treatments.includes(t)} onChange={() => setDraft({ ...draft, treatments: toggle(draft.treatments, t) })} n={count((p) => p.treatment === t)} />
            ))}
          </fieldset>
        </AccordionItem>
        <AccordionItem title="Availability">
          <fieldset className="fgroup"><legend className="sr-only">Availability</legend>
            <Check label="Available to order now" checked={draft.inStockOnly} onChange={() => setDraft({ ...draft, inStockOnly: !draft.inStockOnly })} n={count((p) => p.available)} />
          </fieldset>
        </AccordionItem>
        <AccordionItem title="Price">
          <fieldset className="fprice"><legend className="sr-only">Price range in US dollars</legend>
            <label>
              <span>Min ($)</span>
              <input type="number" inputMode="numeric" min={0} placeholder={String(floor)} value={draft.priceMin ?? ''}
                onChange={(e) => setDraft({ ...draft, priceMin: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) })} className="field__control" />
            </label>
            <span aria-hidden="true">–</span>
            <label>
              <span>Max ($)</span>
              <input type="number" inputMode="numeric" min={0} placeholder={String(ceil)} value={draft.priceMax ?? ''}
                onChange={(e) => setDraft({ ...draft, priceMax: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) })} className="field__control" />
            </label>
          </fieldset>
          <p className="fprice__hint">Pieces in this collection range from ${floor} to ${ceil}.</p>
        </AccordionItem>
      </Accordion>
    </Drawer>
  );
}
