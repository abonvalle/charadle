// @ts-nocheck
module.exports = {
  mode: 'jit',
  content: ['./projects/wordle/src/**/*.{html,ts}'],
  purge: ['./projects/wordle/src/**/*.{html,ts}'],
  safelist: ['border-cyan-500', 'animate-flip-right',
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
    extend: {
      colors: {
        primary: '#003261', //blue
        secondary: '#005e8c', //lighter blue
        background: '#120a33',//dark violet
        complementary: '#f9f871',
        black: '#121213', //BLACK
        gray: '#636363', //GRAY
        keyboard: '#8c8c8c', //LIGHT GRAY
        'right-alt': '#092c48', //dark blue
        'partial-alt': '#ece821', //yellow
        right: '#1db963', //green
        partial: '#f28600', //orange
        unused: '#3a3a3c',
        white: '#f7f7f7', //white
      },
    },
    keyframes: {
      'flip-right': {
        '0%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '20%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '21%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: 'transparent', opacity: '1' },
        '50%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#1db963', 'border-color': '#1db963', color: '#f7f7f7', opacity: '1' },
        '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#1db963', 'border-color': '#1db963', color: '#f7f7f7', opacity: '1' },
        // '90%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#1db963', 'border-color': '#1db963', color: '#f7f7f7', opacity: '1' },
        // '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#1db963', 'border-color': '#1db963', color: '#f7f7f7', opacity: '0.6' },
      },
      'flip-partial': {
        '0%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '20%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '21%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: 'transparent', opacity: '1' },
        '50%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#f28600', 'border-color': '#f28600', color: '#f7f7f7', opacity: '1' },
        '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#f28600', 'border-color': '#f28600', color: '#f7f7f7', opacity: '1' },
        // '90%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#f28600', 'border-color': '#f28600', color: '#f7f7f7', opacity: '1' },
        // '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#f28600', 'border-color': '#f28600', color: '#f7f7f7', opacity: '0.6' },
      },
      'flip-right-alt': {
        '0%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '20%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '21%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: 'transparent', opacity: '1' },
        '50%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#092c48', 'border-color': '#092c48', color: '#f7f7f7', opacity: '1' },
        '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#092c48', 'border-color': '#092c48', color: '#f7f7f7', opacity: '1' },
        // '90%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#092c48', 'border-color': '#092c48', color: '#f7f7f7', opacity: '1' },
        // '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#092c48', 'border-color': '#092c48', color: '#f7f7f7', opacity: '0.6' },
      },
      'flip-partial-alt': {
        '0%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '20%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '21%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: 'transparent', opacity: '1' },
        '50%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#ece821', 'border-color': '#ece821', color: '#f7f7f7', opacity: '1' },
        '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#ece821', 'border-color': '#ece821', color: '#f7f7f7', opacity: '1' },
        // '90%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#ece821', 'border-color': '#ece821', color: '#f7f7f7', opacity: '1' },
        // '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#ece821', 'border-color': '#ece821', color: '#f7f7f7', opacity: '0.6' },
      },
      'flip-unused': {
        '0%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '20%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: '#f7f7f7', opacity: '1' },
        '21%': { transform: 'scale(.9) rotateY(90deg)', 'background-color': 'transparent', 'border-color': '#005e8c', color: 'transparent', opacity: '1' },
        '50%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#3a3a3c', 'border-color': '#3a3a3c', color: '#f7f7f7', opacity: '1' },
        '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#3a3a3c', 'border-color': '#3a3a3c', color: '#f7f7f7', opacity: '1' },
        // '90%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#3a3a3c', 'border-color': '#3a3a3c', color: '#f7f7f7', opacity: '1' },
        // '100%': { transform: 'scale(.9) rotateY(0deg)', 'background-color': '#3a3a3c', 'border-color': '#3a3a3c', color: '#f7f7f7', opacity: '0.6' },
      }
    },
    animation: {
      'flip-right': 'flip-right 0.8s ease-in-out',
      'flip-partial': 'flip-partial 0.8s ease-in-out',
      'flip-right-alt': 'flip-right-alt 0.8s ease-in-out',
      'flip-partial-alt': 'flip-partial-alt 0.8s ease-in-out',
      'flip-unused': 'flip-unused 0.8s ease-in-out',
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
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ]
};
