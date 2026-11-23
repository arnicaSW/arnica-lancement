import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Check, Info, Loader2 } from 'lucide-react';
import { useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { partnerPage } from '../content';
import { icons } from '../lib/icons';
import { plantSvg } from '../lib/plants';
import { storage } from '../lib/storage';
import { categoryColors } from './Categories';
import FAQ from './FAQ';
import { LegalContext } from './legal/LegalDialog';
import { ArnicaFlower, Reveal, SectionHeading } from './ui';

const P = partnerPage;
const F = P.form;

/* ─────────────────────────────────────────────────────────────
   Page dédiée aux commerces et entreprises (#partenaires)
   ───────────────────────────────────────────────────────────── */
export default function PartnerPage() {
  return (
    <>
      <PartnerHero />
      <section aria-labelledby="partner-benefits-title" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading id="partner-benefits-title" eyebrow={P.benefits.eyebrow} title={P.benefits.title} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {P.benefits.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={i * 0.08}>
                  <article className="group h-full rounded-3xl border border-brand-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-brand-900">{item.title}</h3>
                    <p className="mt-2 text-muted">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="partner-steps-title" className="bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading id="partner-steps-title" eyebrow={P.steps.eyebrow} title={P.steps.title} />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            {P.steps.items.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <Reveal as="li" key={step.title} delay={0.15 + i * 0.2} className="text-center">
                  <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-white shadow-lg ring-4 ring-brand-100">
                    <Icon aria-hidden="true" className="size-8 text-brand-600" />
                    <span className="absolute -top-1 -right-1 grid size-8 place-items-center rounded-full bg-accent-600 text-sm font-bold text-white shadow">
                      <span className="sr-only">Étape </span>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-brand-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-muted">{step.text}</p>
                </Reveal>
              );
            })}
          </ol>
          <p role="note" className="mx-auto mt-14 flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-200 bg-white p-4 text-sm text-brand-800">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
            {P.notice}
          </p>
        </div>
      </section>

      <PartnerForm />
      <FAQ id="faq-commerces" eyebrow="FAQ" title={P.faqTitle} items={P.faq} />
    </>
  );
}

/* ── En-tête de la page ─────────────────────────────────────── */
function PartnerHero() {
  return (
    <section aria-labelledby="partner-title" className="relative isolate overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-brand-200/60 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 left-1/4 size-80 rounded-full bg-mint-200/50 blur-3xl animate-blob" style={{ animationDelay: '-8s' }} />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:pb-24">
        <div>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-brand-700"
          >
            {P.hero.eyebrow}
          </m.p>
          <h1 id="partner-title" className="mt-5 text-4xl leading-[1.1] font-bold text-balance text-brand-900 sm:text-5xl">
            {P.hero.title}
          </h1>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted sm:text-xl"
          >
            {P.hero.text}
          </m.p>
          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <a
              href={`#${F.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(F.id)?.scrollIntoView({ behavior: 'smooth' });
                window.setTimeout(() => document.getElementById('pf-business')?.focus({ preventScroll: true }), 600);
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 active:scale-[0.98]"
            >
              {P.hero.cta}
              <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-brand-800">
              {P.hero.reassurance.map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <Check aria-hidden="true" className="size-4 text-mint-600" strokeWidth={3} />
                  {r}
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Illustration : la fleur arnica entourée de pousses qui poussent l'une après l'autre */}
        <m.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div className="absolute inset-[12%] grid place-items-center rounded-full bg-brand-600 shadow-2xl shadow-brand-900/25">
            <div className="grid size-[78%] place-items-center rounded-full bg-white">
              <ArnicaFlower className="size-3/4" />
            </div>
          </div>
          {(['restauration', 'sport', 'loisirs', 'commerces', 'bien-etre', 'services'] as const).map((c, i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            return (
              <m.div
                key={c}
                className="absolute h-[3.25rem] w-10"
                style={{ left: `calc(${50 + Math.cos(angle) * 46}% - 20px)`, top: `calc(${50 + Math.sin(angle) * 46}% - 26px)`, transformOrigin: '50% 100%' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.5 + i * 0.12 }}
                dangerouslySetInnerHTML={{ __html: plantSvg(c, categoryColors[c].hex) }}
              />
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

/* ── Formulaire commerces ───────────────────────────────────── */
type Values = {
  business: string;
  category: string;
  location: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  offerType: string;
  googleMapsUrl: string;
  message: string;
  consent: boolean;
  website: string; // pot de miel
};
type Key = 'business' | 'category' | 'location' | 'contactName' | 'email' | 'googleMapsUrl' | 'consent';
const ORDER: Key[] = ['business', 'category', 'location', 'contactName', 'email', 'googleMapsUrl', 'consent'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty: Values = {
  business: '', category: '', location: '', contactName: '', role: '', email: '', phone: '',
  offerType: '', googleMapsUrl: '', message: '', consent: false, website: '',
};

function validate(v: Values) {
  const e: Partial<Record<Key, string>> = {};
  if (v.business.trim().length < 2) e.business = F.errors.required;
  if (!v.category) e.category = F.errors.required;
  if (v.location.trim().length < 2) e.location = F.errors.required;
  if (v.contactName.trim().length < 2) e.contactName = F.errors.required;
  if (!v.email.trim()) e.email = F.errors.required;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = F.errors.email;
  if (v.googleMapsUrl.trim() && !/^https:\/\/\S+$/i.test(v.googleMapsUrl.trim())) e.googleMapsUrl = F.errors.url;
  if (!v.consent) e.consent = F.errors.consent;
  return e;
}

function PartnerForm() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const startedAt = useRef(Date.now());
  const successRef = useRef<HTMLHeadingElement>(null);
  const openLegal = useContext(LegalContext);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(v);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) return document.getElementById(`pf-${first}`)?.focus();
    if (v.website || Date.now() - startedAt.current < 2000) return setStatus('success');

    setStatus('sending');
    const opt = (s: string) => s.trim() || null;
    try {
      await storage.submitPartner({
        businessName: v.business.trim(),
        category: v.category,
        location: v.location.trim(),
        contactName: v.contactName.trim(),
        role: opt(v.role),
        email: v.email.trim().toLowerCase(),
        phone: opt(v.phone),
        offerType: opt(v.offerType),
        googleMapsUrl: opt(v.googleMapsUrl),
        message: opt(v.message),
        consent: true,
        consentText: F.consent,
        source: 'page-partenaires',
      });
      setStatus('success');
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      setStatus('error');
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id={F.id} aria-labelledby="pf-title" className="scroll-mt-20 bg-gradient-to-br from-mint-50 via-white to-brand-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal className="lg:pt-6">
          <p className="text-sm font-semibold tracking-wide text-mint-700 uppercase">{F.eyebrow}</p>
          <h2 id="pf-title" className="mt-2 text-3xl font-bold text-balance text-brand-900 sm:text-4xl">
            {F.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{F.intro}</p>
          <ArnicaFlower className="mt-10 hidden size-28 animate-[spin_40s_linear_infinite] lg:block" />
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-brand-100 bg-white p-5 shadow-2xl shadow-brand-900/10 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <m.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  className="py-6 text-center"
                >
                  <m.div
                    initial={{ scale: 0, rotate: -120 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="mx-auto grid size-24 place-items-center rounded-full bg-brand-600"
                  >
                    <span className="grid size-[80%] place-items-center rounded-full bg-white">
                      <ArnicaFlower className="size-14" />
                    </span>
                  </m.div>
                  <h3 ref={successRef} tabIndex={-1} className="mt-6 text-2xl font-bold text-brand-900 outline-none">
                    {F.success.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-muted">{F.success.text}</p>
                  <a
                    href="#top"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-700 px-5 py-2.5 font-semibold text-brand-700 transition duration-200 hover:bg-brand-700 hover:text-white"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    {F.success.back}
                  </a>
                </m.div>
              ) : (
                <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.97 }} className="relative space-y-5">
                  <p className="text-sm text-muted">{F.requiredHint}</p>
                  {errorCount > 0 && (
                    <p role="alert" className="flex items-center gap-2 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">
                      <AlertCircle aria-hidden="true" className="size-5 shrink-0" />
                      {F.errors.summary}
                    </p>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input k="business" label={F.fields.business.label} required placeholder={F.fields.business.placeholder} autoComplete="organization" value={v.business} onChange={(x) => set('business', x)} error={errors.business} max={150} />
                    <Field id="category" label={F.fields.category.label} required error={errors.category}>
                      {(desc) => (
                        <select id="pf-category" value={v.category} onChange={(e) => set('category', e.target.value)} aria-required="true" aria-invalid={!!errors.category} aria-describedby={desc} className={inputCls(!!errors.category)}>
                          <option value="">{F.fields.category.placeholder}</option>
                          {F.categories.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Input k="location" label={F.fields.location.label} required placeholder={F.fields.location.placeholder} value={v.location} onChange={(x) => set('location', x)} error={errors.location} max={100} />
                    <Input k="contactName" label={F.fields.contactName.label} required placeholder={F.fields.contactName.placeholder} autoComplete="name" value={v.contactName} onChange={(x) => set('contactName', x)} error={errors.contactName} max={120} />
                    <Input k="role" label={F.fields.role.label} hint={F.fields.role.hint} placeholder={F.fields.role.placeholder} autoComplete="organization-title" value={v.role} onChange={(x) => set('role', x)} max={100} />
                    <Input k="email" type="email" label={F.fields.email.label} required placeholder={F.fields.email.placeholder} autoComplete="email" value={v.email} onChange={(x) => set('email', x)} error={errors.email} max={254} />
                    <Input k="phone" type="tel" label={F.fields.phone.label} hint={F.fields.phone.hint} placeholder={F.fields.phone.placeholder} autoComplete="tel" value={v.phone} onChange={(x) => set('phone', x)} max={30} />
                    <Input k="googleMapsUrl" type="url" label={F.fields.googleMapsUrl.label} hint={F.fields.googleMapsUrl.hint} placeholder={F.fields.googleMapsUrl.placeholder} value={v.googleMapsUrl} onChange={(x) => set('googleMapsUrl', x)} error={errors.googleMapsUrl} max={500} />
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold text-brand-900">
                      {F.fields.offerType.label} <span className="font-normal text-muted">· {F.fields.offerType.hint}</span>
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {F.offerTypes.map((o) => (
                        <label key={o.value}>
                          <input type="radio" name="offerType" value={o.value} checked={v.offerType === o.value} onChange={() => set('offerType', o.value)} className="peer sr-only" />
                          <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 border-brand-200 bg-white px-4 text-sm font-medium text-brand-800 transition duration-200 select-none peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 hover:border-brand-500 active:scale-95">
                            {o.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="message" label={F.fields.message.label} hint={F.fields.message.hint}>
                    {(desc) => (
                      <textarea id="pf-message" rows={3} maxLength={2000} value={v.message} onChange={(e) => set('message', e.target.value)} placeholder={F.fields.message.placeholder} aria-describedby={desc} className={`${inputCls(false)} resize-y`} />
                    )}
                  </Field>

                  {/* Pot de miel anti-robots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Ne pas remplir
                      <input type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
                    </label>
                  </div>

                  <div>
                    <div className={`flex items-start gap-3 rounded-xl p-3 ${errors.consent ? 'bg-accent-50' : 'bg-brand-50'}`}>
                      <input id="pf-consent" type="checkbox" checked={v.consent} onChange={(e) => set('consent', e.target.checked)} aria-required="true" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'pf-err-consent' : undefined} className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-700" />
                      <div className="text-sm text-brand-900">
                        <label htmlFor="pf-consent" className="cursor-pointer">
                          {F.consent} <span aria-hidden="true" className="text-accent-700">*</span>
                        </label>{' '}
                        <button type="button" onClick={() => openLegal('privacy')} className="font-semibold text-brand-700 underline underline-offset-2">
                          {F.privacyLink}
                        </button>
                      </div>
                    </div>
                    <Err id="pf-err-consent" error={errors.consent} />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">
                      <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                      {F.errors.network}
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 active:translate-y-0 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80">
                    {status === 'sending' ? (
                      <>
                        <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                        {F.submitting}
                      </>
                    ) : (
                      F.submit
                    )}
                  </button>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Petits composants de formulaire ────────────────────────── */
const inputCls = (invalid: boolean) =>
  `block w-full min-h-12 rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink placeholder:text-slate-500 transition-colors duration-200 focus:border-brand-600 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-brand-100 ${
    invalid ? 'border-accent-600' : 'border-brand-200 hover:border-brand-300'
  }`;

function Err({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-accent-700">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {error}
    </p>
  );
}

function Field({ id, label, hint, required, error, children }: { id: string; label: string; hint?: string; required?: boolean; error?: string; children: (describedBy?: string) => ReactNode }) {
  const describedBy = [hint && `pf-hint-${id}`, error && `pf-err-${id}`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={`pf-${id}`} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-brand-900">
        <span>
          {label} {required && <span aria-hidden="true" className="text-accent-700">*</span>}
        </span>
        {hint && <span id={`pf-hint-${id}`} className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children(describedBy)}
      <Err id={`pf-err-${id}`} error={error} />
    </div>
  );
}

function Input({ k, label, hint, required, error, value, onChange, type = 'text', placeholder, autoComplete, max }: {
  k: string; label: string; hint?: string; required?: boolean; error?: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; autoComplete?: string; max?: number;
}) {
  return (
    <Field id={k} label={label} hint={hint} required={required} error={error}>
      {(desc) => (
        <input id={`pf-${k}`} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} maxLength={max}
          aria-required={required || undefined} aria-invalid={!!error} aria-describedby={desc} className={inputCls(!!error)} />
      )}
    </Field>
  );
}
