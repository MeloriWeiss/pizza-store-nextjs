import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};
module.exports = {
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreDuringBuilds: true,
		ignoreBuildErrors: true
	},
	distDir: 'dist'
};

export default nextConfig;
