/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  ...(isGitHubPages ? {
    output: 'export',
    basePath: '/portafolio-2026',
    trailingSlash: true,
  } : {}),
  images: {
    unoptimized: isGitHubPages,
  },
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: isGitHubPages ? '/portafolio-2026' : '',
  },
}

module.exports = nextConfig
