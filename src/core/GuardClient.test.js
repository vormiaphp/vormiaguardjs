import { describe, it, expect } from "vitest";
import { GuardClient } from "./GuardClient.js";

describe("GuardClient", () => {
  it("should instantiate without errors", () => {
    const client = new GuardClient({ endpoint: "/api/auth" });
    expect(client).toBeInstanceOf(GuardClient);
  });
});
