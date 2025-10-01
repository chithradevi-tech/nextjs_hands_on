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
