import React from "react";
import { useVrmGuard } from "vormiaguardjs";

export default function App() {
  const { isAuthenticated, user, login, logout } = useVrmGuard();

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
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