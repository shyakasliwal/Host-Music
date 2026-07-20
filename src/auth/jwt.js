const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value) {
  return decodeURIComponent(escape(atob(value)));
}

export function createMockJwt(username, role) {
  const header = encodeBase64(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = encodeBase64(
    JSON.stringify({
      sub: username,
      role,
      exp: Date.now() + TOKEN_TTL_MS,
    }),
  );

  return `${header}.${payload}.mock-signature`;
}

export function parseMockJwt(token) {
  try {
    const [, payloadPart] = token.split('.');
    if (!payloadPart) {
      return null;
    }

    const payload = JSON.parse(decodeBase64(payloadPart));

    if (!payload.sub || !payload.role || payload.exp < Date.now()) {
      return null;
    }

    return {
      username: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function getRoleFromToken(token) {
  if (!token) {
    return null;
  }

  return parseMockJwt(token)?.role ?? null;
}
