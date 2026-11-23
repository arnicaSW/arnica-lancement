/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE_PROVIDER?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SUPABASE_TABLE?: string;
  readonly VITE_SUPABASE_SURVEY_TABLE?: string;
  readonly VITE_SUPABASE_CONTACT_TABLE?: string;
  readonly VITE_SUPABASE_PARTNER_TABLE?: string;
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
