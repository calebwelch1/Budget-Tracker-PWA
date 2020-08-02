// here we need to initialize webpack
// make a service worker and tell it what we want to cache
// tell webpack the source and where we want the bundle to be rendered

const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: "./public/index.js",
  output: {
    // make a dist folder and put the bundle there
    path: __dirname + "/public/dist",
    filename: "bundle.js",
  },
  mode: "production",
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      inject: false,
      fingerprints: false,
      name: "Budget Tracker App",
      short_name: "Budget App",
      start_url: "/",
      display: "standalone",
      icons: [
        {
          src: path.resolve(__dirname, "public/icons/icon-512x512.png"),
          size: [192, 512],
        },
      ],
    }),
  ],
};
module.exports = config;
