import { useState, useEffect } from "react";
import { getGlobalGuardClient } from "../../core/GuardClient";

export function useVormiaGuard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGlobalGuardClient()
      .fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}
