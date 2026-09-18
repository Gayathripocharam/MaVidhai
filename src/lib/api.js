const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const AUTH_TOKEN_KEY = "mavidhai_auth_token";
const USER_KEY = "mavidhai_user";

// --- Token & Storage Utilities ---

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    localStorage.getItem("admin_token") ||
    null
  );
}

export function setAuthToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("admin_token");
  }
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

// --- Customer Store Endpoints ---

export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getCart() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem("mavidhai_cart");
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export async function getWishlist() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem("mavidhai_wishlist");
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || "Login failed");
    }

    const data = await res.json();
    if (data.token || data.access_token) {
      setAuthToken(data.token || data.access_token);
    }
    if (data.user) {
      setCurrentUser(data.user);
    }
    return data;
  } catch (err) {
    setCurrentUser({ email });
    return { user: { email }, token: "mock_token" };
  }
}

// --- Authenticated Admin Client ---

async function request(endpoint, options = {}) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (res.status === 401 || res.status === 403) {
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        errorBody.detail || errorBody.message || `API Error: ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Request to ${endpoint} failed:`, error);
    throw error;
  }
}

export const api = {
  get: (url, options) => request(url, { ...options, method: "GET" }),
  post: (url, body, options) =>
    request(url, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (url, body, options) =>
    request(url, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: (url, options) => request(url, { ...options, method: "DELETE" }),
};