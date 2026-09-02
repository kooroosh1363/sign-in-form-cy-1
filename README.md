# Latch — Accessible Authentication UI

[![Quality](https://github.com/kooroosh1363/sign-in-form-cy-1/actions/workflows/quality.yml/badge.svg)](https://github.com/kooroosh1363/sign-in-form-cy-1/actions/workflows/quality.yml)
[![Deploy](https://github.com/kooroosh1363/sign-in-form-cy-1/actions/workflows/pages.yml/badge.svg)](https://github.com/kooroosh1363/sign-in-form-cy-1/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-6ef2c2.svg)](LICENSE)

Latch is a polished authentication interface focused on clear feedback, accessible interaction, and honest security boundaries. It demonstrates a complete sign-in and password-recovery experience without transmitting or storing credentials.

## Features

- Semantic email and password fields with password-manager metadata
- Real-time, accessible client-side validation
- Show and hide password control
- Caps Lock detection
- Remember-device control
- Loading, validation, authentication-error, and success states
- Password-recovery flow with focus management
- Demonstration states for invalid credentials and a locked account
- Passkey capability boundary with clear feedback
- Responsive split-screen composition
- Keyboard navigation, visible focus, live announcements, and reduced-motion support
- Zero runtime dependencies, external requests, analytics, or credential storage

## Try the interaction states

Any valid email address and password of 8–128 characters completes the sign-in demonstration, except:

- Use `incorrect` as the password to see the invalid-credentials state.
- Use `locked@example.com` to see the locked-account state.

These are deterministic interface demonstrations—not real accounts or authentication credentials.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Test

Node.js 20 or newer is required.

```bash
npm test
```

Run syntax checks and tests together:

```bash
npm run check
```

## Project structure

```text
.
├── index.html                       # Semantic authentication interface
├── assets/
│   ├── css/styles.css               # Visual system and responsive states
│   └── js/
│       ├── app.js                   # UI orchestration and focus management
│       ├── auth-demo.js             # Deterministic asynchronous demo states
│       └── validation.js            # Pure validation functions
├── tests/validation.test.js         # Unit tests for input rules
└── .github/workflows/               # Quality and Pages automation
```

## Security boundary

Latch is a front-end reference implementation, not an authentication server. Client-side validation improves usability but is not a security control. A production integration must validate every request on the server, use TLS, rate limiting, secure session cookies, CSRF protection where applicable, safe account-recovery tokens, generic error messages, and a proven identity provider or carefully reviewed authentication service.

Never store passwords in browser storage or embed working credentials in front-end code.

## Accessibility

The interface uses explicit labels, appropriate autocomplete attributes, descriptive errors, `aria-invalid`, live status regions, a native modal dialog, keyboard-operable controls, managed focus, visible focus states, sufficient contrast, and reduced-motion behavior.

## License

Licensed under the [MIT License](LICENSE).
