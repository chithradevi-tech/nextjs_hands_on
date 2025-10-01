**1. Flow of Rendering in Next.js**

    - Request to a page (e.g., /)

        Next.js server looks for pages/index.js (or app/page.js in Next.js 13+).

        Depending on your setup:

        SSR → server renders HTML dynamically and sends it to the client.

        SSG → HTML is pre-built at build time.

    - HTML reaches the browser

        Browser shows the fully rendered HTML immediately (good for SEO).

    - Hydration (React takes over)

        React attaches its Virtual DOM to the pre-rendered HTML.

        Now the page behaves like a normal React SPA — events, state, etc., work.

---

**2. Key Differences from React SPA**

| Feature    | React SPA              | Next.js                                 |
| ---------- | ---------------------- | --------------------------------------- |
| Entry HTML | `public/index.html`    | No single entry HTML (auto-generated)   |
| Routing    | React Router or manual | File-based routing (`pages/` or `app/`) |
| Rendering  | Client-Side Rendering  | SSR, SSG, or CSR (hybrid)               |
| SEO        | Poor (needs SSR setup) | Good (pre-rendered HTML)                |
| Components | Same as React          | Same as React                           |

---

**3. Routing**

- Next.js has a file-system based routing system

- URLs you can access in your browser are determined by how you organize your files
and folders in your code

**Routing conventions**

- All routes must live inside the App folder

- Route files must be named either page.js or page.tsx

- Each folder represents a segment of the URL path

when these conventions are followed, the file automatically becomes available as a route.

---

**4. Types of routes**

| Route Type           | Folder/File Structure                              | URL Example                         | Params Accessed                                 |
| -------------------- | -------------------------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Basic Route          | `app/about/page.tsx`                               | `/about`                            | N/A                                             |
| Nested Route         | `app/dashboard/page.tsx`                           | `/dashboard`                        | N/A                                             |
| Dynamic Route        | `app/users/[userId]/page.tsx`                      | `/users/123`                        | `{ userId: "123" }`                             |
| Nested Dynamic Route | `app/users/[userId]/settings/[settingId]/page.tsx` | `/users/123/settings/notifications` | `{ userId: "123", settingId: "notifications" }` |


---

**5. Not Found page**

| Router Type    | File Name           | Notes                        |
| -------------- | ------------------- | ---------------------------- |
| `pages/`       | `pages/404.js`      | Automatic for unknown routes |
| `app/`         | `app/not-found.tsx` | Automatic for unknown routes |
| Dynamic Routes | `notFound()`        | Programmatically trigger 404 |

**Key Points**

not-found.tsx itself does not receive params.

Use params in the page component to decide if the page exists.

Call notFound() to render the 404 page dynamically.

Works for both static and dynamic routes, including [slug] or [...slug].

---

**6. Importing usePathname**

import { usePathname } from "next/navigation";

Only works in client components (needs "use client" at the top).

| Feature   | Note                                         |
| --------- | -------------------------------------------- |
| Hook      | `usePathname()`                              |
| Scope     | Client components only (`"use client"`)      |
| Returns   | Current URL path as a string (`/docs/123`)   |
| Use Cases | Active nav, conditional rendering, redirects |


---

**7. file/folder organization (file cologation) in Next.js. I can explain the best practice folder structure for a modern Recommended Folder Structure for Next.js 15**

```text

my-next-app/
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── not-found.tsx            # 404 page
│   ├── dashboard/               # Dashboard feature
│   │   ├── layout.tsx           # Dashboard layout
│   │   ├── page.tsx             # Dashboard page
│   │   └── settings/            # Nested settings route
│   │       ├── page.tsx         # Settings page
│   │       └── layout.tsx       # Settings layout
│   └── api/                     # API routes
│       └── users/               # User-related API
│           └── [id].ts          # Dynamic user API route
├── components/                  # Reusable UI components
│   ├── Button.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/                         # Utility functions and libraries
│   └── fetchData.ts
├── styles/                      # Global and component-specific styles
│   ├── globals.css
│   └── Button.module.css
├── public/                      # Static assets
│   └── logo.png
├── package.json                 # Project metadata and dependencies
└── next.config.js               # Next.js configuration

```
---

**8. Private folders**

A way to tell Next.js, "this folder is internal only - don't include in the routing system"

The folder and all its subfolder are excluded from routing

**Add an underscore at the start of the folder name**

**useful for:**

- keeping your UI logic separate from routing logic

- Having consistent way to organize internal files in your project

- Making it easier to group related files in your code editor

- Avoiding potential naming conflicts with future Next.js file naming conventions

---

**9. Route Groups**

Let us logically organize our routes and project files without impacting the URL structure

Lets implementing authentication routes (example: (auth) folder name)

- Register

- Login

- Forgot password

---

**10. Layouts**

Pages are route-specific UI components

A layout is a UI that is shared between multiple pages in your app.

**Create layouts:**

- default export a react component from a layout.js or layout.tsx file

- That component takes a children prop, which Next.js will populate with your page content

| Behavior                     | Notes                                                     |
| ---------------------------- | --------------------------------------------------------- |
| Delete `layout.tsx`          | App Router **breaks**, pages won’t render                 |
| Next.js automatic generation | ❌ Does not generate layouts automatically                 |
| Nested layouts               | Can exist inside folders, but **root layout is required** |

| URL                   | Layouts Applied                | Content Rendered                           |
| --------------------- | ------------------------------ | ------------------------------------------ |
| `/`                   | Root Layout                    | Header + Home page + Footer                |
| `/dashboard`          | Root Layout → Dashboard Layout | Header + Sidebar + Dashboard Home + Footer |
| `/dashboard/settings` | Root Layout → Dashboard Layout | Header + Sidebar + Settings Page + Footer  |
| `/blog`               | Root Layout → Blog Layout      | Header + Blog Nav + Blog Home + Footer     |
| `/blog/my-first-post` | Root Layout → Blog Layout      | Header + Blog Nav + Blog Post + Footer     |

<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/0367736d-c50d-41b3-8232-448ec69b1f14" />

---

**11.  Next.js 15 App Router – Routing & Navigation** 

| API / Hook / Component    | Type                     | Purpose / Use Case                                               | Notes / Usage                                                                                         | Example                                                                      |
| ------------------------- | ------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `useRouter`               | Hook                     | Provides programmatic navigation and route management            | Must be used in **client components** (`'use client'`). Includes `push`, `replace`, `back`, `refresh` | `const router = useRouter(); router.push('/about')`                          |
| `router.push(url)`        | Method (from useRouter)  | Navigate to a new page programmatically                          | Adds a new entry to the browser history                                                               | `router.push('/contact')`                                                    |
| `router.replace(url)`     | Method (from useRouter)  | Navigate without adding a new entry to history                   | Useful for redirects without allowing back navigation                                                 | `router.replace('/login')`                                                   |
| `router.back()`           | Method (from useRouter)  | Navigate back in browser history                                 | Equivalent to `window.history.back()`                                                                 | `router.back()`                                                              |
| `router.refresh()`        | Method (from useRouter)  | Refresh the current route and re-fetch server components or data | Only available in **App Router**, useful to reload server-side data                                   | `router.refresh()`                                                           |
| `usePathname()`           | Hook                     | Get the current URL pathname                                     | Read-only, lightweight; returns string of current path                                                | `const path = usePathname();`                                                |
| `useSearchParams()`       | Hook                     | Access query/search parameters in the URL                        | Read-only, returns an instance of `URLSearchParams`                                                   | `const searchParams = useSearchParams(); const id = searchParams.get('id');` |
| `useParams()`             | Hook                     | Access dynamic route parameters from `[param]` files             | Works in pages, layouts, and route handlers in App Router                                             | `const { id } = useParams();`                                                |
| `Link` (`next/link`)      | Component                | Client-side navigation between pages                             | Can prefetch pages automatically; supports `replace` prop to act like `router.replace`                | `<Link href="/about">About</Link>`                                           |
| `prefetch` (via Link)     | Optional feature         | Preload a page for faster navigation                             | By default, Next.js prefetches in viewport. Can be disabled by `prefetch={false}`                     | `<Link href="/blog" prefetch={false}>Blog</Link>`                            |
| `useSearchParams().get()` | Method (URLSearchParams) | Get individual query parameters                                  | Works together with `useSearchParams`                                                                 | `searchParams.get('page')`                                                   |
| `usePathname().split()`   | Utility                  | Split pathname for routing logic                                 | Helps handle nested routing dynamically                                                               | `const parts = usePathname().split('/')`                                     |
| `router.prefetch(url)`    | Method (from useRouter)  | Programmatically prefetch a route                                | Useful for preloading before navigation                                                               | `router.prefetch('/about')`                                                  |


**Additional Notes:**

- Client vs Server Components

useRouter, usePathname, useSearchParams, and router methods must be used inside client components.

Example: Add 'use client'; at the top of the file.

- Dynamic Routes

For pages like /users/[id]/profile, you can access id using useParams().

Example: const { id } = useParams(); → /users/123/profile → id = "123".

- Refreshing Data

router.refresh() is extremely useful when you want to re-fetch server-side props or layouts without a full page reload.

- Prefetching

Links prefetch by default only when in the viewport.

Programmatic prefetch with router.prefetch('/path') is optional but can improve perceived performance.

- Differences from Pages Router

| Feature            | Pages Router (`next/router`) | App Router (`next/navigation`) |
| ------------------ | ---------------------------- | ------------------------------ |
| `useRouter`        | `'next/router'`              | `'next/navigation'`            |
| `router.refresh()` | ❌ Not available              | ✅ Available                    |
| `usePathname`      | ❌ Not available              | ✅ Available                    |
| `useSearchParams`  | ❌ Not available              | ✅ Available                    |
| `useParams`        | ❌ Not available              | ✅ Available                    |

---

**12. Routing metadata**

The Metadata API in Next.js a powerful feature that let us define metadata for each page

Metadata ensures our content look great when its shared or indexed by search engines

**Two way to handle metadata in layout.tsx or page.tsx files:**

1. export a static metadata object

2. export a dynamic generateMetadata function

**Metadata Rules:**

- Both layout.tsx and page.tsx can export metadata. Layout metadata applies to all
its pages, while page metadata is specific to that page.

- Metadata follows a top-down order, starting from the root level.

- when Metadata exists in multiple places along a route, they merge together, with page metadata
overriding layout metadata for matching properties.

---

**13. Navigation**

```text
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome home!</h1>
      <Link href="/blog">Blog</Link>
      <Link href="/products">Products</Link>
    </>
  );
}

```
---

**14. Params and Search Params**

For a given URL,

- params is a promise that resolves to an object containing the dynamic route
parameters (like id)

- search params is a promise that resolves an object containing the query 
parameters (like filtering and sorting)

- while page.tsx has access to both params and searchparams, layout.tsx only
has access to params

---

**15. Templates**

Templates are similar to layouts in that they are also UI shared between multiple 
pages in your app.

Whenever a user navigates between routes sharing a template, you get a
completely fresh start

- a new template component instance is mounted

- DOM elements are recreated

- state is cleared

- effects are re-synchronized

create a template by exploring a default React Component from template.js 
or template.jsx file

Like layouts, templates need to accept a children prop to render the nested route
segments

---

**16. loading.tsx**

This file helps to create loading states that users see while waiting for content
to load in a specific route segment

The loading states appear instantly when navigating, letting users know that
the application is responsive and actively loading content

---

**17. Error Handling**

special files

page.tsx

layout.tsx

template.tsx

not-found.tsx

loading.tsx

error.tsx - error handling

Error Handling in Next.js 15 (App Router)

**1. error.js (Error Boundary per Route Segment)**

If an error happens in a page, layout, or component inside a route segment, Next.js will render the closest error.js file.

Acts like a React error boundary.

Example:
```text
app/
  dashboard/
    page.js
    error.js   <-- handles errors for /dashboard
```

```text
'use client'; // required because it's interactive

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong in Dashboard!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
```
error → the error object

reset() → reattempts to render the segment

**2. global-error.js**

Handles uncaught errors in the entire app (when no segment error.js exists higher up).

Useful for global fallback UI.

```text
app/
  global-error.js
```

```text
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>App Crashed!</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Reload</button>
      </body>
    </html>
  );
}
```
---

**18. Parallel routes**

Parallel routing is an advanced routing mechanism that let us render
multiple pages simultaneously within the same layout.

- Parallel routes in Next.js are defined using a feature known as "slots"

- slots helps organize content in a modular way

- To create a slot, we use the folder '@folder' naming convention

- Each defined slot automatically becomes a prop in its corresponding
layout.tsx file

---

**19. Intercepting routes conventions**

(.) to match segments on the same level

(..) to match segments one level above

(..)(..) to match segments two levels above

(...) to match segments from the root app directory

---