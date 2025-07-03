import { writable, derived } from "svelte/store";
import { getGlobalGuardClient } from "../../core/GuardClient";

export function createVormiaGuardStore() {
  const user = writable(null);
  const isLoading = writable(true);
  const error = writable(null);

  getGlobalGuardClient()
    .fetchUser()
    .then((u) => {
      user.set(u);
      isLoading.set(false);
    })
    .catch((e) => {
      error.set(e);
      isLoading.set(false);
    });

  const isAuthenticated = derived(user, ($user) => !!$user);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
  };
}
