/* eslint-disable no-unused-vars */
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const plugin = require("./node_modules/tailwindcss/plugin");

module.exports = {
    plugins: [tailwindcss("./tailwind.config.cjs"), autoprefixer],
};
