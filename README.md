# vormiaphp/vormiaguardjs

**Laravel Sanctum-compatible frontend access control for React, Vue, Svelte, Qwik, Astro, and Solid.**

---

VormiaGuardJS is designed to work seamlessly with Laravel backends, but secure access control requires backend support for:

- Authenticated user info (`/api/user`)
- Role and permission checks
- Backend-driven access control (`/api/can-access`)
- Guard/role middleware

**VormiaGuardPHP** is the official Laravel backend package that provides these endpoints and middleware. It ensures your frontend and backend are fully integrated for secure, role-based access control. If you use VormiaGuardJS with Laravel, install VormiaGuardPHP for best results.

> **Laravel Users:**
> If you are using Laravel, check out the official VormiaGuard PHP package for backend integration:

---

- Maintains Laravel session via Sanctum (cookies)
- Authenticated user state (`GET /api/user`)
- Route/component-level access control (roles, user presence)
- SPA (React Router) and MPA (SEO-friendly) support
- Uses [VormiaQueryJS](https://www.npmjs.com/package/vormiaqueryjs) for all API calls

---

> For backend setup, route registration, and middleware configuration, see the [VormiaGuardPHP README](https://github.com/vormiaphp/vormiaguardphp#readme) for complete instructions.

For full documentation and usage examples, visit:

- [GitHub Repository](https://github.com/vormiaphp/vormiaguardphp) <!-- Replace with actual repo if different -->
- [Packagist Package](https://packagist.org/packages/vormiaphp/vormiaguardphp) <!-- Replace with actual package if applicable -->

## Installation

Install VormiaGuardJS and its peer dependencies:

```bash
npm install vormiaguardjs
npm install vormiaqueryjs
npm install zustand
```

> **Note:**
>
> - `vormiaqueryjs` is a required peer dependency.
> - This package uses [Zustand](https://github.com/pmndrs/zustand) for state management.

---

## Quick Start (React SPA)

```js
import { createVormiaClient } from "vormiaqueryjs";
import { createGuardClient } from "vormiaguardjs/src/core/GuardClient";

// 1. Setup VormiaQueryJS client
createVormiaClient({ baseURL: "http://localhost", withCredentials: true });

// 2. Setup VormiaGuardJS client
createGuardClient({
  apiBaseUrl: "http://localhost",
  mode: "spa", // or 'mpa'
  redirects: { onFail: "/login", onSuccess: "/" },
});
```

### Protecting Routes (React)

```jsx
import { VrmGuard } from "vormiaguardjs/src/components/VrmGuard";

<VrmGuard roles={["admin"]} redirectTo="/login">
  <AdminDashboard />
</VrmGuard>;
```

### Login/Logout Hooks (React)

```js
import { useVrmLogin, useVrmLogout } from "vormiaguardjs/src/hooks/useVrmLogin";

const { login, isLoading, error } = useVrmLogin({ redirectTo: "/" });
const { logout } = useVrmLogout({ redirectTo: "/login" });
```

---

## Multi-Framework Usage

### Vue

```js
import { useVormiaGuard } from "vormiaguardjs/src/adapters/vue/useVormiaGuard";
const { user, isLoading, isAuthenticated } = useVormiaGuard();
```

### Svelte

```js
import { createVormiaGuardStore } from "vormiaguardjs/src/adapters/svelte/vormiaGuardStore";
const { user, isAuthenticated } = createVormiaGuardStore();
```

### Qwik

```js
import { useVormiaGuard } from "vormiaguardjs/src/adapters/qwik/useVormiaGuard";
const { user, isAuthenticated } = useVormiaGuard();
```

### Astro

```js
import { useVormiaGuard } from "vormiaguardjs/src/adapters/astro/useVormiaGuard";
const { user, isAuthenticated } = useVormiaGuard();
```

### Solid

```js
import { createVormiaGuardResource } from "vormiaguardjs/src/adapters/solid/createVormiaGuardResource";
const [user, { isAuthenticated }] = createVormiaGuardResource();
```

---

## Configuration

- `apiBaseUrl`: Laravel API base URL
- `mode`: 'spa' (React Router) or 'mpa' (window.location)
- `redirects`: `{ onFail, onSuccess }` for login/logout

---

## Example: Login Page (React)

```jsx
import { useVrmLogin } from "vormiaguardjs/src/hooks/useVrmLogin";

function LoginPage() {
  const { login, isLoading, error } = useVrmLogin({ redirectTo: "/" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    login({
      email: form.email.value,
      password: form.password.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" type="password" />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div>{error.message}</div>}
    </form>
  );
}
```

---

## Auth Store (Zustand)

```js
import { useVrmAuthStore } from "vormiaguardjs/src/hooks/useVrmAuthStore";
const user = useVrmAuthStore((s) => s.user);
```

---

## For Laravel + React Developers

- No boilerplate for Sanctum session, user state, or role checks
- Works with any Laravel backend using Sanctum
- Not a form manager or UI library: just session, role, and access logic

---

## Example Usage

See runnable example projects:

- [SPA Example (React)](./examples/spa/App.jsx)
- [MPA Example (HTML/JS)](./examples/mpa/index.html)

### Single Page Application (SPA)

```js
import { useVrmGuard } from "vormiaguardjs";

function App() {
  const { isAuthenticated, user, login, logout } = useVrmGuard();

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>VormiaGuardJS SPA Example</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Multi Page Application (MPA)

```js
import { GuardClient } from "vormiaguardjs";

const guard = new GuardClient({
  endpoint: "/api/auth",
});

if (guard.isAuthenticated()) {
  // Render protected content
  document.getElementById("app").innerHTML = `Welcome, ${
    guard.getUser().name
  }! <button id="logout">Logout</button>`;
  document.getElementById("logout").onclick = () => guard.logout();
} else {
  // Render login button
  document.getElementById("app").innerHTML =
    '<button id="login">Login</button>';
  document.getElementById("login").onclick = () => guard.login();
}
```

## User Guide

### Advanced Access Control with Backend Check

You can combine frontend role checks with backend-driven authorization for maximum security and flexibility.

#### Example: Protecting a Route with Backend Check

```jsx
import { VrmGuard } from "vormiaguardjs/src/components/VrmGuard";

<VrmGuard
  roles={["admin"]} // Frontend role check (for UX)
  backendCheck // Enable backend check
  route="/admin" // Route to check on backend (defaults to current path)
  middleware="role:admin" // Laravel middleware to check (optional)
>
  <AdminDashboard />
</VrmGuard>;
```

- If `backendCheck` is true, VormiaGuardJS will call your backend to verify access before rendering children.
- If not allowed, the user is redirected (uses `redirectTo` prop or global config).

#### Global Redirects

You can set a global redirect for failed access in your GuardClient config:

```js
createGuardClient({
  apiBaseUrl: "http://localhost",
  mode: "spa",
  redirects: { onFail: "/login", onSuccess: "/" },
});
```

- The `onFail` value is used if no `redirectTo` is provided to `<VrmGuard>`.

#### Targeting Specific Middleware

You can pass a `middleware` prop to target a specific Laravel middleware for backend checks:

```jsx
<VrmGuard backendCheck route="/admin" middleware="role:admin">
  <AdminDashboard />
</VrmGuard>
```

### SSR/SEO/MPA Support

- VormiaGuardJS can be used in SSR/MPA apps by calling `canAccess` before rendering a page.
- For MPA, redirects use `window.location.href`.
- For SPA, React Router's `<Navigate>` is used if available.

---

For more examples, see the [examples/](./examples/) directory.

---

## Framework-Based Examples

### React (SPA/MPA)

```jsx
import { VrmGuard } from "vormiaguardjs/src/components/VrmGuard";

function AdminPage() {
  return (
    <VrmGuard
      roles={["admin"]}
      backendCheck
      route="/admin"
      middleware="role:admin"
    >
      <h1>Admin Dashboard</h1>
    </VrmGuard>
  );
}
```

### Vue

```js
<script setup>
import { useVormiaGuard } from "vormiaguardjs/src/adapters/vue/useVormiaGuard";
const { user, isLoading, isAuthenticated } = useVormiaGuard();
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!isAuthenticated || !user.roles.includes('admin')">
    Access Denied
  </div>
  <div v-else>
    <h1>Admin Dashboard</h1>
  </div>
</template>
```

### Svelte

```svelte
<script>
  import { createVormiaGuardStore } from "vormiaguardjs/src/adapters/svelte/vormiaGuardStore";
  const { user, isLoading, isAuthenticated } = createVormiaGuardStore();
</script>
{#if $isLoading}
  <p>Loading...</p>
{:else if !$isAuthenticated || !$user?.roles?.includes('admin')}
  <p>Access Denied</p>
{:else}
  <h1>Admin Dashboard</h1>
{/if}
```

### Qwik

```js
import { useVormiaGuard } from "vormiaguardjs/src/adapters/qwik/useVormiaGuard";

export default function AdminPage() {
  const { user, isLoading, isAuthenticated } = useVormiaGuard();
  if (isLoading.value) return <div>Loading...</div>;
  if (!isAuthenticated() || !user.value?.roles?.includes("admin"))
    return <div>Access Denied</div>;
  return <h1>Admin Dashboard</h1>;
}
```

### Astro

```jsx
import { useVormiaGuard } from "vormiaguardjs/src/adapters/astro/useVormiaGuard";

export default function AdminPage() {
  const { user, isLoading, isAuthenticated } = useVormiaGuard();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated || !user?.roles?.includes("admin"))
    return <div>Access Denied</div>;
  return <h1>Admin Dashboard</h1>;
}
```

### Solid

```js
import { createVormiaGuardResource } from "vormiaguardjs/src/adapters/solid/createVormiaGuardResource";

const [user] = createVormiaGuardResource();

export default function AdminPage() {
  return (
    <Show
      when={user() && user().roles && user().roles.includes("admin")}
      fallback={<div>Access Denied</div>}
    >
      <h1>Admin Dashboard</h1>
    </Show>
  );
}
```

---

## License

MIT License

Copyright (c) 2025 Vormia

---
