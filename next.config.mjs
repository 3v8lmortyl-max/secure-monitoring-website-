/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Permanent (308) redirects for retired URLs so existing links and any indexed pages keep working.
  // Domain-level redirects (securemonitoring24hr.com -> .cc, www -> apex) are configured in the
  // Vercel dashboard, not here, to avoid redirect loops with Vercel's own domain redirects.
  async redirects() {
    return [
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/operations', destination: '/how-it-works', permanent: true },
      { source: '/why-us', destination: '/about', permanent: true },
    ]
  },
}

export default nextConfig
