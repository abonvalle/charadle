// @ts-nocheck
module.exports = {
  mode: 'jit',
  content: ['./projects/wordle/src/**/*.{html,ts}'],
  purge: ['./projects/wordle/src/**/*.{html,ts}'],
  safelist: [],
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
        white: '#f7f7f7', //white
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
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ]
};
