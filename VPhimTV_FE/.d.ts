interface ImportMetaEnv {
  readonly VITE_MOVIE_API: string;
  readonly VITE_APP_API: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
