import { Link } from 'react-router-dom';
import { intentions } from '@/data/intentions';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';

export function CartEmpty({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <div className={`cempty${compact ? ' cempty--compact' : ''}`}>
      <Logo variant="mark" className="cempty__mark" title="" />
      <p className="cempty__title">Your cart is empty</p>
      <p className="cempty__body">Every piece is strung to order. Start with the feeling you're reaching for.</p>
      <ul className="cempty__links">
        {intentions.map((i) => (
          <li key={i.handle}><Link to={`/collections/${i.handle}`} onClick={onNavigate}>{i.title}</Link></li>
        ))}
      </ul>
      <Button to="/collections/all" onClick={onNavigate}>Shop all bracelets</Button>
    </div>
  );
}
