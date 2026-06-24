# Security

## Browser Protections

Wordvexa is a static React app. The app includes a client-side CSP meta tag and Vite dev/preview headers, but production deployments should also set HTTP response headers at the hosting layer.

## Render Static Site Headers

In the Render Dashboard, open the static site settings and add these custom response headers for path `/*`:

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; frame-src 'none'; manifest-src 'self'; media-src 'self'; upgrade-insecure-requests
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

## AI Provider Keys

Do not store OpenAI, Anthropic, Gemini, or other provider API keys in browser-exposed `VITE_*` variables. Use a backend/proxy endpoint that stores keys server-side, validates payload sizes, authenticates requests, and applies rate limits.

## Local Data

The app stores drafts and preferences in `localStorage`. Treat pasted prompts and texts as local browser data, not as encrypted storage. Use Settings > Limpiar todo to remove local drafts.
