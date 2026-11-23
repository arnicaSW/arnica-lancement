import { ArrowRight, Check, Store } from 'lucide-react';
import { partnerInvite, partnerPage } from '../content';
import { plantSvg } from '../lib/plants';
import { categoryColors } from './Categories';
import { ArnicaFlower, Reveal } from './ui';

/** Encart d'accueil destiné aux commerces et entreprises, qui mène à la page partenaires. */
export default function PartnerInvite() {
  return (
    <section id={partnerInvite.id} aria-labelledby="partner-invite-title" className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-12 text-white shadow-2xl shadow-brand-900/20 sm:px-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            <Store aria-hidden="true" className="size-4" />
            {partnerInvite.eyebrow}
          </p>
          <h2 id="partner-invite-title" className="mt-4 text-3xl font-bold text-balance sm:text-4xl">
            {partnerInvite.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-50">{partnerInvite.text}</p>
          <ul className="mt-6 space-y-2">
            {partnerInvite.points.map((p) => (
              <li key={p} className="flex items-center gap-2 font-medium">
                <span className="grid size-6 place-items-center rounded-full bg-mint-600">
                  <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href={`#${partnerPage.id}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-600 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 active:scale-[0.98]"
          >
            {partnerInvite.button}
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Vitrine illustrée : un commerce entouré de pousses */}
        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-xs sm:block">
          <div className="relative aspect-square rounded-full bg-white/10 p-8">
            <div className="grid size-full place-items-center rounded-full bg-white shadow-xl">
              <ArnicaFlower className="size-2/3" />
            </div>
            {(['restauration', 'sport', 'bien-etre', 'commerces'] as const).map((c, i) => (
              <div
                key={c}
                className="absolute h-[3.25rem] w-10 animate-float"
                style={{
                  left: ['-4%', '82%', '86%', '-2%'][i],
                  top: ['12%', '6%', '64%', '70%'][i],
                  animationDelay: `${-i * 1.4}s`,
                }}
                dangerouslySetInnerHTML={{ __html: plantSvg(c, categoryColors[c].hex) }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
