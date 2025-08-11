import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Typescript configuration
	typescript: {
		// Type checking is handled by separate command
		ignoreBuildErrors: false,
	},

	// ESLint configuration
	eslint: {
		// Lint on build
		ignoreDuringBuilds: false,
		// Specify directories to lint
		dirs: ['src', 'app', 'pages', 'components', 'lib', 'hooks'],
	},

	// Images configuration for avatars
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'avatar.githubusercontent.com',
			},
		],
	},

	// Environment variables
	env: {
		NEXT_PUBLIC_APP_NAME: 'Team Dashboard',
		NEXT_PUBLIC_APP_VERSION: '1.0.0',
	},

	// Headers for security
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
				],
			},
		]
	},

	// Performance optimizations
	compress: true,
	poweredByHeader: false,

	// Static file serving
	trailingSlash: false,

	// Development configuration
	...(process.env.NODE_ENV === 'development' && {
		// Enable React strict mode in development
		reactStrictMode: true,
		// Show detailed error information
		productionBrowserSourceMaps: false,
	}),

	// Production optimizations
	...(process.env.NODE_ENV === 'production' && {
		// Minimize production bundle
		productionBrowserSourceMaps: false,
		// Enable compression
		compress: true,
	}),
}

export default nextConfig
