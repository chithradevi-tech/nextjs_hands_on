**Fetching Data**

**Option A: From Markdown Files**

Install gray-matter and remark for parsing Markdown:

```text
npm install gray-matter remark remark-html
```

✅ Highlights

Dynamic Routing with [id] folder.

SSG using generateStaticParams (Markdown posts pre-rendered).

Markdown Support with gray-matter + remark.

Fallback API Posts for dynamic content.

Single Listing Page showing both Markdown and API posts.

---

**🔹 What is generateStaticParams?**

In Next.js 13+ with the App Router (app/),
generateStaticParams is a special function you can export from a dynamic route (e.g. app/blog/[id]/page.tsx).

It tells Next.js:

“Here are all the possible values for [id] — go ahead and pre-render those pages at build time.”

**🔹 Why Do We Need It?**

**Without it:**

Next.js doesn’t know what ids exist.

/blog/[id] would only render on demand at runtime (Server-Side Rendering).

**With it:**

Next.js reads all Markdown files (or API posts).

Builds static HTML for /blog/first-post, /blog/second-post, etc.

At runtime, pages are super fast because they’re just static files.

**🔹 Analogy**

Think of generateStaticParams as making a table of contents for your blog before the site goes live.
Next.js looks at that list and prints each page in advance.

**✅ In short:**

generateStaticParams → collects all dynamic route values.

Ensures /blog/[id] pages are statically generated (SSG) at build time.

Makes Markdown blogs super fast & SEO-friendly.

---

**✅ Advantages (When to Use)**
**1. Performance (SSG)**

Pages are built once at build time.

No server call needed when a user visits.

Super fast ⚡ and cacheable via CDN.

**2. SEO Benefits**

Search engines see fully rendered HTML, not just placeholders.

Ideal for content like blogs, docs, landing pages.

**3. Reduced Server Load**

No database/API hit on every request.

Only happens at build time.

**4. Error Detection Early**

If Markdown parsing or API fetch fails → you’ll know at build time, not in production.

**❌ Disadvantages (When NOT to Use)**
**1. Content Must Be Known at Build Time**

If your content changes frequently (e.g., new blog posts every 5 minutes), you’d need to rebuild and redeploy the app each time.

**2. Scalability**

If you have thousands of routes (e.g., /products/[id] for 1M products), pre-generating them all can make the build very slow or even fail.

**3. No Real-Time Data**

Static pages are frozen at build time.

Users may see outdated data unless you revalidate or rebuild.

**4. Limited for User-Specific Data**

Doesn’t work well if every user sees different content (e.g., dashboard, profile page).

⚖️ When to Use generateStaticParams

**✅ Use when:**

The list of possible routes is finite and known at build time.

Content doesn’t change often (e.g., blog posts, docs, marketing pages).

You want maximum speed and SEO.

**❌ Avoid when:**

Content updates very frequently (e.g., news feed, stock prices).

The number of routes is huge (hundreds of thousands).

You need personalized or user-specific data.

**🔄 Alternatives**

Dynamic Rendering (No generateStaticParams)
→ Page is rendered on-demand at runtime (SSR).

Incremental Static Regeneration (ISR) with revalidate
→ Pages are static but auto-updated after X seconds without a full rebuild.


generateStaticParams = static site generation for dynamic routes.

✅ Use for blogs, docs, portfolios, marketing.

❌ Don’t use for frequently updated or huge datasets.

**🔄 For frequently changing content → prefer ISR or SSR.**

---

<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/8aee6fc4-7fc2-4a45-b580-8db2d4d9afcf" />

<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/a84c7440-ff57-4f7b-8feb-827d466b5b88" />

<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/cc4c4461-7b89-4cd0-8db2-133b3c03b1d1" />

---

http://localhost:3000/blog
 → Blog listing (Markdown + API posts)

http://localhost:3000/blog/first-post
 → Markdown post

http://localhost:3000/blog/1
 → API post from JSONPlaceholder