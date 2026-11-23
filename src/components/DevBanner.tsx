import { Construction } from 'lucide-react';
import { devBanner, devNotice } from '../content';

export default function DevBanner() {
  return (
    <aside
      aria-label={devBanner.label}
      className="bg-brand-900 px-4 py-2 text-center text-sm text-brand-50"
    >
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
          <Construction aria-hidden="true" className="size-3.5" />
          {devBanner.label}
        </span>
        <span>{devBanner.text}</span>
        <a
          href={`#${devNotice.id}`}
          className="font-semibold text-white underline decoration-mint-400 decoration-2 underline-offset-4 hover:decoration-white"
        >
          {devBanner.linkLabel}
        </a>
      </p>
    </aside>
  );
}
