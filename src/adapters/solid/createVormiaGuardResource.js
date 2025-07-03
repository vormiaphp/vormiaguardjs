import { createResource } from "solid-js";
import { getGlobalGuardClient } from "../../core/GuardClient";

export function createVormiaGuardResource() {
  const [user] = createResource(() => getGlobalGuardClient().fetchUser());
  const isAuthenticated = () => !!user();
  return [user, { isAuthenticated }];
}
