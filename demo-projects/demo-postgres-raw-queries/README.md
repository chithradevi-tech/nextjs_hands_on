```text
demo-postgres-raw-queries/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ users/
│  │  │     └─ route.ts
│  │  ├─ page.tsx
│  │  └─ layout.tsx
│  │
│  ├─ lib/
│  │  └─ db.ts
│  │
│  ├─ models/
│  │  └─ user.ts
│  │
│  ├─ actions/
│  │  └─ userActions.ts
│  │
│  ├─ components/
│  │  └─ UserList.tsx
│  │
│  ├─ data/
│  │  └─ seed.ts
│  │
│  └─ styles/
│     └─ globals.css
│
├─ package.json
├─ tsconfig.json
└─ next.config.js

```
lib/ → DB connection

models/ → TS interfaces

actions/ → Raw SQL queries

api/ → Thin API layer calling actions

components/ → UI components

Database name: next_postgres_demo

Table: users

---

```text
CREATE DATABASE demo_postgres_raw;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL
);

INSERT INTO users (username, role) VALUES
('Alice', 'operator'),
('Bob', 'supervisor');
```
---

```text
1. Install pg
npm install pg

2. Install TypeScript types for pg
npm install --save-dev @types/pg
```

@types/pg gives TypeScript the type definitions it needs.

Make sure it’s installed as a dev dependency (--save-dev).

**3. Check your import**
```text
In lib/db.ts or wherever you import pg:

import { Pool } from 'pg';
```

No need for .js extension.

Make sure node_modules exists after installing.

**4. Restart VSCode / TypeScript server**

Sometimes VSCode still shows the error after installing. Do this:

Press Ctrl+Shift+P → TypeScript: Restart TS server

Or close and reopen VSCode

**5. Optional: Ensure TypeScript recognizes node_modules**

Your tsconfig.json should have:

```text

{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

moduleResolution: "node" ensures TypeScript finds modules from node_modules.

After this, the error Cannot find module 'pg' should disappear.

---