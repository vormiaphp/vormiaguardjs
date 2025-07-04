# vormiaphp/vormiaguardjs

**Laravel Sanctum-compatible frontend access control for React, Vue, Svelte, Qwik, Astro, and Solid.**

<!-- Consider adding badges for npm version, license, and CI status here -->

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
import { createVormiaClient, createGuardClient } from "vormiaguardjs";

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
import { VrmGuard } from "vormiaguardjs";

<VrmGuard roles={["admin"]} redirectTo="/login">
  <AdminDashboard />
</VrmGuard>;
```

### Login/Logout Hooks (React)

```js
import { useVrmLogin, useVrmLogout } from "vormiaguardjs";

const { login, isLoading, error } = useVrmLogin({ redirectTo: "/" });
const { logout } = useVrmLogout({ redirectTo: "/login" });
```

---

## Multi-Framework Usage

> **Note:** All main exports are available at the root of the package. If you need framework-specific adapters and they are not available at the root, check the documentation or request their export in future releases.

### Vue

```js
import { useVormiaGuard } from "vormiaguardjs";
const { user, isLoading, isAuthenticated } = useVormiaGuard();
```

### Svelte

```js
import { createVormiaGuardStore } from "vormiaguardjs";
const { user, isAuthenticated } = createVormiaGuardStore();
```

### Qwik

```js
import { useVormiaGuard } from "vormiaguardjs";
const { user, isAuthenticated } = useVormiaGuard();
```

### Astro

```js
import { useVormiaGuard } from "vormiaguardjs";
const { user, isAuthenticated } = useVormiaGuard();
```

### Solid

```js
import { createVormiaGuardResource } from "vormiaguardjs";
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
import { useVrmLogin } from "vormiaguardjs";

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
import { useVrmAuthStore } from "vormiaguardjs";
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

---

## License

MIT License

Copyright (c) 2025 Vormia

---
