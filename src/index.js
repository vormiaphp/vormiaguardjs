// VormiaGuardJS main entry

// Core
export {
  VormiaGuardClient,
  createGuardClient,
  getGlobalGuardClient,
} from "./core/GuardClient";

// React hooks/components
export { useVrmGuard } from "./hooks/useVrmGuard";
export { useVrmLogin } from "./hooks/useVrmLogin";
export { useVrmLogout } from "./hooks/useVrmLogout";
export { VrmGuard } from "./components/VrmGuard";
export { useVrmAuthStore } from "./hooks/useVrmAuthStore";

// Vue
export { useVormiaGuard as useVormiaGuardVue } from "./adapters/vue/useVormiaGuard";
// Svelte
export { createVormiaGuardStore } from "./adapters/svelte/vormiaGuardStore";
// Qwik
export { useVormiaGuard as useVormiaGuardQwik } from "./adapters/qwik/useVormiaGuard";
// Astro
export { useVormiaGuard as useVormiaGuardAstro } from "./adapters/astro/useVormiaGuard";
// Solid
export { createVormiaGuardResource } from "./adapters/solid/createVormiaGuardResource";
