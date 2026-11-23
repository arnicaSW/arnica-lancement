-- ════════════════════════════════════════════════════════════════
--  arnica · table des marques d'intérêt
--  À exécuter une fois dans Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════

create table if not exists public.interest_signups (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  first_name         text check (first_name is null or char_length(first_name) <= 80),
  email              text not null
                       check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  profession         text not null
                       check (profession in ('infirmier','aide-soignant','medecin','administratif','medico-social','autre')),
  establishment_type text not null
                       check (establishment_type in ('public','prive','liberal')),
  location           text not null check (char_length(location) between 2 and 100),
  categories         text[] not null default '{}'
                       check (categories <@ array['restauration','sport','loisirs','commerces','bien-etre','services']::text[]),
  consent            boolean not null check (consent = true),
  consent_text       text not null check (char_length(consent_text) <= 1000),
  source             text check (source is null or char_length(source) <= 100)
);

-- Une seule inscription par adresse e-mail (insensible à la casse)
create unique index if not exists interest_signups_email_unique
  on public.interest_signups (lower(email));

-- ── Sécurité : le site public peut AJOUTER une ligne, mais jamais LIRE,
--    modifier ou supprimer. La lecture se fait depuis le tableau de bord Supabase.
alter table public.interest_signups enable row level security;

revoke all on public.interest_signups from anon, authenticated;
grant insert (first_name, email, profession, establishment_type, location,
              categories, consent, consent_text, source)
  on public.interest_signups to anon;

drop policy if exists "Inscription publique (insert uniquement)" on public.interest_signups;
create policy "Inscription publique (insert uniquement)"
  on public.interest_signups
  for insert
  to anon
  with check (consent = true);

-- ── Statistiques prêtes à présenter aux partenaires (aucune donnée nominative)
--    Accessible uniquement depuis le tableau de bord (pas exposée au public).
create or replace view public.interest_stats
with (security_invoker = true) as
select
  count(*)                                                    as total_inscrits,
  count(*) filter (where profession = 'infirmier')            as infirmiers,
  count(*) filter (where profession = 'aide-soignant')        as aides_soignants,
  count(*) filter (where profession = 'medecin')              as medecins,
  count(*) filter (where profession = 'administratif')        as administratifs,
  count(*) filter (where profession = 'medico-social')        as medico_social,
  count(*) filter (where profession = 'autre')                as autres,
  count(*) filter (where establishment_type = 'public')       as etab_public,
  count(*) filter (where establishment_type = 'prive')        as etab_prive,
  count(*) filter (where establishment_type = 'liberal')      as etab_liberal
from public.interest_signups;

revoke all on public.interest_stats from anon, authenticated;


-- ════════════════════════════════════════════════════════════════
--  Questionnaire approfondi (#questionnaire)
--  Deux tables SANS LIEN entre elles : les réponses restent anonymes.
-- ════════════════════════════════════════════════════════════════

-- Réponses anonymes. Le format JSON permet de modifier les questions
-- dans src/content.ts sans toucher à la base.
-- Seule la DATE est conservée (pas l'heure), pour éviter de rapprocher
-- une réponse d'une inscription ou d'un contact envoyés au même moment.
create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  created_on  date not null default current_date,
  answers     jsonb not null
                check (jsonb_typeof(answers) = 'object' and pg_column_size(answers) < 20000)
);

alter table public.survey_responses enable row level security;
revoke all on public.survey_responses from anon, authenticated;
grant insert (answers) on public.survey_responses to anon;

drop policy if exists "Questionnaire public (insert uniquement)" on public.survey_responses;
create policy "Questionnaire public (insert uniquement)"
  on public.survey_responses for insert to anon with check (true);

-- Contacts volontaires pour un échange ultérieur (stockés à part, sans les réponses)
create table if not exists public.survey_contacts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text not null
                  check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  consent       boolean not null check (consent = true),
  consent_text  text not null check (char_length(consent_text) <= 1000),
  source        text check (source is null or char_length(source) <= 100)
);

create unique index if not exists survey_contacts_email_unique
  on public.survey_contacts (lower(email));

alter table public.survey_contacts enable row level security;
revoke all on public.survey_contacts from anon, authenticated;
grant insert (email, consent, consent_text, source) on public.survey_contacts to anon;

drop policy if exists "Contact public (insert uniquement)" on public.survey_contacts;
create policy "Contact public (insert uniquement)"
  on public.survey_contacts for insert to anon with check (consent = true);


-- ════════════════════════════════════════════════════════════════
--  Commerces et entreprises intéressés (#partenaires)
-- ════════════════════════════════════════════════════════════════
create table if not exists public.partner_leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  business_name    text not null check (char_length(business_name) between 2 and 150),
  category         text not null check (char_length(category) <= 50),
  location         text not null check (char_length(location) between 2 and 100),
  contact_name     text not null check (char_length(contact_name) between 2 and 120),
  role             text check (role is null or char_length(role) <= 100),
  email            text not null
                     check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            text check (phone is null or char_length(phone) <= 30),
  offer_type       text check (offer_type is null or char_length(offer_type) <= 50),
  google_maps_url  text check (google_maps_url is null or (char_length(google_maps_url) <= 500 and google_maps_url ~* '^https://')),
  message          text check (message is null or char_length(message) <= 2000),
  consent          boolean not null check (consent = true),
  consent_text     text not null check (char_length(consent_text) <= 1000),
  source           text check (source is null or char_length(source) <= 100)
);

alter table public.partner_leads enable row level security;
revoke all on public.partner_leads from anon, authenticated;
grant insert (business_name, category, location, contact_name, role, email, phone,
              offer_type, google_maps_url, message, consent, consent_text, source)
  on public.partner_leads to anon;

drop policy if exists "Demande commerce publique (insert uniquement)" on public.partner_leads;
create policy "Demande commerce publique (insert uniquement)"
  on public.partner_leads for insert to anon with check (consent = true);
