import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { site } from '@/data/site';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import './pages.css';

const TOPICS = [
  { value: 'general', label: 'A general question' },
  { value: 'custom', label: 'Custom piece — not sure which line yet' },
  { value: 'custom-birthstone', label: 'Custom — Birthstone & Family' },
  { value: 'custom-initial', label: 'Custom — Initial' },
  { value: 'custom-inspired', label: 'Custom — Inspired Word' },
  { value: 'order', label: 'An existing order' },
  { value: 'repair', label: 'A repair' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Contact', to: '/pages/contact' }];

interface Errors { name?: string; email?: string; message?: string }

export default function Contact() {
  const [params] = useSearchParams();
  const initialTopic = TOPICS.some((t) => t.value === params.get('topic')) ? params.get('topic')! : 'general';
  const [form, setForm] = useState({ name: '', email: '', topic: initialTopic, message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const isCustom = form.topic.startsWith('custom');

  useSeo({
    title: isCustom ? 'Start a Custom Piece — Contact Vidhi | Stone & Strings' : 'Contact Stone & Strings',
    description: 'Questions about a piece, a repair, or a custom bracelet? Write to Vidhi at the Stone & Strings studio in Georgia — every message is read and answered personally.',
    canonicalPath: '/pages/contact',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!form.name.trim()) er.name = 'Please tell us your name.';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) er.message = isCustom ? 'Tell Vidhi a little about the piece — who it’s for, or the idea.' : 'Please add a short message.';
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`contact-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'Contact' }]} />
      <div className="wrap contact">
        <div className="contact__intro">
          <p className="eyebrow">{isCustom ? 'Custom Studio' : 'Write to the studio'}</p>
          <h1>{isCustom ? 'Tell Vidhi the story' : 'Get in touch'}</h1>
          <p className="page-head__lede">
            {isCustom
              ? 'Who it’s for, the occasion, or the feeling you want it to hold. Vidhi will reply with stone ideas, a personal quote and an estimated timeline before anything is made.'
              : 'Questions about a piece, sizing, a repair or an order — every message is read and answered by Vidhi herself.'}
          </p>
          <ul className="contact__facts">
            <li><b>Studio</b>Georgia, USA — online only</li>
            <li><b>Instagram</b><a className="inline-link" href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a></li>
            <li><b>Repairs</b>Free for 30 days — <Link className="inline-link" to="/pages/repairs">how it works</Link></li>
          </ul>
        </div>

        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__sent" role="status">
              <h2>Thank you, {form.name.split(' ')[0]}.</h2>
              <p>
                Your message is ready for Vidhi. <em>Note: this is a preview build — messages aren't delivered until the
                store launches.</em>
              </p>
              <Button to="/collections/all" variant="ghost">Keep browsing</Button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={submit} noValidate>
              <Input id="contact-name" label="Your name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} required />
              <Input id="contact-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} required />
              <Select id="contact-topic" label="What's it about?" value={form.topic} onChange={set('topic')} options={TOPICS} />
              <Textarea
                id="contact-message"
                label={isCustom ? 'Tell us about the piece' : 'Message'}
                value={form.message}
                onChange={set('message')}
                error={errors.message}
                hint={isCustom ? 'Who is it for? Any stones, birth months, an initial or a word you have in mind?' : undefined}
                required
              />
              <Button type="submit" full>{isCustom ? 'Send to Vidhi' : 'Send message'}</Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
