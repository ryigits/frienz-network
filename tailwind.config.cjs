const plugin = require("./node_modules/tailwindcss/plugin");
module.exports = {
    content: [
        "./client/src/**/*.{js,jsx}",
        "./public/index.html",
        "./node_modules/flowbite/**/*.js",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1B73E8",
            },
        },
    },

    plugins: [
        require("flowbite/plugin"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".active": {
                    "color": "#7E22CE",
                },
            });
        }),
    ],
};
