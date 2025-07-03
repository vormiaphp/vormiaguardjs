import { useMutation } from "@tanstack/react-query";
import { getGlobalGuardClient } from "../core/GuardClient";

export function useVrmLogout({ onSuccess, onError, redirectTo } = {}) {
  const guardClient = getGlobalGuardClient();
  const mutation = useMutation({
    mutationFn: () => guardClient.logout(),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      if (redirectTo) {
        if (guardClient.config.mode === "spa" && window.history.pushState) {
          window.location.assign(redirectTo);
        } else {
          window.location.href = redirectTo;
        }
      }
    },
    onError,
  });
  return {
    logout: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
