/** @type {import('tailwindcss').Config} */
// import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hw-dark-1': '#232931',
        'hw-dark-2': '#2B313B',
        'hw-orange-1': '#F37321',
        'hw-orange-2': '#FFA800',
        'hw-orange-3': '#F37321',
        'hw-orange-4': '#FFBB51',
        'hw-yellow-1': '#FFE500',
        'hw-yellow-2': '#FFB800',
        'hw-yellow-3': '#F9F871',
        'hw-yellow-4': '#FFA84A',
        'hw-blue-1': '#0047FF',
        'hw-blue-2': '#04BFDA',
        'hw-red-1': '#FF0000',
        'hw-white-1': '#FEFEFE',
        'hw-white-2': '#CACCCE',
        'hw-white-3': '#909498',
        'hw-green-1': '#00AF36',
        'hw-green-2': '#99D679',
        'hw-green-3': '#00C6AC',
        'hw-green-4': '#247F78',
        'hw-green-5': '#274350',
        'hw-green-6': '#05E200',
        'hw-gray-0.5': '#E2E2E2',
        'hw-gray-1': '#BFBFBF',
        'hw-gray-5': '#A0A0A0',
        'hw-gray-7': '#636363',
        'hw-gray-7.25': '#555a62',
        'hw-gray-7.5': '#363E4B',
        'hw-gray-8': '#444444',
        'hw-gray-8.5': '#2B313B',
        'hw-gray-9': '#232527',
        'hw-gray-10': '#131619',
        'hw-pink-1': '#FB67CA',
        'hw-purple-1': '#9B88ED',
      },
    },
    fontFamily: {
      Hanwha: ['Hanwha', 'sans-serif'],
      HanwhaGothic: 'HanwhaGothic',
      SUIT: 'SUIT',
      NunitoSans: 'Nunito Sans',
    },
    screens: {
      xs: '570px',
      sm: '640px',
      '2sm': '740px',
      md: '916px',
      lg: '1100px',
      '2lg': '1200px',
      xl: '1300px',
      '2xl': '1680px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
