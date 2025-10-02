**Authentication in Next.js (App Router)**

**🔹 Ways to Handle Authentication**

| Method                    | Where Auth Happens              | Best For                                     | Example Tools                  |
| ------------------------- | ------------------------------- | -------------------------------------------- | ------------------------------ |
| **NextAuth.js (Auth.js)** | Server + Client                 | Full-featured auth (OAuth, Credentials, JWT) | [Auth.js](https://authjs.dev)  |
| **Middleware**            | Edge (before request hits page) | Route protection                             | `middleware.ts`                |
| **Custom JWT / Sessions** | API Routes or Server Components | Fine-grained control                         | `jsonwebtoken`, `iron-session` |
| **External Providers**    | Client-side                     | Easy login with Google, Auth0, Firebase      | Firebase Auth, Clerk, Supabase |


**1. NextAuth.js (now called Auth.js)**

The most popular and easiest way.

```text
npm install next-auth
```

**API Route (App Router style)**

```text
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
```

**Using in Components**
```text
"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return <button onClick={() => signIn("github")}>Login with GitHub</button>;
}
```
👉 Works with OAuth providers (Google, GitHub, Facebook, etc.), JWT, or credentials.

**2. Middleware Auth (Route Protection)**

Runs before rendering to check if a user is authenticated.

```text
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token"); // Example: JWT in cookie
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login"; // redirect
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
```
👉 Best for protecting entire routes like /dashboard/*.

**3. Custom JWT / Session Handling**

If you don’t want NextAuth.

**Create JWT on login**
```text
// app/api/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
```

**Protecting pages**
```text
// app/dashboard/page.tsx (Server Component)
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const token = cookies().get("token")?.value;

  if (!token) return <h1>Not Authorized</h1>;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return <h1>Welcome {user.username}</h1>;
  } catch {
    return <h1>Invalid Token</h1>;
  }
}
```

**4. Third-party Auth Providers**

Clerk → Plug-and-play auth UI (modern SaaS apps).

Supabase Auth → Full backend with Postgres + auth.

Firebase Auth → Popular in client-side apps.

**Example (Firebase):**

```text
"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const login = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return <button onClick={login}>Login with Google</button>;
}
```

**🔹 Choosing the Right Auth Method**

✅ NextAuth.js → Best all-rounder, works with OAuth, JWT, credentials.

✅ Middleware → Protect routes at the edge (fast).

✅ Custom JWT → When you want full control.

✅ Third-party (Clerk, Supabase, Firebase) → When you want ready-made auth.

---

**⚡ Authorization in Next.js (App Router)**

**🔹 Difference Between AuthN and AuthZ**

Authentication (AuthN) → Verify identity (e.g., login with Google).

Authorization (AuthZ) → Verify permissions/roles (e.g., only admins can access /admin).

**1. Role-Based Authorization (RBAC)**

Add roles/permissions inside the user session (JWT, database, or NextAuth session).

**Example with NextAuth.js**

```text
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = { id: 1, name: "Admin", role: "admin" }; // Example
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string; // attach role
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
});

export { handler as GET, handler as POST };
```

**Protecting routes**

```text
// app/admin/page.tsx
import { getServerSession } from "next-auth";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return <h1>Access Denied 🚫</h1>;
  }

  return <h1>Welcome Admin ✅</h1>;
}
```

**2. Authorization via Middleware**

Great for protecting whole routes (edge runtime check).

```text
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    
    // Role check
    if (url.pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    return NextResponse.next();
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
```

👉 This protects /admin/* and enforces roles at the edge before hitting server.

**3. Component-Level Authorization**

For hiding/showing UI elements.

```text
"use client";
import { useSession } from "next-auth/react";

export default function AdminButton() {
  const { data: session } = useSession();

  if (session?.user?.role === "admin") {
    return <button>Manage Users</button>;
  }

  return null;
}
```

👉 Even if UI is hidden, always double-check on the server (never trust client only).

**4. Row-Level / Fine-Grained Authorization**

If you’re using a DB (Postgres, Supabase, Prisma), enforce row-level security:

Example: User can only fetch their own posts.

```text
// app/api/posts/route.ts
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();

  const posts = await prisma.post.findMany({
    where: { userId: session?.user?.id }, // only their posts
  });

  return Response.json(posts);
}
```

| Level                | Where         | Example                    |
| -------------------- | ------------- | -------------------------- |
| **Global (RBAC)**    | Session/JWT   | Admin role check           |
| **Route Protection** | Middleware    | Protect `/admin/*`         |
| **Component UI**     | Client-side   | Hide/show buttons          |
| **Data Layer**       | DB/Prisma/SQL | Enforce row-level security |

**✅ Rule of Thumb**

Use authentication to identify who.

Use authorization to decide what they can do.

Always enforce authorization at the server/database level, not just the UI.

---