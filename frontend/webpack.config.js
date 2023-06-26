const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
	output: {
		publicPath: "http://localhost:3000/",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src/"),
			"@SVG": path.resolve(__dirname, "src/assets/svg"),
			"@API": path.resolve(__dirname, "src/api"),
			"@Images": path.resolve(__dirname, "src/assets/images"),
			"@Layout": path.resolve(__dirname, "src/layout"),
			"@Components": path.resolve(__dirname, "src/components"),
			"@Shared": path.resolve(__dirname, "src/shared"),
			"@Modules": path.resolve(__dirname, "src/modules"),
			"@Models": path.resolve(__dirname, "src/models"),
			"@Core": path.resolve(__dirname, "src/core"),
			"@Constants": path.resolve(__dirname, "src/constants"),
			"@Context": path.resolve(__dirname, "src/context"),
		},
	},

	devServer: {
		port: 3000,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: ["url-loader"],
			},

			{
				test: /\.svg$/,
				use: ["@svgr/webpack", "file-loader"],
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "frontend",
			filename: "remoteEntry.js",
			remotes: {},
			exposes: {},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
});