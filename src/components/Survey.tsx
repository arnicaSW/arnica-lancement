import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, Lock } from 'lucide-react';
import { useContext, useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from 'react';
import { survey, type SurveyOption, type SurveyQuestion } from '../content';
import { storage, type SurveyAnswers } from '../lib/storage';
import { LegalContext } from './legal/LegalDialog';

type Value = string | string[] | number | null;
const DRAFT_KEY = 'arnica-questionnaire-brouillon';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const allQuestions = survey.steps.flatMap((s) => s.questions as SurveyQuestion[]);
const TOTAL = survey.steps.length + 1; // + étape « contact »

/* Brouillon local : pratique si l'on est interrompu·e (bip, appel, fin de pause) */
function readDraft(): Record<string, Value> {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  } catch {
    return {};
  }
}
function writeDraft(v: Record<string, Value> | null) {
  try {
    if (v) localStorage.setItem(DRAFT_KEY, JSON.stringify(v));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* stockage indisponible : on continue sans brouillon */
  }
}

export default function Survey() {
  const [answers, setAnswers] = useState<Record<string, Value>>(readDraft);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const openLegal = useContext(LegalContext);

  useEffect(() => writeDraft(Object.keys(answers).length ? answers : null), [answers]);

  // À chaque changement d'étape : remonter en haut et placer le focus sur le titre
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const set = (id: string, v: Value) => {
    setAnswers((a) => ({ ...a, [id]: v }));
    setErrors((e) => ({ ...e, [id]: '' }));
  };

  const isContactStep = step === survey.steps.length;
  const current = survey.steps[step];

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (!isContactStep) {
      for (const q of current.questions as SurveyQuestion[]) {
        const v = answers[q.id];
        if (q.required && (v == null || v === '' || (Array.isArray(v) && v.length === 0)))
          e[q.id] = survey.requiredError;
      }
    } else if (email.trim()) {
      if (!EMAIL_RE.test(email.trim())) e.email = survey.contact.emailInvalid;
      else if (!consent) e.consent = survey.contact.consentRequired;
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`q-${first}`)?.focus();
    return !first;
  }

  const go = (delta: number) => {
    if (delta > 0 && !validateStep()) return;
    setDir(delta);
    setStep((s) => Math.min(Math.max(s + delta, 0), TOTAL - 1));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!isContactStep) return go(1);
    if (!validateStep()) return;
    if (honeypot) return setStatus('success');

    // Nettoyage : « déjà utilisés » doit rester cohérent avec « connus »
    const known = (answers.knownAids as string[] | undefined) ?? [];
    const cleaned: SurveyAnswers = { version: 1 };
    for (const q of allQuestions) {
      let v = answers[q.id] ?? null;
      if (q.id === 'usedAids' && Array.isArray(v)) v = v.filter((x) => x === 'aucun' || known.includes(x));
      if (typeof v === 'string') v = v.trim().slice(0, 1000) || null;
      cleaned[q.id] = v;
    }

    setStatus('sending');
    try {
      await storage.submitSurvey(cleaned);
      if (email.trim()) {
        await storage.submitContact({
          email: email.trim().toLowerCase(),
          consent: true,
          consentText: survey.contact.consent,
          source: 'questionnaire',
        });
      }
      writeDraft(null);
      setStatus('success');
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      setStatus('error');
    }
  }

  const progress = status === 'success' ? 100 : Math.round((step / TOTAL) * 100);

  return (
    <section aria-labelledby="survey-title" className="min-h-[80vh] bg-gradient-to-br from-brand-50 via-white to-mint-50 pb-20">
      <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-20 px-4 pt-8 sm:px-6 sm:pt-12">
        <h1 id="survey-title" className="text-2xl font-bold tracking-tight text-balance text-brand-900 sm:text-3xl">
          {survey.title}
        </h1>
        {step === 0 && status !== 'success' && <p className="mt-3 text-muted">{survey.intro}</p>}

        {/* Barre de progression */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm font-medium text-brand-800">
            <span>{status === 'success' ? '✓' : survey.stepLabel(step + 1, TOTAL)}</span>
            <span className="tabular-nums text-muted">{progress} %</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Progression du questionnaire"
            className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100"
          >
            <m.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-5 shadow-2xl shadow-brand-900/10 sm:p-8">
          {status === 'success' ? (
            <SurveySuccess headingRef={headingRef} />
          ) : (
            <form noValidate onSubmit={onSubmit}>
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <m.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  {!isContactStep ? (
                    <>
                      <div>
                        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-brand-900 outline-none">
                          {current.title}
                        </h2>
                        {'intro' in current && current.intro && <p className="mt-1 text-sm text-muted">{current.intro}</p>}
                      </div>
                      {(current.questions as SurveyQuestion[]).map((q) => (
                        <Question key={q.id} q={q} answers={answers} error={errors[q.id]} onChange={(v) => set(q.id, v)} />
                      ))}
                    </>
                  ) : (
                    <ContactStep
                      headingRef={headingRef}
                      email={email}
                      setEmail={(v) => {
                        setEmail(v);
                        setErrors({});
                      }}
                      consent={consent}
                      setConsent={(v) => {
                        setConsent(v);
                        setErrors({});
                      }}
                      errors={errors}
                      openPrivacy={() => openLegal('privacy')}
                    />
                  )}
                </m.div>
              </AnimatePresence>

              {/* Pot de miel anti-robots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Ne pas remplir
                  <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  {survey.networkError}
                </p>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    {survey.previous}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 active:translate-y-0 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                      {survey.submitting}
                    </>
                  ) : isContactStep ? (
                    survey.submit
                  ) : (
                    <>
                      {survey.next}
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-6 flex items-start gap-2 text-xs text-muted">
                <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {survey.draftNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Rendu d'une question selon son type ────────────────────── */
function Question({
  q,
  answers,
  error,
  onChange,
}: {
  q: SurveyQuestion;
  answers: Record<string, Value>;
  error?: string;
  onChange: (v: Value) => void;
}) {
  const value = answers[q.id];
  const errId = `err-${q.id}`;
  const hintId = `hint-${q.id}`;
  const describedBy = [q.hint && hintId, error && errId].filter(Boolean).join(' ') || undefined;

  // Options dynamiques : « déjà utilisés » reprend les organismes cochés comme « connus »
  const options: SurveyOption[] = useMemo(() => {
    if (!q.optionsFrom) return q.options ?? [];
    const source = allQuestions.find((x) => x.id === q.optionsFrom);
    const picked = (answers[q.optionsFrom] as string[] | undefined) ?? [];
    return (source?.options ?? []).filter((o) => picked.includes(o.value));
  }, [q, answers]);

  const label = (
    <>
      {q.label} {q.required && <span aria-hidden="true" className="text-accent-700">*</span>}
    </>
  );
  const hint = q.hint && (
    <p id={hintId} className="mt-0.5 text-sm text-muted">
      {q.hint}
    </p>
  );
  const err = error && (
    <p id={errId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent-700">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {error}
    </p>
  );

  if (q.type === 'select') {
    return (
      <div>
        <label htmlFor={`q-${q.id}`} className="block font-semibold text-brand-900">
          {label}
        </label>
        {hint}
        <select
          id={`q-${q.id}`}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value || null)}
          aria-required={q.required || undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`mt-2 block min-h-12 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none ${error ? 'border-accent-600' : 'border-brand-200'}`}
        >
          <option value="">{q.placeholder ?? 'Choisissez…'}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err}
      </div>
    );
  }

  if (q.type === 'text') {
    return (
      <div>
        <label htmlFor={`q-${q.id}`} className="block font-semibold text-brand-900">
          {label}
        </label>
        <p id={hintId} className="mt-0.5 text-sm text-muted">
          {q.hint ? `${q.hint} · ` : ''}
          {survey.openTextWarning}
        </p>
        <textarea
          id={`q-${q.id}`}
          rows={3}
          maxLength={1000}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.placeholder}
          aria-describedby={hintId}
          className="mt-2 block w-full resize-y rounded-xl border-2 border-brand-200 bg-white px-4 py-3 text-base text-ink placeholder:text-slate-500 focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none"
        />
      </div>
    );
  }

  // Choix (single / multi / scale) : rendus en « pastilles » accessibles
  const isMulti = q.type === 'multi';
  const selected: (string | number)[] = isMulti ? ((value as string[]) ?? []) : value != null ? [value as string | number] : [];
  const choiceList: { value: string | number; label: string }[] =
    q.type === 'scale' ? [1, 2, 3, 4, 5].map((n) => ({ value: n, label: String(n) })) : options;
  const atMax = isMulti && q.max != null && selected.filter((v) => v !== q.noneOption?.value).length >= q.max;

  const toggle = (v: string | number) => {
    if (!isMulti) return onChange(v);
    const arr = selected as string[];
    const sv = v as string;
    if (q.noneOption && sv === q.noneOption.value) return onChange(arr.includes(sv) ? [] : [sv]);
    const base = arr.filter((x) => x !== q.noneOption?.value);
    onChange(base.includes(sv) ? base.filter((x) => x !== sv) : [...base, sv]);
  };

  const pill = (o: { value: string | number; label: string }, idx: number, extra = '') => {
    const checked = selected.includes(o.value);
    const disabled = atMax && !checked;
    return (
      <label key={String(o.value)} className={extra}>
        <input
          id={idx === 0 ? `q-${q.id}` : undefined}
          type={isMulti ? 'checkbox' : 'radio'}
          name={q.id}
          checked={checked}
          disabled={disabled}
          onChange={() => toggle(o.value)}
          className="peer sr-only"
        />
        <span
          className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border-2 px-3.5 py-2 text-sm font-medium transition duration-200 select-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-45 active:scale-[0.98] ${
            checked
              ? 'border-brand-700 bg-brand-700 text-white'
              : `${error ? 'border-accent-600' : 'border-brand-200'} bg-white text-brand-800 hover:border-brand-500`
          } ${q.type === 'scale' ? 'justify-center text-base font-bold' : ''}`}
        >
          {isMulti && (
            <span
              aria-hidden="true"
              className={`grid size-4 shrink-0 place-items-center rounded border-2 ${checked ? 'border-white bg-white text-brand-700' : 'border-brand-300'}`}
            >
              {checked && <Check className="size-3" strokeWidth={3} />}
            </span>
          )}
          {o.label}
        </span>
      </label>
    );
  };

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="font-semibold text-brand-900">{label}</legend>
      {hint}
      {q.optionsFrom && options.length === 0 ? (
        <p className="mt-2 rounded-xl bg-brand-50 p-3 text-sm text-muted">{q.emptyText}</p>
      ) : q.type === 'scale' ? (
        <div className="mt-3">
          <div className="grid grid-cols-5 gap-2">{choiceList.map((o, i) => pill(o, i))}</div>
          <div className="mt-1.5 flex justify-between text-xs text-muted">
            <span>1 : {q.scaleLabels?.[0]}</span>
            <span className="text-right">5 : {q.scaleLabels?.[1]}</span>
          </div>
        </div>
      ) : (
        <div className={`mt-3 flex flex-wrap gap-2`}>{choiceList.map((o, i) => pill(o, i))}</div>
      )}
      {q.noneOption && !(q.optionsFrom && options.length === 0) && (
        <div className="mt-2 flex">{pill(q.noneOption, -1)}</div>
      )}
      {isMulti && q.max != null && (
        <p aria-live="polite" className="mt-2 text-xs text-muted">
          {atMax ? survey.maxReached(q.max) : ''}
        </p>
      )}
      {err}
    </fieldset>
  );
}

/* ── Étape contact (facultative) ────────────────────────────── */
function ContactStep({
  headingRef,
  email,
  setEmail,
  consent,
  setConsent,
  errors,
  openPrivacy,
}: {
  headingRef: RefObject<HTMLHeadingElement>;
  email: string;
  setEmail: (v: string) => void;
  consent: boolean;
  setConsent: (v: boolean) => void;
  errors: Record<string, string>;
  openPrivacy: () => void;
}) {
  const c = survey.contact;
  return (
    <>
      <div>
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-brand-900 outline-none">
          {c.title}
        </h2>
        <p className="mt-1 text-sm text-muted">{c.intro}</p>
      </div>
      <div>
        <label htmlFor="q-email" className="block font-semibold text-brand-900">
          {c.emailLabel}
        </label>
        <input
          id="q-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.emailPlaceholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'err-email' : undefined}
          className={`mt-2 block min-h-12 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink placeholder:text-slate-500 focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none ${errors.email ? 'border-accent-600' : 'border-brand-200'}`}
        />
        {errors.email && (
          <p id="err-email" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent-700">
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {errors.email}
          </p>
        )}
      </div>
      {email.trim() !== '' && (
        <div>
          <div className={`flex items-start gap-3 rounded-xl p-3 ${errors.consent ? 'bg-accent-50' : 'bg-brand-50'}`}>
            <input
              id="q-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'err-consent' : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-700"
            />
            <div className="text-sm text-brand-900">
              <label htmlFor="q-consent" className="cursor-pointer">
                {c.consent}
              </label>{' '}
              <button type="button" onClick={openPrivacy} className="font-semibold text-brand-700 underline underline-offset-2">
                {c.privacyLink}
              </button>
            </div>
          </div>
          {errors.consent && (
            <p id="err-consent" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent-700">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ── Remerciements ──────────────────────────────────────────── */
function SurveySuccess({ headingRef }: { headingRef: RefObject<HTMLHeadingElement> }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      role="status"
      className="py-6 text-center"
    >
      <m.span
        initial={{ scale: 0.5, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-mint-600 text-white"
      >
        <Check aria-hidden="true" className="size-10" strokeWidth={3} />
      </m.span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-2xl font-bold text-brand-900 outline-none">
        {survey.success.title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{survey.success.text}</p>
      <a
        href="#top"
        className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-700 px-5 py-2.5 font-semibold text-brand-700 transition duration-200 hover:bg-brand-700 hover:text-white"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {survey.success.back}
      </a>
    </m.div>
  );
}
