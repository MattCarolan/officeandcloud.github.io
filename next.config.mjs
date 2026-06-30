/** @type {import('next').NextConfig} */

// 👇 Repo / hosting setup.
// This site is hosted at a user/organization Pages repo ("officeandcloud.github.io")
// AND on the custom domain officeandcloud.com — both serve from the ROOT, so the
// base path must be empty. Leave `repo` blank.
// (Only set repo = "your-repo-name" if you ever host this as a *project* page at
//  username.github.io/your-repo-name/ with no custom domain.)
const repo = "";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && repo ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  // Produce a fully static site in ./out (no server needed) — required for GitHub Pages.
  output: "export",
  // Serve correctly from the repo sub-path in production; stay at root in dev.
  basePath,
  // Expose the base path to the app so we can prefix things like the favicon.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages can't run Next's image optimizer.
  images: { unoptimized: true },
  // Emit folder-style URLs (e.g. /faq/index.html) so Pages resolves them cleanly.
  trailingSlash: true,
};

export default nextConfig;
