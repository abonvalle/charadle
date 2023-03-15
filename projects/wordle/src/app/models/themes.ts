import { theme } from './theme.interface';
export const defaultTheme: theme = {
  name: 'Classique',
  borderActive: 'bg-[#0F2027]',
  border: 'bg-[#0F2027]',
  boardLetterBg: 'bg-[#0F2027]',
  fontColor: '',
  bgClass: 'bg-gradient-to-tl from-[#434343] to-[#000000]',
  kbClass: 'bg-[#0F2027]'
};
export const themes: theme[] = [
  defaultTheme,
  {
    name: 'Noël',
    fontColor: '',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    bgClass: 'bg-gradient-to-tl from-[#8E0E00] to-[#1F1C18]',
    kbClass: 'bg-[#8E0E00]'
  },
  {
    name: 'Grenadine',
    fontColor: '',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    bgClass: 'bg-gradient-to-tl from-[#cb2d3e] to-[#ef473a]',
    kbClass: 'bg-[#ef473a]'
  },

  {
    name: 'Cocktail',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#C6FFDD] via-[#FBD786] to-[#f7797d]',
    kbClass: 'bg-[#f7797d]'
  },
  {
    name: 'Soleil',
    fontColor: '',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    bgClass: 'bg-gradient-to-tl from-[#fceabb] to-[#f8b500]',
    kbClass: 'bg-[#f8b500]'
  },
  {
    name: 'Citron',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#EDE574] to-[#E1F5C4]',
    kbClass: 'bg-[#D0C855]'
  },
  {
    name: 'Menthe',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#1D976C] to-[#93F9B9]',
    kbClass: 'bg-[#1D976C]'
  },
  {
    name: 'Mojito',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#11998e] to-[#38ef7d]',
    kbClass: 'bg-[#11998e]'
  },
  {
    name: 'Sapin',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#134E5E] to-[#71B280]',
    kbClass: 'bg-[#134E5E]'
  },
  {
    name: 'Ciel',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#2193b0] to-[#6dd5ed]',
    kbClass: 'bg-[#2193b0]'
  },
  {
    name: 'Océan',
    fontColor: '',
    borderActive: 'bg-[#004e92]',
    border: 'bg-[#004e92]',
    boardLetterBg: 'bg-[#004e92]',
    bgClass: 'bg-gradient-to-tl from-[#000428] to-[#004e92]',
    kbClass: 'bg-[#004e92]'
  },
  {
    name: 'Encre',
    fontColor: '',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    bgClass: 'bg-gradient-to-tl from-[#141E30] to-[#243B55]',
    kbClass: 'bg-[#243B55]'
  },
  {
    name: 'Aubergine',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#6441A5] to-[#2a0845]',
    kbClass: 'bg-[#2a0845]'
  },
  {
    name: 'Améthiste',
    fontColor: '',
    borderActive: 'bg-[#6E48AA]',
    border: 'bg-[#6E48AA]',
    boardLetterBg: 'bg-[#6E48AA]',
    bgClass: 'bg-gradient-to-tl from-[#9D50BB] to-[#6E48AA]',
    kbClass: 'bg-[#6E48AA]'
  },
  {
    name: 'Prune',
    fontColor: '',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    bgClass: 'bg-gradient-to-tl from-[#C04848] to-[#480048]',
    kbClass: 'bg-[#480048]'
  },
  {
    name: 'Pêche',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#ED4264] to-[#FFEDBC]',
    kbClass: 'bg-[#ED4264]'
  },
  {
    name: 'Malabar',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#ee9ca7] to-[#ffdde1]',
    kbClass: 'bg-[#ee9ca7]'
  },
  {
    name: 'Bonbon',
    borderActive: 'bg-[#0F2027]',
    border: 'bg-[#0F2027]',
    boardLetterBg: 'bg-[#0F2027]',
    fontColor: '',
    bgClass: 'bg-gradient-to-tl from-[#12c2e9] via-[#c471ed] to-[#f64f59]',
    kbClass: 'bg-[#12c2e9]'
  }
];
