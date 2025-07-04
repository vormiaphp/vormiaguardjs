import { describe, it, expect } from "vitest";
import { VormiaGuardClient } from "../src/core/GuardClient.js";

const mockVormiaClient = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({}),
};

describe("VormiaGuardClient", () => {
  it("should instantiate without errors", () => {
    const client = new VormiaGuardClient({
      endpoint: "/api/auth",
      vormiaClient: mockVormiaClient,
    });
    expect(client).toBeInstanceOf(VormiaGuardClient);
  });

  it("should have expected methods", () => {
    const client = new VormiaGuardClient({
      endpoint: "/api/auth",
      vormiaClient: mockVormiaClient,
    });
    expect(typeof client.fetchUser).toBe("function");
    expect(typeof client.login).toBe("function");
    expect(typeof client.logout).toBe("function");
    expect(typeof client.isAuthenticated).toBe("function");
    expect(typeof client.hasRole).toBe("function");
    expect(typeof client.canAccess).toBe("function");
  });
});
