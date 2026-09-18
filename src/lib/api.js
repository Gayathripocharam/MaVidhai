const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// -------------------------------------------------------------
// Core Admin API Client (JWT + Super Admin Support)
// -------------------------------------------------------------
async function request(endpoint, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login?error=unauthorized";
      }
      throw new ApiError("Session expired or unauthorized. Please log in.", 401);
    }

    if (response.status === 403) {
      throw new ApiError("Forbidden: You do not have Super Admin access.", 403);
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        data?.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || "Network error occurred", 500);
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  patch: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

// -------------------------------------------------------------
// Existing Customer / Store Methods
// -------------------------------------------------------------
export async function getProducts(params = {}, signal) {
  const searchParams = new URLSearchParams();

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }
  if (params.category) {
    searchParams.set("category", params.category);
  }

  const query = searchParams.toString();
  const url = `${API_URL}/api/products${query ? `?${query}` : ""}`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Invalid credentials");
  }

  if (data?.token && typeof window !== "undefined") {
    localStorage.setItem("mavidhai_user", JSON.stringify(data.user || data));
  }
  return data;
}