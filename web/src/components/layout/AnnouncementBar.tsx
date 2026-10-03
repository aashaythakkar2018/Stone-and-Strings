import { Fragment, useEffect, useState } from 'react';
import { announcement } from '@/data/site';

function Item({ a }: { a: (typeof announcement)[number] }) {
  return a.strong ? <><b>{a.text}</b>{a.suffix}</> : <>{a.text}</>;
}

/** Desktop shows all three messages; mobile rotates them one at a time. */
export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % announcement.length), 4500);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="announce" role="region" aria-label="Announcements">
      <p className="announce__all">
        {announcement.map((a, n) => (
          <Fragment key={a.text}>
            {n > 0 && <span className="announce__sep" aria-hidden="true">·</span>}
            <Item a={a} />
          </Fragment>
        ))}
      </p>
      <p className="announce__rotator" aria-hidden="true">
        <span key={i}><Item a={announcement[i]} /></span>
      </p>
    </div>
  );
}
