import { verifyToken, extractToken } from './auth.js';

export function authMiddleware(request) {
  const authHeader = request.headers.get('Authorization');
  const token = extractToken(authHeader);
  
  if (!token) {
    return { error: 'Authentication required', status: 401 };
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return { error: 'Invalid or expired token', status: 401 };
  }
  
  return { user: decoded };
}

export function optionalAuth(request) {
  const authHeader = request.headers.get('Authorization');
  const token = extractToken(authHeader);
  
  if (token) {
    return { user: verifyToken(token) };
  }
  
  return { user: null };
}

export function adminMiddleware(request) {
  const authResult = authMiddleware(request);
  if (authResult.error) {
    return authResult;
  }
  
  if (!authResult.user.isAdmin) {
    return { error: 'Admin access required', status: 403 };
  }
  
  return { user: authResult.user };
}
