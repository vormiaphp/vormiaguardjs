import { useMutation } from "@tanstack/react-query";
import { getGlobalGuardClient } from "../core/GuardClient";

export function useVrmLogin({ onSuccess, onError, redirectTo } = {}) {
  const guardClient = getGlobalGuardClient();
  const mutation = useMutation({
    mutationFn: (credentials) => guardClient.login(credentials),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
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
    login: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
