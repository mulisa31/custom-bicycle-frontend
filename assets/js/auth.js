// Helper functions for reading and storing user session info in localStorage.

// read the user object from localStorage and handle different shapes
function parseStoredUser() {
  const raw = localStorage.getItem("user");
  if (!raw || raw === "undefined" || raw === "null") return null;
  try {
    let user = JSON.parse(raw);
    // Sometimes the user object is stored as a string by mistake
    if (typeof user === "string") user = JSON.parse(user);
    // Some login flows wrap the user inside another user property
    if (user && user.user && typeof user.user === "object") user = user.user;
    return user && typeof user === "object" ? user : null;
  } catch {
    return null;
  }
}

// decode a JWT token to get the user payload
function userFromJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// combine stored user and JWT user into one session object
function getSessionUser() {
  const stored = parseStoredUser();
  const token = localStorage.getItem("token");
  const jwtUser = userFromJwt(token);
  if (!stored && !jwtUser) return null;
  return {
    id: stored && stored.id != null ? stored.id : jwtUser && jwtUser.id,
    name:
      (stored && stored.name) ||
      (jwtUser && jwtUser.name) ||
      "",
    email:
      (stored && stored.email) ||
      (jwtUser && jwtUser.email) ||
      "",
    role:
      (stored && stored.role) ||
      (jwtUser && jwtUser.role) ||
      "",
    fullName: stored && stored.fullName,
    username: stored && stored.username,
    firstName: stored && stored.firstName,
    lastName: stored && stored.lastName,
  };
}

// return a human-readable name from the user object, falling back to "Admin"
function getDisplayName(user) {
  if (!user) return "Admin";
  const fromParts = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  const candidates = [
    typeof user.name === "string" ? user.name.trim() : "",
    typeof user.fullName === "string" ? user.fullName.trim() : "",
    typeof user.username === "string" ? user.username.trim() : "",
    fromParts,
    user.email ? String(user.email).split("@")[0] : "",
  ];
  return candidates.find(Boolean) || "Admin";
}

// save token and user info to localStorage
function saveSession(token, user) {
  const sessionUser = user && user.user && typeof user.user === "object" ? user.user : user;
  if (token) localStorage.setItem("token", token);
  if (sessionUser) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: sessionUser.id,
        name: sessionUser.name || sessionUser.fullName || sessionUser.username || "",
        email: sessionUser.email,
        role: sessionUser.role,
        contact: sessionUser.contact,
        address: sessionUser.address,
        province: sessionUser.province,
        city: sessionUser.city,
        postalCode: sessionUser.postalCode,
        preference: sessionUser.preference,
      }),
    );
  }
}