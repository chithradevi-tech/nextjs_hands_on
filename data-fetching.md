**⚡ Fetching Data in Next.js (App Router)**

**Where can you fetch data?**

In Next.js App Router:

- Server Components (default) → best place to fetch data

- Client Components ("use client") → fetch only when needed (e.g., user interaction, client-side updates)

- Special files like layout.tsx, page.tsx, generateStaticParams, generateMetadata

**1. Server-Side Data Fetching (default in App Router)**

✅ Fetch directly in your page.tsx or any server component.

```text
// app/page.tsx (Server Component)
export default async function Page() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
👉 This runs on the server, so API keys/secrets are safe.

**2. Fetching in Client Components**

✅ Needed when data depends on user interaction (e.g., form submit, button click).

```text
"use client";
import { useState, useEffect } from "react";

export default function ClientData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((u: any) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

👉 Runs in browser after hydration.

**3. Static Rendering with generateStaticParams**

✅ Prebuild pages at build time.

```text
// app/blog/[id]/page.tsx
export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return <h1>{post.title}</h1>;
}
```

**4. Streaming with Suspense + loading.tsx**

✅ Fetch slow data without blocking whole page.

```text
// app/dashboard/page.tsx
import { Suspense } from "react";
import Reports from "./Reports";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading reports...</p>}>
        <Reports />
      </Suspense>
    </div>
  );
}
```

**5. Data Fetching Cache Options**

Next.js extends fetch with caching strategies:

```text
// Always fresh (SSR)
await fetch(url, { cache: "no-store" });

// Static cache (default) - cached at build time
await fetch(url, { cache: "force-cache" });

// Revalidate every 60s (ISR)
await fetch(url, { next: { revalidate: 60 } });
```

| Method                 | Where             | When                         | Use Case                   |
| ---------------------- | ----------------- | ---------------------------- | -------------------------- |
| Server fetch (default) | Server Components | Build time / Request time    | Most common, secure        |
| Client fetch           | Client Components | After hydration              | User input, live updates   |
| `generateStaticParams` | Build time        | Before build                 | Prebuilding dynamic routes |
| ISR (`revalidate`)     | Hybrid            | After request, refresh later | Semi-static content        |
| Streaming + Suspense   | Both              | Incremental chunks           | Dashboards, AI apps        |

**✅ Rule of Thumb**

Prefer Server Components for data fetching (faster, secure, less JS on client).

Use Client Components only when data depends on user interaction.

---

**2. ⚡ Sequential vs Parallel Data Fetching in Next.js**

🔹 Sequential Fetching

Fetches one after another (waits for the first before starting the second).

❌ Slower if APIs can be fetched independently.

```text
// app/page.tsx
export default async function Page() {
  // Fetch #1
  const res1 = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res1.json();

  // Fetch #2 (waits for #1 to finish)
  const res2 = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res2.json();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {user.name}</p>
    </div>
  );
}
```

👉 Total time = time(fetch1) + time(fetch2)

**🔹 Parallel Fetching**

Starts all fetches at the same time, then waits for all to finish.

✅ Much faster when APIs are independent.

```text
// app/page.tsx
export default async function Page() {
  // Start both fetches in parallel
  const postPromise = fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json());
  const userPromise = fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json());

  // Wait for both together
  const [post, user] = await Promise.all([postPromise, userPromise]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {user.name}</p>
    </div>
  );
}
```

👉 Total time = max(time(fetch1), time(fetch2))

**🔹 When to Use Which?**

✅ Parallel → When requests don’t depend on each other (best practice for performance).

✅ Sequential → When the second request needs data from the first (e.g., fetch user, then fetch user’s posts).

**🔹 Sequential Example (dependency case)**

```text
export default async function Page() {
  // Fetch user first
  const res1 = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res1.json();

  // Now fetch that user’s posts (depends on user.id)
  const res2 = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
  const posts = await res2.json();

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map((p: any) => <li key={p.id}>{p.title}</li>)}
      </ul>
    </div>
  );
}
```

**🔹 Performance Tip in Next.js**

Always prefer parallel fetching with Promise.all() when possible.

For large independent components, use <Suspense> + parallel fetch for even better UX (streaming).

```text
<Suspense fallback={<p>Loading Post...</p>}>
  <Post />
</Suspense>
<Suspense fallback={<p>Loading User...</p>}>
  <User />
</Suspense>
```

✅ **Summary**

Sequential → One after another (slower, but needed when dependent).

Parallel → At the same time (faster, best practice for independent requests).

---

**Data Fetching summary**

- Fetch data in client components

- Fetch data in server components with async/await

- Handling loading and error states with loading.tsx and error.tsx

- Fetch data directly from a database

- Server actions for mutations

- Feedback with useFormStatus and useActionState hook

- Separating server actions for use in client components

- Pass additional data to perform update and delete operations

- Perform optimistic updates

- Form component

---

**🔹 What is Prisma?**

Prisma is an ORM (Object-Relational Mapping) tool for Node.js/TypeScript.

It lets you interact with your database using code instead of raw SQL queries.

Works with PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, etc.

**Provides:**

Type-safe database queries (TypeScript autocomplete and validation).

Migration system (auto-generate database schema changes).

Query simplification (CRUD operations with clean syntax).

**Example with Prisma in Next.js:**

```text
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Using Prisma in an API route
export async function getUsers() {
  return await prisma.user.findMany();
}
```

**🔹 Is Prisma mandatory for Next.js?**

❌ No.

Next.js itself does not require Prisma. You can use any method to connect to a database:

| Option                                              | Pros                                                           | Cons                                     |
| --------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| **Prisma**                                          | Type-safe, easy migrations, auto-complete, good for TypeScript | Extra dependency, learning curve         |
| **Raw SQL (pg, mysql2, etc.)**                      | Lightweight, full control                                      | No type safety, more boilerplate         |
| **ORM alternatives (TypeORM, Sequelize, MikroORM)** | Similar to Prisma, works in JS/TS                              | Can be complex, less modern DX           |
| **NoSQL (MongoDB, Firebase, Supabase)**             | No schema enforcement, flexible                                | Less type safety if not combined with TS |


**🔹 When to use Prisma in Next.js?**

✅ You are using TypeScript (Prisma integrates beautifully).

✅ You want type-safe queries and fewer runtime errors.

✅ You have SQL databases and want easier migrations.

✅ You are building a production app where database structure may change over time.

**🔹 When not to use Prisma?**

❌ Small project / prototype → raw SQL or a lightweight library is faster.

❌ Using NoSQL like Firebase / Supabase → Prisma mainly targets SQL databases.

❌ You want full control over queries → raw SQL might be simpler.

- Next.js does NOT require Prisma.

- Prisma is optional, used for cleaner, type-safe database access in TypeScript projects.

- Ideal for production apps, large teams, and SQL databases.

---