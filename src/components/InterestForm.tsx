import { AnimatePresence, m, type Variants } from 'framer-motion';
import { AlertCircle, ArrowRight, ClipboardList, Loader2, Share2 } from 'lucide-react';
import { useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { categories, form, survey } from '../content';
import { storage } from '../lib/storage';
import { LegalContext } from './legal/LegalDialog';
import { Reassurance, Reveal } from './ui';

type Fields = {
  firstName: string;
  email: string;
  profession: string;
  establishment: string;
  location: string;
  categories: string[];
  consent: boolean;
  website: string; // pot de miel anti-robots (champ invisible)
};
type FieldKey = 'email' | 'profession' | 'establishment' | 'location' | 'consent';
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: FieldKey[] = ['email', 'profession', 'establishment', 'location', 'consent'];

function validate(v: Fields): Errors {
  const e: Errors = {};
  const email = v.email.trim();
  if (!email) e.email = form.errors.emailRequired;
  else if (!EMAIL_RE.test(email)) e.email = form.errors.emailInvalid;
  if (!v.profession) e.profession = form.errors.professionRequired;
  if (!v.establishment) e.establishment = form.errors.establishmentRequired;
  if (v.location.trim().length < 2) e.location = form.errors.locationRequired;
  if (!v.consent) e.consent = form.errors.consentRequired;
  return e;
}

const initial: Fields = {
  firstName: '',
  email: '',
  profession: '',
  establishment: '',
  location: '',
  categories: [],
  consent: false,
  website: '',
};

export default function InterestForm() {
  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const startedAt = useRef(Date.now());
  const openLegal = useContext(LegalContext);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Retire l'erreur dès que le champ est corrigé
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleCategory = (id: string) =>
    set(
      'categories',
      values.categories.includes(id) ? values.categories.filter((c) => c !== id) : [...values.categories, id],
    );

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = ORDER.find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    // Robots : champ caché rempli ou envoi en moins de 2 s → on simule un succès sans rien enregistrer
    if (values.website || Date.now() - startedAt.current < 2000) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      await storage.submit({
        firstName: values.firstName.trim() || null,
        email: values.email.trim().toLowerCase(),
        profession: values.profession,
        establishmentType: values.establishment,
        location: values.location.trim(),
        categories: values.categories,
        consent: true,
        consentText: form.consent.text,
        source: 'landing-prelancement',
      });
      setStatus('success');
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      setStatus('error');
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section
      id={form.id}
      aria-labelledby="form-title"
      className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-mint-50 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal className="lg:pt-6">
          <p className="text-sm font-semibold tracking-wide text-mint-700 uppercase">{form.eyebrow}</p>
          <h2 id="form-title" tabIndex={-1} className="mt-2 text-3xl font-bold tracking-tight text-balance text-brand-900 outline-none sm:text-4xl">
            {form.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{form.intro}</p>
          <div className="mt-6">
            <Reassurance />
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-brand-100 bg-white p-5 shadow-2xl shadow-brand-900/10 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <Success key="success" />
              ) : (
                <m.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  aria-describedby="form-required-hint"
                  className="space-y-5"
                >
                  <p id="form-required-hint" className="text-sm text-muted">
                    {form.requiredHint}
                  </p>

                  {errorCount > 0 && (
                    <p role="alert" className="flex items-center gap-2 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">
                      <AlertCircle aria-hidden="true" className="size-5 shrink-0" />
                      {form.errors.summary}
                    </p>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="firstName"
                      label={form.fields.firstName.label}
                      hint={form.fields.firstName.hint}
                      autoComplete="given-name"
                      placeholder={form.fields.firstName.placeholder}
                      value={values.firstName}
                      onChange={(v) => set('firstName', v)}
                      maxLength={80}
                    />
                    <TextField
                      id="email"
                      type="email"
                      required
                      label={form.fields.email.label}
                      autoComplete="email"
                      inputMode="email"
                      placeholder={form.fields.email.placeholder}
                      value={values.email}
                      onChange={(v) => set('email', v)}
                      error={errors.email}
                      maxLength={254}
                    />
                  </div>

                  <Field id="profession" label={form.fields.profession.label} required error={errors.profession}>
                    {(describedBy) => (
                      <select
                        id="field-profession"
                        value={values.profession}
                        onChange={(e) => set('profession', e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.profession}
                        aria-describedby={describedBy}
                        className={inputClass(!!errors.profession)}
                      >
                        <option value="">{form.fields.profession.placeholder}</option>
                        {form.professions.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <fieldset aria-describedby={errors.establishment ? 'error-establishment' : undefined}>
                    <legend className="mb-2 text-sm font-semibold text-brand-900">
                      {form.fields.establishment.label} <Req />
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {form.establishmentTypes.map((t, i) => (
                        <label key={t.value} className="relative">
                          <input
                            type="radio"
                            name="establishment"
                            id={i === 0 ? 'field-establishment' : undefined}
                            value={t.value}
                            checked={values.establishment === t.value}
                            onChange={() => set('establishment', t.value)}
                            className="peer sr-only"
                          />
                          <span
                            className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-2 text-center text-sm font-semibold transition duration-200 peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 hover:border-brand-500 ${
                              errors.establishment ? 'border-accent-600' : 'border-brand-200 text-brand-800'
                            }`}
                          >
                            {t.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <ErrorText id="error-establishment" error={errors.establishment} />
                  </fieldset>

                  <TextField
                    id="location"
                    required
                    label={form.fields.location.label}
                    hint={form.fields.location.hint}
                    autoComplete="postal-code"
                    placeholder={form.fields.location.placeholder}
                    value={values.location}
                    onChange={(v) => set('location', v)}
                    error={errors.location}
                    maxLength={100}
                  />

                  <fieldset aria-describedby="hint-categories">
                    <legend className="text-sm font-semibold text-brand-900">{form.fields.categories.label}</legend>
                    <p id="hint-categories" className="mb-2 text-sm text-muted">
                      {form.fields.categories.hint}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.items.map((c) => (
                        <label key={c.id}>
                          <input
                            type="checkbox"
                            checked={values.categories.includes(c.id)}
                            onChange={() => toggleCategory(c.id)}
                            className="peer sr-only"
                          />
                          <span className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border-2 border-mint-200 bg-white px-4 text-sm font-medium text-brand-800 transition duration-200 select-none peer-checked:border-mint-600 peer-checked:bg-mint-600 peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 hover:border-mint-500 active:scale-95">
                            {c.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Pot de miel : invisible pour les humains, rempli par certains robots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Ne pas remplir
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={(e) => set('website', e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <div className={`flex items-start gap-3 rounded-xl p-3 ${errors.consent ? 'bg-accent-50' : 'bg-brand-50'}`}>
                      <input
                        id="field-consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => set('consent', e.target.checked)}
                        aria-required="true"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'error-consent' : undefined}
                        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-700"
                      />
                      <div className="text-sm text-brand-900">
                        <label htmlFor="field-consent" className="cursor-pointer">
                          {form.consent.text} <Req />
                        </label>{' '}
                        <button
                          type="button"
                          onClick={() => openLegal('privacy')}
                          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                        >
                          {form.consent.privacyLink}
                        </button>
                      </div>
                    </div>
                    <ErrorText id="error-consent" error={errors.consent} />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">
                      <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                      {form.errors.network}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-xl active:translate-y-0 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                        {form.submitting}
                      </>
                    ) : (
                      form.submit
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

/* ── Sous-composants ────────────────────────────────────────── */

const inputClass = (invalid: boolean) =>
  `block w-full min-h-12 rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink placeholder:text-slate-500 transition-colors duration-200 focus:border-brand-600 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-brand-100 ${
    invalid ? 'border-accent-600' : 'border-brand-200 hover:border-brand-300'
  }`;

function Req() {
  return (
    <span aria-hidden="true" className="text-accent-700">
      *
    </span>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <m.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-accent-700"
        >
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </m.p>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const describedBy = [hint && `hint-${id}`, error && `error-${id}`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-brand-900">
        <span>
          {label} {required && <Req />}
        </span>
        {hint && (
          <span id={`hint-${id}`} className="text-xs font-normal text-muted">
            {hint}
          </span>
        )}
      </label>
      {children(describedBy)}
      <ErrorText id={`error-${id}`} error={error} />
    </div>
  );
}

function TextField({
  id,
  label,
  hint,
  required,
  error,
  value,
  onChange,
  type = 'text',
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: 'email' | 'text';
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <Field id={id} label={label} hint={hint} required={required} error={error}>
      {(describedBy) => (
        <input
          id={`field-${id}`}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={inputClass(!!error)}
          {...rest}
        />
      )}
    </Field>
  );
}

/* ── Confirmation animée ────────────────────────────────────── */
const checkVariants: Variants = {
  hidden: { strokeDashoffset: 1 },
  visible: { strokeDashoffset: 0, transition: { duration: 0.5, delay: 0.25, ease: 'easeOut' } },
};

function Success() {
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  // Le formulaire disparaît : on déplace le focus sur le message de confirmation
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  async function share() {
    const url = window.location.origin + window.location.pathname;
    const data = { title: 'arnica', text: form.success.share, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      /* partage annulé : rien à faire */
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-labelledby={titleId}
      className="py-6 text-center"
    >
      <div className="relative mx-auto size-24">
        {[0, 1].map((i) => (
          <m.span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-mint-400"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.4, ease: 'easeOut' }}
          />
        ))}
        <m.svg
          aria-hidden="true"
          viewBox="0 0 96 96"
          className="relative size-24"
          initial={{ scale: 0.6, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          <circle cx="48" cy="48" r="46" fill="var(--color-mint-600)" />
          <m.path
            d="M28 50 L42 63 L69 34"
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            variants={checkVariants}
            initial="hidden"
            animate="visible"
          />
        </m.svg>
      </div>

      <h3 id={titleId} ref={titleRef} tabIndex={-1} className="mt-6 text-2xl font-bold text-brand-900 outline-none">
        {form.success.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-muted">{form.success.text}</p>
      <p className="mx-auto mt-4 max-w-md font-medium text-brand-800">{form.success.share}</p>
      <button
        type="button"
        onClick={share}
        className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-700 px-5 py-2.5 font-semibold text-brand-700 transition duration-200 hover:bg-brand-700 hover:text-white active:scale-95"
      >
        <Share2 aria-hidden="true" className="size-4" />
        {copied ? form.success.shareCopied : form.success.shareButton}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? form.success.shareCopied : ''}
      </span>

      {/* Aller plus loin : questionnaire approfondi */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 rounded-2xl border-2 border-mint-200 bg-mint-50 p-5 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-mint-700 shadow-sm">
            <ClipboardList aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="font-bold text-brand-900">{form.moreHelp.title}</p>
            <p className="mt-1 text-sm text-muted">{form.moreHelp.text}</p>
          </div>
        </div>
        <a
          href={`#${survey.id}`}
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-5 py-3 font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 active:scale-[0.98]"
        >
          {form.moreHelp.button}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </m.div>
    </m.div>
  );
}
