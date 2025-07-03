// Core GuardClient for VormiaGuardJS
import {
  getGlobalVormiaClient,
  createVormiaClient,
} from "vormiaqueryjs/src/client/createVormiaClient";

let globalGuardClient = null;

export class VormiaGuardClient {
  constructor(config) {
    this.config = {
      apiBaseUrl: "",
      mode: "spa", // 'spa' or 'mpa'
      redirects: {
        onFail: "/login",
        onSuccess: "/",
      },
      ...config,
    };
    this.vormiaClient = config.vormiaClient || getGlobalVormiaClient();
    this.user = null;
    this.isLoading = false;
    this.error = null;
  }

  async fetchUser() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await this.vormiaClient.get("/api/user", {
        withCredentials: true,
      });
      this.user = res.data;
      this.isLoading = false;
      return this.user;
    } catch (err) {
      this.user = null;
      this.error = err;
      this.isLoading = false;
      return null;
    }
  }

  async login(credentials) {
    await this.vormiaClient.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });
    const res = await this.vormiaClient.post("/login", credentials, {
      withCredentials: true,
    });
    await this.fetchUser();
    return res;
  }

  async logout() {
    await this.vormiaClient.post("/logout", {}, { withCredentials: true });
    this.user = null;
  }

  isAuthenticated() {
    return !!this.user;
  }

  hasRole(roles) {
    if (!this.user || !this.user.roles) return false;
    if (!roles) return true;
    if (Array.isArray(roles)) {
      return roles.some((role) => this.user.roles.includes(role));
    }
    return this.user.roles.includes(roles);
  }

  async canAccess(route, middleware = null) {
    try {
      let url = `/api/can-access?route=${encodeURIComponent(route)}`;
      if (middleware) {
        url += `&middleware=${encodeURIComponent(middleware)}`;
      }
      const res = await this.vormiaClient.get(url, { withCredentials: true });
      return res.data.allowed;
    } catch {
      return false;
    }
  }
}

export function createGuardClient(config) {
  globalGuardClient = new VormiaGuardClient(config);
  return globalGuardClient;
}

export function getGlobalGuardClient() {
  if (!globalGuardClient)
    throw new Error(
      "Guard client not initialized. Call createGuardClient first."
    );
  return globalGuardClient;
}
