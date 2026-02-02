/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: "#0a0a0a",
                primary: "#3b82f6", // Blue
                secondary: "#8b5cf6", // Purple
                accent: "#10b981", // Green
            },
        },
    },
    plugins: [],
}
