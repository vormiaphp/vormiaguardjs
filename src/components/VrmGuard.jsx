import React, { useEffect, useState } from 'react';
import { useVrmGuard } from '../hooks/useVrmGuard';
import { getGlobalGuardClient } from '../core/GuardClient';

export function VrmGuard({
  children,
  roles,
  fallback = null,
  redirectTo,
  mode,
  backendCheck = false,
  route = null,
  middleware = null,
}) {
  const { user, isLoading, isAuthenticated } = useVrmGuard();
  const guardClient = getGlobalGuardClient();
  const guardMode = mode || (window.history.pushState ? 'spa' : 'mpa');
  const [canAccess, setCanAccess] = useState(!backendCheck);
  const [checking, setChecking] = useState(backendCheck);

  // Frontend role check
  const hasRole = roles
    ? user && user.roles && roles.some((role) => user.roles.includes(role))
    : !!user;

  // Backend check
  useEffect(() => {
    let isMounted = true;
    if (backendCheck && (route || window.location.pathname)) {
      setChecking(true);
      guardClient
        .canAccess(route || window.location.pathname, middleware)
        .then((allowed) => {
          if (isMounted) setCanAccess(allowed);
        })
        .finally(() => {
          if (isMounted) setChecking(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [backendCheck, route, middleware, user]);

  // Determine redirect target
  const redirectTarget =
    redirectTo ||
    (guardClient.config.redirects && guardClient.config.redirects.onFail) ||
    '/login';

  if (isLoading || checking) return null;
  if (!isAuthenticated || !hasRole || (backendCheck && !canAccess)) {
    if (redirectTarget) {
      if (guardMode === 'spa') {
        try {
          const { Navigate } = require('react-router-dom');
          return <Navigate to={redirectTarget} replace />;
        } catch {
          window.location.href = redirectTarget;
          return null;
        }
      } else {
        window.location.href = redirectTarget;
        return null;
      }
    }
    return fallback;
  }
  return children;
} 