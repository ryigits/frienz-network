const plugin = require("./node_modules/tailwindcss/plugin");
module.exports = {
    content: [
        "./client/src/**/*.{js,jsx}",
        "./public/index.html",
        "./node_modules/flowbite/**/*.js",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#fec1b3",
                    100: "#feb9aa",
                    200: "#feac9a",
                    300: "#fe9881",
                    400: "#fd8368",
                    500: "#fd6e4e",
                    600: "#fd5a35",
                    700: "#fd451c",
                    800: "#fc3003",
                    900: "#e32c02",
                },
            },
        },
        fontFamily: {
            body: [
                "Inter",
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "system-ui",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "Noto Sans",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji",
            ],
            sans: [
                "Inter",
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "system-ui",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "Noto Sans",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji",
            ],
        },
    },

    plugins: [
        require("flowbite/plugin"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".active": {
                    color: "#7E22CE",
                },
            });
        }),
        require("tailwind-scrollbar"),
    ],
};
