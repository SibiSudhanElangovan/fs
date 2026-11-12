# CS1510-FullStack-Lab

A collection of ten independent lab experiments for **CS1510 – Full Stack Development Lab**. The experiment topics and core workflows follow the supplied 2025–2026 lab manual (Experiments 1–10), with validation, responsive styling, error handling, and run instructions added so each example is straightforward to execute.

## Requirements
- Git
- Node.js 18+ and npm (Experiments 7–10; React projects use Create React App scripts)
- MongoDB Community Server running locally for Experiments 8–10
- A modern browser

## Experiments

| Folder | Experiment | Main technologies | Start here |
|---|---|---|---|
| `Exp1` | Department webpage | HTML, CSS | Open `index.html` |
| `Exp2` | Chat module | HTML, CSS, JavaScript | Open `index.html` |
| `Exp3` | Calculator | AngularJS 1.8.2 | Open `index.html` (internet needed for CDN) |
| `Exp4` | Login + To-do list | AngularJS 1.8.2, ngRoute | Serve folder over HTTP; see `Exp4/README.md` |
| `Exp5` | Microblog | React | `cd Exp5 && npm install && npm start` |
| `Exp6` | Food delivery | React | `cd Exp6 && npm install && npm start` |
| `Exp7` | Shopping cart | Node.js, Express, express-session | `cd Exp7 && npm install && npm start` |
| `Exp8` | Leave management | Express, MongoDB, Mongoose, HTML/JS | `cd Exp8/backend && npm install && npm start` |
| `Exp9` | Project dashboard | Express, MongoDB, React, Axios | See `Exp9/README.md` |
| `Exp10` | Online survey | Express, MongoDB, React | See `Exp10/README.md` |

Each experiment is self-contained. Run its commands from that experiment's directory; do not combine the package installations.

## Important scope and security note
These are **educational lab implementations**, not deployable production services. Exp2 uses predefined chatbot replies; Exp4 uses mock in-memory users/tasks; Exp5–6 keep data in React state; Exp7 uses in-memory products/users/cart and the default session store; Exp8–10 use a local MongoDB database. Before real deployment, add persistent user storage, password hashing, secure session/JWT configuration, authorization, CSRF/rate-limit protections, input auditing, logging, tests, backups, HTTPS, and managed secrets. Never expose credentials or production secrets in source control.

## Suggested Git workflow
From the repository root, initialize Git and commit the project. The final command block supplied with this project is also included in the response that generated it.
