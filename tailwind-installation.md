**To set up Tailwind CSS v4 in a Next.js 15 project, follow these steps:**

**Install Tailwind CSS v4**

https://tailwindcss.com/docs/installation/using-postcss


```text
npm install tailwindcss @tailwindcss/postcss postcss
```

**postcss.config.mjs**

```text
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

**src\styles\globals.css**
```text
@import "tailwindcss";
```

**tailwind.config.js**
```text
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**src\app\layout.tsx**
```text
import "@/styles/globals.css";
```

---

**2. how can you completely remove the Next.js logo that appears in the bottom-right corner in development mode?**

**next.config.ts**

```text
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  devIndicators: {
  //   position: "top-right", // top-right, bottom-right, top-left, bottom-left
  // },
   devIndicators: false,
};

export default nextConfig;
```