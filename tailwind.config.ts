/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.{js,vue,ts}',
    './app/pages/**/*.{js,vue,ts}',
    './app/plugins/**/*.{js,vue,ts}',
    './app/app.{js,ts,vue}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        29: '7.25rem', // 116px
      },
      fontFamily: {
        sora: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        lato: ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
