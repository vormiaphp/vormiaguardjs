import { useQuery } from "@tanstack/react-query";
import { getGlobalGuardClient } from "../core/GuardClient";

export function useVrmGuard() {
  const guardClient = getGlobalGuardClient();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vormiaguard", "user"],
    queryFn: () => guardClient.fetchUser(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    refetch,
  };
}
