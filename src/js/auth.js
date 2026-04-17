const TOKEN_KEY = 'stackers_token';
const USER_KEY = 'stackers_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated() {
  return !!getToken();
}

export async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  setToken(data.token);
  setUser(data.user);
  
  return data;
}

export async function register(username, email, password) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }
  
  if (data.token) {
    setToken(data.token);
    setUser(data.user);
    sessionStorage.setItem('showGoldApiModal', 'true');
  }
  
  return data;
}

export async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  removeToken();
}

export async function getProfile() {
  const response = await fetch('/api/user/profile', {
    headers: authHeader()
  });
  
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login.html';
    return null;
  }
  
  return response.json();
}

export function authHeader() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function apiRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeader(),
    ...options.headers
  };
  
  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login.html';
    throw new Error('Session expired');
  }
  
  return response;
}
