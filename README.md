# arnica · Landing page de pré-lancement

Site vitrine d'une page pour **mesurer l'intérêt des professionnel·les de santé** pour arnica (zone pilote : Saint-Nazaire et la presqu'île guérandaise).

Stack : **Vite + React + TypeScript + Tailwind CSS 4 + Framer Motion**, carte interactive **Leaflet + OpenStreetMap** (gratuite, sans clé), inscriptions et questionnaire stockés dans **Supabase** (région UE).

La page contient :
- le **formulaire d'intérêt** (30 secondes), dont la confirmation propose d'aller plus loin ;
- le **questionnaire approfondi** (5 minutes, anonyme), accessible à l'adresse `/#questionnaire`. Ce lien peut aussi être partagé directement ;
- la **page commerces et entreprises** (`/#partenaires`), annoncée par un encart sur l'accueil, avec son propre formulaire d'intérêt, enregistré à part.

**Identité visuelle** : nom et logo **arnica** (fleur orange à cœur vert), police **Fredoka** (hébergée avec le site, sans Google Fonts), palette de l'équipe (`src/themes/nouvelle.css`). Le logo est le composant `ArnicaFlower` / `Logo` de `src/components/ui.tsx`.

---

## 1. Installation

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent (22 recommandé).

```bash
npm install
```

## 2. Lancement en local

```bash
npm run dev
```

Ouvrez http://localhost:5173. Sans fichier `.env`, le formulaire utilise un **stockage factice** (`mock`) : rien n'est envoyé, l'inscription est seulement affichée dans la console du navigateur.

Autres commandes :

| Commande | Rôle |
|---|---|
| `npm run build` | Vérifie les types puis construit le site dans `dist/` |
| `npm run preview` | Sert la version construite (pour tester avant mise en ligne) |
| `npm run typecheck` | Vérification TypeScript seule |

## 3. Modifier les textes

**Tous les textes sont dans [`src/content.ts`](src/content.ts)** : hero, bénéfices, étapes, catégories, FAQ, formulaire, mentions légales, politique de confidentialité…

- Les mentions légales et la politique de confidentialité sont dans l’export `legal` (éditeur, contact, durée de conservation : 12 mois).
- Une adresse e-mail renseignée dans `site.contactEmail` devient automatiquement un lien cliquable dans le pied de page.
- Les `id` des catégories et les `value` des professions et types d'établissement sont enregistrés en base. Pour les changer, mettez aussi à jour les contraintes dans `supabase/schema.sql`.

Autres fichiers utiles :
- **Partenaires de la carte** (nom, promotion, adresse, lien Google Maps) : `src/data/demoOffers.ts`, voir la partie 4.
- **Pousses de la carte** (une forme par catégorie, qui grandit et fleurit au clic) : `src/lib/plants.ts` pour les dessins, classes `.rs-plant` de `src/index.css` pour l'animation.
- **Page commerces** : exports `partnerInvite` (encart de l'accueil) et `partnerPage` (page, formulaire, FAQ) de `src/content.ts`.
- **Questions du questionnaire** : export `survey` en bas de `src/content.ts`. Vous pouvez ajouter, retirer ou reformuler des questions et des options sans toucher à la base de données.
- **Mention « nom et design provisoires »** : `site.provisionalNotice` dans `src/content.ts`
- **Couleurs** : deux palettes sont disponibles, choisies avec `VITE_THEME` dans `.env` (et dans les variables Netlify) :
  - `VITE_THEME=nouvelle` (par défaut) : palette de l'équipe, dans `src/themes/nouvelle.css` ;
  - `VITE_THEME=originale` : première palette proposée, définie dans le bloc `@theme` de `src/index.css`.

  Pour ajuster une couleur, modifiez son code dans le fichier de la palette : tout le site suit, y compris l'illustration, le logo et les repères de la carte.
- **Logo** : composant `Logo` dans `src/components/ui.tsx` et `public/favicon.svg`
- **Image de partage** (`public/og-image.png`) et icône Apple : régénérez-les avec `npm i -D playwright && node scripts/generate-images.mjs`

## 4. La carte des partenaires

La carte utilise **Leaflet + OpenStreetMap** : gratuite, sans compte ni clé API. Chaque partenaire y a un repère coloré selon sa catégorie. Un clic sur le repère ouvre une bulle avec :
- le **nom du commerce** ;
- la **promotion** ;
- l'**adresse** ;
- un bouton **« Voir sur Google Maps »** vers la fiche Google Maps de l'établissement.

**Ajouter ou modifier des partenaires** : fichier `src/data/demoOffers.ts`. Chaque entrée contient :

```ts
{
  id: 'p1',                         // identifiant unique
  category: 'restauration',         // id d'une catégorie de content.ts
  title: 'Nom du commerce',
  offer: '-10 % sur l’addition',
  town: 'Le Pouliguen',
  address: '1 rue Exemple, 44510 Le Pouliguen',
  lat: 47.2725, lng: -2.4320,       // clic droit sur Google Maps → copier les coordonnées
  googleMapsUrl: 'https://maps.app.goo.gl/…', // bouton « Partager » de la fiche Google Maps
}
```

Sans `googleMapsUrl`, le bouton ouvre une recherche de la commune sur Google Maps (c'est le cas des exemples fictifs actuels).

> **Avant la mise en ligne avec de vrais partenaires**, retirez les offres fictives et la mention « Démonstration », dans `DemoMap.tsx` et le texte `demoMap.disclaimer` de `content.ts`.

**Fond de carte et limites** : les tuiles proviennent des serveurs publics d'OpenStreetMap, ce qui convient à une page de pré-lancement. Si le trafic devient important, la [politique d'usage d'OpenStreetMap](https://operations.osmfoundation.org/policies/tiles/) demande de passer par un fournisseur de tuiles (MapTiler, Stadia Maps, etc., avec offres gratuites) : il suffit de changer l'URL dans `src/components/leafletMap.ts` et le domaine `img-src` dans `netlify.toml`.

## 5. Configurer le stockage des inscriptions (Supabase)

### 5.1 Créer le projet
1. Créez un compte gratuit sur https://supabase.com, puis **New project**.
2. **Region : `West EU (Paris)`**. C'est important pour le RGPD.
3. Notez le mot de passe de la base, qui ne sert pas au site.

### 5.2 Créer la table
1. Dans le projet, ouvrez **SQL Editor → New query**.
2. Collez le contenu de [`supabase/schema.sql`](supabase/schema.sql), puis **Run**.

Ce script crée :
- la table `interest_signups`, avec une validation côté serveur (formats, listes autorisées, consentement obligatoire) ;
- une **unicité de l'e-mail**, sans tenir compte des majuscules (un doublon est ignoré sans message d'erreur, pour ne pas révéler qu'une adresse est déjà inscrite) ;
- une **règle d'accès en écriture seule** : le site public peut ajouter une inscription, mais jamais lire, modifier ou supprimer les données ;
- une vue `interest_stats`, qui donne des statistiques anonymes à présenter aux partenaires ;
- la table `survey_responses`, qui reçoit les réponses **anonymes** au questionnaire (au format JSON, avec seulement la date d'envoi, sans l'heure) ;
- la table `survey_contacts`, qui reçoit les e-mails des personnes d'accord pour un échange. Elle est **séparée et sans lien** avec les réponses ;
- la table `partner_leads`, qui reçoit les demandes des **commerces et entreprises** (formulaire de la page partenaires).

> Le script peut être relancé sans risque : il ne recrée pas ce qui existe déjà. Si vous aviez déjà exécuté une version précédente, relancez-le pour ajouter les tables du questionnaire.

### 5.3 Renseigner les clés
Copiez `.env.example` en `.env` :

```bash
cp .env.example .env
```

Puis remplissez les valeurs, que vous trouvez dans **Project Settings → API** (ou **API Keys**) :

```dotenv
VITE_STORAGE_PROVIDER=supabase
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=la_clé_publique_anon_ou_publishable
VITE_SUPABASE_TABLE=interest_signups
VITE_SITE_URL=https://votre-domaine.fr
```

> ⚠️ N'utilisez **que la clé publique** (`anon` ou `sb_publishable_…`). Elle est visible dans le navigateur, ce qui est normal : les règles d'accès limitent ce qu'elle permet. **Ne mettez jamais la clé `service_role` ou `secret`** dans ce fichier.

Relancez `npm run dev`, envoyez une inscription de test et vérifiez qu'elle apparaît dans **Table Editor → interest_signups**.

> ℹ️ Un projet Supabase gratuit **se met en pause après 7 jours sans activité**. Les inscriptions régulières suffisent à le garder actif. En cas de pause, relancez-le d'un clic dans le tableau de bord.

### 5.4 Changer de solution de stockage
Le formulaire ne connaît que l'interface `InterestStorage` (`src/lib/storage/types.ts`). Changer de solution est donc simple :

- **Formspree** (déjà prêt) : `VITE_STORAGE_PROVIDER=formspree` et `VITE_FORMSPREE_ID=votre_id`. Pensez à ajuster la politique de confidentialité, car l'hébergement est aux États-Unis, et l'en-tête CSP dans `netlify.toml`.
- **Autre solution** (Odoo, API maison…) : créez `src/lib/storage/monfournisseur.ts`, qui exporte un objet `{ name, submit, submitSurvey, submitContact }`, ajoutez un `case` dans `src/lib/storage/index.ts`, et ajoutez son domaine au `connect-src` de `netlify.toml`.

## 6. Exporter les inscrits et les réponses

- **CSV complet** : Supabase → **Table Editor** → `interest_signups` → bouton **Export → Export table as CSV**. Le fichier s'ouvre dans Excel ou LibreOffice.
- **Statistiques anonymes** pour démarcher les partenaires : **SQL Editor**, puis

  ```sql
  select * from interest_stats;
  ```
- **Requêtes utiles** :

  ```sql
  -- Inscrit·es par commune ou code postal
  select location, count(*) from interest_signups group by location order by 2 desc;

  -- Catégories les plus demandées
  select c as categorie, count(*) from interest_signups, unnest(categories) c group by c order by 2 desc;

  -- Évolution par semaine
  select date_trunc('week', created_at) as semaine, count(*) from interest_signups group by 1 order by 1;

  -- Supprimer une personne (demande RGPD)
  delete from interest_signups where lower(email) = lower('adresse@exemple.fr');
  delete from survey_contacts  where lower(email) = lower('adresse@exemple.fr');
  ```

- **Questionnaire.** Export brut : **Table Editor → survey_responses → Export as CSV** (la colonne `answers` contient le JSON). Pour une analyse directe :

  ```sql
  -- Nombre de réponses
  select count(*) from survey_responses;

  -- Une colonne par question (copiable dans un tableur)
  select created_on,
         answers->>'profession'  as metier,
         answers->>'sector'      as secteur,
         answers->>'structure'   as structure,
         answers->>'seniority'   as anciennete,
         answers->>'region'      as region,
         answers->>'satisfaction' as satisfaction,
         answers->'priorities'   as priorites,
         answers->'barriers'     as freins,
         answers->'features'     as fonctionnalites,
         answers->>'unmetNeed'   as besoin_non_couvert,
         answers->>'idea'        as idee
  from survey_responses order by created_on;

  -- Classement d'une question à choix multiples (remplacez 'priorities' par 'barriers', 'features', 'knownAids'…)
  select v as reponse, count(*)
  from survey_responses, jsonb_array_elements_text(answers->'priorities') v
  group by v order by 2 desc;

  -- Satisfaction moyenne (échelle 1 à 5)
  select round(avg((answers->>'satisfaction')::numeric), 2)
  from survey_responses where answers->>'satisfaction' ~ '^[1-5]$';
  ```

- **Contacts volontaires** : **Table Editor → survey_contacts → Export as CSV**.
- **Commerces intéressés** : **Table Editor → partner_leads → Export as CSV**, ou :

  ```sql
  select created_at, business_name, category, location, contact_name, role, email, phone,
         offer_type, google_maps_url, message
  from partner_leads order by created_at desc;

  -- Nombre de commerces intéressés par secteur
  select category, count(*) from partner_leads group by category order by 2 desc;
  ```

> Les exports contiennent des données personnelles : stockez-les dans un endroit sécurisé, ne les partagez pas avec les commerces (seulement des chiffres agrégés), et supprimez-les à la fin de la durée de conservation annoncée.

## 7. Déploiement sur Netlify

Le fichier `netlify.toml` contient déjà la commande de build, le dossier publié, le cache et les en-têtes de sécurité (CSP, etc.).

1. Poussez le projet sur GitHub, GitLab ou Bitbucket. Le fichier `.env` est exclu par `.gitignore`, c'est voulu.
2. Sur https://app.netlify.com : **Add new site → Import an existing project** → choisissez le dépôt. Les réglages de build sont détectés automatiquement.
3. **Site configuration → Environment variables** : ajoutez les mêmes variables que dans `.env` (`VITE_STORAGE_PROVIDER`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL`).
4. **Deploy**. Chaque nouvelle publication sur la branche principale redéploie le site.
5. *(Optionnel)* **Domain management** : branchez votre nom de domaine, puis mettez à jour `VITE_SITE_URL` et redéployez pour corriger les balises Open Graph.

Sans dépôt Git : lancez `npm run build`, puis glissez-déposez le dossier `dist/` sur https://app.netlify.com/drop. Les variables sont alors lues depuis votre `.env` local au moment du build.

> Vercel fonctionne aussi : importez le dépôt, ajoutez les mêmes variables d'environnement, puis reportez les en-têtes de `netlify.toml` dans un fichier `vercel.json` si vous le souhaitez.

## 8. Choix techniques, RGPD et accessibilité

- **Aucun cookie, aucun outil de mesure d'audience**, donc pas de bandeau cookies. Si vous ajoutez un outil de statistiques, choisissez une solution exemptée de consentement par la CNIL (par exemple Matomo correctement configuré) ou ajoutez un bandeau.
- **Carte chargée à l'approche de la section** : Leaflet ne pèse pas sur le premier affichage. OpenStreetMap ne dépose aucun cookie, et Google n'est contacté que si l'on clique sur « Voir sur Google Maps ». La liste des offres à côté de la carte sert d'alternative accessible au clavier et au lecteur d'écran.
- **Questionnaire anonyme par conception** : ni nom ni e-mail dans les réponses, seulement la date (pas l'heure), aucun lien avec le formulaire d'intérêt, contact facultatif enregistré dans une table séparée avec son propre consentement. Les champs libres rappellent de ne saisir ni nom ni information de santé. Un brouillon est conservé sur l'appareil (stockage local, jamais envoyé) en cas d'interruption, et effacé à l'envoi.
- **Données d'exemple clairement signalées** : bandeau « données fictives » sur la carte, mention « Exemple d'offre – illustratif » dans chaque fenêtre de repère, et aucun nom de commerce réel.
- **Pas de compteur d'inscrits ni de témoignage** : les « chiffres clés » ne décrivent que le projet lui-même.
- **Anti-spam** : champ invisible piège à robots, délai minimal de remplissage et contraintes côté base. En cas de spam massif, ajoutez une Edge Function Supabase avec Cloudflare Turnstile.
- **Accessibilité** : lien d'évitement, labels et messages d'erreur reliés aux champs (`aria-describedby`), focus déplacé sur le premier champ en erreur puis sur le message de confirmation, fenêtres `<dialog>` natives, contrastes AA, respect de `prefers-reduced-motion` (animations CSS et Framer Motion).
- **Résultat Lighthouse mesuré** (simulation mobile, build local, carte non chargée) : Performance 98, Accessibilité 100, Bonnes pratiques 100, SEO 100.
- **Aperçu sur claude.ai** : `vite.artifact.config.ts` produit une version en un seul fichier (`dist-preview/`). Ces pages bloquent les images externes, donc le fond de carte OpenStreetMap n'y apparaît pas (seulement les repères) : vérifiez la carte en local ou sur Netlify.

## Arborescence

```
├── index.html               # meta, Open Graph, lang="fr"
├── netlify.toml             # build + en-têtes de sécurité
├── .env.example
├── public/                  # favicon, og-image, robots.txt
├── scripts/generate-images.mjs
├── supabase/schema.sql
└── src/
    ├── content.ts           # ← tous les textes
    ├── data/demoOffers.ts   # ← offres fictives de la carte
    ├── index.css            # ← palette de couleurs
    ├── lib/icons.ts
    ├── lib/storage/         # couche de stockage remplaçable
    └── components/          # Hero, Benefits, HowItWorks, Categories, DemoMap,
                             # DevNotice, KeyFigures, InterestForm, FAQ, Footer…
```
