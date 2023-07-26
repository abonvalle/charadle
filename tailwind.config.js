// @ts-nocheck
const plugin = require('tailwindcss/plugin')
const { getCustomThemesConfigs, getDefaultThemeConfig, getThemesIds } = require('./themes.js')
const { themes } = require('./projects/wordle/src/assets/serie/jsons/themes.json')
const themesAnimes = require('./projects/wordle/src/assets/anime/jsons/themes.json').themes
const defaultTheme = themes.find((t) => t.default)

module.exports = {
  mode: 'jit',
  content: ['./projects/wordle/src/**/*.{html,ts}', './projects/wordle-editor/src/**/*.{html,ts}'],
  safelist: [...getThemesIds(themes), ...getThemesIds(themesAnimes), 'h-full', 'border-cyan-500',
    'bg-right/80',
    'bg-partial/80',
    'bg-unused/80',
    'before:content-[\'a\']',
    'before:content-[\'b\']',
    'before:content-[\'c\']',
    'before:content-[\'d\']',
    'before:content-[\'e\']',
    'before:content-[\'f\']',
    'before:content-[\'g\']',
    'before:content-[\'h\']',
    'before:content-[\'i\']',
    'before:content-[\'j\']',
    'before:content-[\'k\']',
    'before:content-[\'l\']',
    'before:content-[\'m\']',
    'before:content-[\'n\']',
    'before:content-[\'o\']',
    'before:content-[\'p\']',
    'before:content-[\'q\']',
    'before:content-[\'r\']',
    'before:content-[\'s\']',
    'before:content-[\'t\']',
    'before:content-[\'u\']',
    'before:content-[\'v\']',
    'before:content-[\'w\']',
    'before:content-[\'x\']',
    'before:content-[\'y\']',
    'before:content-[\'z\']',
    'animate-flip-right',
    'animate-flip-partial',
    'animate-flip-unused',
    'animate-[flip-partial_1.5s_ease-in-out_0s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_0.3s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_0.6s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_0.9s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_1.2s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_1.5s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_1.8s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_2.1s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_2.4s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_2.7s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_3s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_3.3s_forwards]',
    'animate-[flip-partial_1.5s_ease-in-out_3.6s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_0s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_0.3s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_0.6s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_0.9s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_1.2s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_1.5s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_1.8s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_2.1s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_2.4s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_2.7s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_3s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_3.3s_forwards]',
    'animate-[flip-right_1.5s_ease-in-out_3.6s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_0s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_0.3s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_0.6s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_0.9s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_1.2s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_1.5s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_1.8s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_2.1s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_2.4s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_2.7s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_3s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_3.3s_forwards]',
    'animate-[flip-unused_1.5s_ease-in-out_3.6s_forwards]'
  ],
  theme: {
    fontFamily: {
      sans: 'Poppins',
      body: 'Poppins',
      title: 'Roboto'
    },
    // filter: {
    //   complementary: 'brightness(0.5) sepia(1) hue-rotate(-30deg) saturate(2)'
    // },
    extend: {
      height: {
        'full-w-topbar': 'calc(100% - 64px)',
        'screen-wo-border': 'calc(100vw - 2px)'
      },
      // backgroundImage: {
      //   'wordcloud': "url('/assets/images/background/wordcloud.svg')",
      // },
      colors: {
        // primary: '#003261', //blue
        // secondary: '#005e8c', //lighter blue
        background: '#151515',//dark violet
        // complementary: '#f9f871',
        black: '#121213', //BLACK
        gray: '#636363', //GRAY
        keyboard: '#8c8c8c', //LIGHT GRAY
        right: '#1db963', //green
        partial: '#f28600', //orange
        unused: '#3a3a3c',
        white: '#f7f7f7', //white
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      keyframes: {
        'flip-right': {
          '0%': { transform: 'rotateY(0deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '20%': { transform: 'rotateY(90deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '21%': { transform: 'rotateY(90deg)', 'background-color': '#1db963', 'border-color': '#0e994c' },
          '50%': { transform: 'rotateY(0deg)', 'background-color': '#1db963', 'border-color': '#0e994c' },
          '100%': { transform: 'initial', 'background-color': '#1db963', 'border-color': '#0e994c' },
        },
        'flip-partial': {
          '0%': { transform: 'rotateY(0deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '20%': { transform: 'rotateY(90deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '21%': { transform: 'rotateY(90deg)', 'background-color': '#f28600', 'border-color': '#c96f00' },
          '50%': { transform: 'rotateY(0deg)', 'background-color': '#f28600', 'border-color': '#c96f00' },
          '100%': { transform: 'initial', 'background-color': '#f28600', 'border-color': '#c96f00' },
        },
        'flip-unused': {
          '0%': { transform: 'rotateY(0deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '20%': { transform: 'rotateY(90deg)', 'background-color': 'revert-layer', 'border-color': 'revert-layer' },
          '21%': { transform: 'rotateY(90deg)', 'background-color': '#3a3a3c', 'border-color': '#272728' },
          '50%': { transform: 'rotateY(0deg)', 'background-color': '#3a3a3c', 'border-color': '#272728' },
          '100%': { transform: 'initial', 'background-color': '#3a3a3c', 'border-color': '#272728' },
        },
        'pulse-once': {
          '0%': { opacity: 0 },
          '25%': { opacity: 1 },
          '75%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'custom-ping': {
          '0%': {
            transform: 'scale(1)',
            opacity: 1
          },
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0
          }
        },
      },
      animation: {
        'flip-right': 'flip-right 0.8s ease-in-out',
        'flip-partial': 'flip-partial 0.8s ease-in-out',
        'flip-unused': 'flip-unused 0.8s ease-in-out',
        'pulse-fast': 'pulse 0.8s ease-in-out infinite',
        'pulse-once': 'pulse-once 5s linear infinite',
        'custom-ping': 'custom-ping 2s cubic-bezier(0, 0, 0.2, 1) 6 forwards',
        'bounce-8': 'bounce 1s ease-in-out 8 forwards'
      },
    },
    screens: {
      //All devices
      all: '0px',

      //Small/medium res phone
      xxs: '320px',

      //Std phones res
      xs: '530px',

      //small tablets res
      sm: '768px',

      //medium tablets res
      md: '890px',

      //large tablets & small pc res
      lg: '1024px',

      //extra-small pc res
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      //small pc res
      xxl: '1480px',

      //Std pc res
      '3xl': '1920px'
    }
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: getDefaultThemeConfig(defaultTheme),
      themes: [...getCustomThemesConfigs(themes), ...getCustomThemesConfigs(themesAnimes)]
    }),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ]
};
