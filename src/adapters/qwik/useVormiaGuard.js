import { useSignal, useTask$ } from "@builder.io/qwik";
import { getGlobalGuardClient } from "../../core/GuardClient";

export function useVormiaGuard() {
  const user = useSignal(null);
  const isLoading = useSignal(true);
  const error = useSignal(null);

  useTask$(async () => {
    try {
      user.value = await getGlobalGuardClient().fetchUser();
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: () => !!user.value,
  };
}
