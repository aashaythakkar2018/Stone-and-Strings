import { useState, type FormEvent } from 'react';
import './sections.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** home-newsletter — Klaviyo embed in production. Frontend-only: validates and confirms locally. */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      return;
    }
    setState('done');
  };

  return (
    <section className="news" data-ss-section="home-newsletter" aria-labelledby="h-news">
      <div className="wrap news__wrap">
        <h2 id="h-news">First looks, and the stories behind the stones</h2>
        <p>New pieces before anyone else, plus a short guide to the stones and how to care for them. No spam, no discount games.</p>
        {state === 'done' ? (
          <p className="news__done" role="status">Thank you — you're on the list. The first stone guide is on its way once the studio opens.</p>
        ) : (
          <form className="news__form" onSubmit={submit} noValidate aria-label="Newsletter signup">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
              aria-invalid={state === 'error' || undefined}
              aria-describedby={state === 'error' ? 'nl-err' : undefined}
              required
            />
            <button className="btn btn--cream" type="submit">Join</button>
            {state === 'error' && <p id="nl-err" className="news__err" role="alert">Please enter a valid email address.</p>}
          </form>
        )}
        <small>First access · stone guide · honest care notes</small>
      </div>
    </section>
  );
}
