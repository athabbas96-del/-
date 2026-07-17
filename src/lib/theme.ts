export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ath-theme";

/** Executed as a literal inline <script> string — keep this dependency-free. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
