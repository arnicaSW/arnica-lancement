import { X } from 'lucide-react';
import { createContext, useEffect, useRef } from 'react';
import { legal } from '../../content';

export type LegalKind = 'mentions' | 'privacy';

/** Permet à n'importe quel composant d'ouvrir les mentions légales ou la politique de confidentialité. */
export const LegalContext = createContext<(kind: LegalKind) => void>(() => {});

/**
 * Fenêtre modale native <dialog> : piège du focus, touche Échap et
 * restitution du focus gérés par le navigateur.
 */
export default function LegalDialog({ kind, onClose }: { kind: LegalKind | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const content = kind ? legal[kind] : null;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (kind && !dlg.open) dlg.showModal();
    if (!kind && dlg.open) dlg.close();
  }, [kind]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="legal-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl p-0 text-ink shadow-2xl"
    >
      {content && (
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-brand-100 px-6 py-4">
            <h2 id="legal-title" className="text-xl font-bold text-brand-900">
              {content.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={legal.close}
              className="grid size-10 place-items-center rounded-full text-brand-800 transition-colors hover:bg-brand-50"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="space-y-6 overflow-y-auto px-6 py-6">
            {content.sections.map((s) => (
              <section key={s.heading}>
                <h3 className="font-semibold text-brand-900">{s.heading}</h3>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2 text-sm text-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
