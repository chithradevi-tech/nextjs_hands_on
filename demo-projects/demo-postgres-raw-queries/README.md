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

---

```text
CREATE DATABASE demo_postgres_raw;

\c demo_postgres_raw

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL
);

INSERT INTO users (username, role) VALUES
('Alice', 'operator'),
('Bob', 'supervisor');
```
