import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	turbopack: {
		root: __dirname,
	},
}
console.log(__dirname)
export default nextConfig
