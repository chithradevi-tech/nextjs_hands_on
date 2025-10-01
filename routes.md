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

