import { ref, computed } from "vue";
import { getGlobalGuardClient } from "../../core/GuardClient";

export function useVormiaGuard() {
  const user = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  const guardClient = getGlobalGuardClient();
  guardClient
    .fetchUser()
    .then((u) => {
      user.value = u;
      isLoading.value = false;
    })
    .catch((e) => {
      error.value = e;
      isLoading.value = false;
    });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: computed(() => !!user.value),
  };
}
