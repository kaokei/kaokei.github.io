import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      screens: {
        '3xl': '1600px',
      },
      spacing: ({ theme }) => ({
        '128': '32rem',
        '144': '36rem',
      }),
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        header: '0px 6px 10px 0px #0000000F',
        4: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        6: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        58: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
        70: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
      },
      colors: {
        primary: '#FFE500',
        primaryhover: '#fff129',
        secondary: '#3864FF',
        danger: '#FF1D27',
        success: '#00DA8E',
        bg: '#F0F5FF',
        title: '#333',
        subtitle: '#666',
        tip: '#999',
      },
    },
  },
  plugins: [typography, daisyui],
} satisfies Config;
