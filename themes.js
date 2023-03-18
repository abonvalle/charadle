// @ts-nocheck

// theme : {
//    id: 'bf44bfc2-ce1a-4113-ac69-753ba202a0ff', -> Identifiant unique
//    name: 'Classique', -> Nom affiché
//    gradient: ['#434343', '#000000'], -> Couleurs du gradient du background (entre 2 et 3 couleurs)
//    primary: '#0f2027', -> Couleur du clavier
//    secondary: '#000', ->  Couleur des cases
//    tertiary: '#5b5b5b', -> Couleur des boutons dans la topbar
//    bgOpacity : 0.2 -> Opacité du background
// }

const fontLight = '#1a1a1a';
const fontDark = '#f4f4f4';
const defaultTheme = {
  id: 'bf44bfc2-ce1a-4113-ac69-753ba202a0ff',
  name: 'Classique',
  gradient: ['#434343', '#000000'],
  primary: '#0f2027',
  secondary: '#1a1a1a',
  tertiary: '#5b5b5b',
  bgOpacity: 0.2
};
const themes = [
  {
    id: '8b008a17-b3e2-408b-a7b6-1944043c5fa0',
    name: 'Noël',
    gradient: ['#8E0E00', '#1F1C18'],
    primary: '#ff5b50',
    secondary: '#ff5b5b',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: '7d423921-b5f8-4990-81cf-998200a400ea',
    name: 'Grenadine',
    gradient: ['#cb2d3e', '#ef473a'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: 'e2f68fba-cbec-4234-9166-9655bbeeba64',
    name: 'Cocktail',
    gradient: ['#C6FFDD', '#FBD786', '#f7797d'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: 'b34b9307-947e-4e4b-a38a-2680e1943fff',
    name: 'Soleil',
    gradient: ['#fceabb', '#f8b500'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '62e9b9ab-9da8-41d6-81ec-6c824195a30b',
    name: 'Citron',
    gradient: ['#EDE574', '#E1F5C4'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '07aa9d47-33c2-499e-b829-4f7bcea8335e',
    name: 'Menthe',
    gradient: ['#1D976C', '#93F9B9'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '8db3c410-545e-4651-9e33-6273f3083e57',
    name: 'Mojito',
    gradient: ['#11998e', '#38ef7d'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: 'ad55579a-fea8-4829-896c-b7262a15e642',
    name: 'Sapin',
    gradient: ['#134E5E', '#71B280'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: '6a54c593-8ba0-4365-9875-1955820ec9bd',
    name: 'Ciel',
    gradient: ['#2193b0', '#6dd5ed'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '14c05845-fbb6-4d66-ac50-6bf0690e0f66',
    name: 'Océan',
    gradient: ['#000428', '#004e92'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: '926f810f-a997-444e-9eb3-e8b09280dbf5',
    name: 'Encre',
    gradient: ['#141E30', '#243B55'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: 'dd68bcc1-19fa-494a-a83b-8e53253534c4',
    name: 'Aubergine',
    gradient: ['#6441A5', '#2a0845'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: 'c0f28391-d671-4c52-aca8-fd12b00b2407',
    name: 'Lila',
    gradient: ['#c8a2c8', '#f4c4f3'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '4fbe7734-80c5-4aa0-ac06-2f0c61209968',
    name: 'Prune',
    gradient: ['#C04848', '#480048'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.2
  },
  {
    id: '18286d30-6d15-4b73-a5b5-6759911f09a2',
    name: 'Pêche',
    gradient: ['#ED4264', '#FFEDBC'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '68331efd-6a4f-4c3b-96d6-78e3176133f7',
    name: 'Malabar',
    gradient: ['#ee9ca7', '#ffdde1'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  },
  {
    id: '87132581-c473-4513-9cf3-f558d23df6ab',
    name: 'Bonbon',
    gradient: ['#12c2e9', '#c471ed', '#f64f59'],
    primary: '#0f2027',
    secondary: '#000',
    tertiary: '#5b5b5b',
    bgOpacity: 0.5
  }
];

function getThemeConfigFromTheme(theme, defaultTheme = false) {
  const { id, primary, secondary, tertiary, bgOpacity, gradient } = theme;
  const font = fontDark;
  const opacity = { dynamic: bgOpacity }
  const gradientColorsCount = gradient.length;
  const primaryObj = { DEFAULT: primary, darker: brightColor(primary, -20), darkest: brightColor(primary, -40), lighter: brightColor(primary, 20), lightest: brightColor(primary, 40) }
  const secondaryObj = { DEFAULT: secondary, darker: brightColor(secondary, -20), darkest: brightColor(secondary, -40), lighter: brightColor(secondary, 20), lightest: brightColor(secondary, 40) }
  const tertiaryObj = { DEFAULT: tertiary, darker: brightColor(tertiary, -20), darkest: brightColor(tertiary, -40), lighter: brightColor(tertiary, 20), lightest: brightColor(tertiary, 40) }
  const complementary = { DEFAULT: getComplementaryColor(primary), darker: brightColor(getComplementaryColor(primary), -20), lighter: brightColor(getComplementaryColor(primary), 20) }
  const gradientColors = {
    'gradient-start': gradient[0] ?? '',
    ...(gradientColorsCount > 2
      ? { 'gradient-middle': gradient[1] ?? '', 'gradient-end': gradient[2] ?? '' }
      : { 'gradient-middle': getMiddleColor(gradient[0], gradient[1]), 'gradient-end': gradient[1] ?? '' })
  };

  return {
    ...(!defaultTheme ? { name: id } : {}), extend: {
      colors: { primary: primaryObj, secondary: secondaryObj, tertiary: tertiaryObj, complementary, font, ...gradientColors }, opacity
    }
  }
}
function brightColor(hex, percent) {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);
  if (R == 0) R = 32; if (G == 0) G = 32; if (B == 0) B = 32;
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

function getMiddleColor(color1, color2) {
  // Convertir les couleurs hexadécimales en valeurs RGB
  let rgb1 = hexToRgb(color1);
  let rgb2 = hexToRgb(color2);

  // Calculer la couleur intermédiaire
  let middleRgb = {
    r: Math.floor((rgb1.r + rgb2.r) / 2),
    g: Math.floor((rgb1.g + rgb2.g) / 2),
    b: Math.floor((rgb1.b + rgb2.b) / 2)
  };

  // Convertir la couleur intermédiaire en format hexadécimal
  let middleColor = rgbToHex(middleRgb);

  return middleColor;
}

function hexToRgb(hexColor) {
  // Supprimer le "#" si présent
  hexColor = hexColor.replace("#", "");

  // Extraire les valeurs RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  return { r, g, b };
}

function rgbToHex(rgbColor) {
  // Convertir les valeurs RGB en format hexadécimal
  let r = rgbColor.r.toString(16).padStart(2, "0");
  let g = rgbColor.g.toString(16).padStart(2, "0");
  let b = rgbColor.b.toString(16).padStart(2, "0");

  return "#" + r + g + b;
}
function getComplementaryColor(hexColor) {
  // Vérifiez si la couleur est au format hexadécimal
  if (!/^#([0-9a-f]{3}){1,2}$/i.test(hexColor)) {
    throw new Error('Invalid hex color');
  }

  // Supprimez le dièse (#) du début de la chaîne
  hexColor = hexColor.replace('#', '');

  // Convertissez la couleur en nombre hexadécimal
  const hexValue = parseInt(hexColor, 16);

  // Calculez la couleur complémentaire en effectuant un XOR entre la couleur d'origine et #FFFFFF
  const complementaryHexValue = hexValue ^ 0xffffff;

  // Convertissez la couleur complémentaire en chaîne hexadécimale et ajoutez des zéros à gauche si nécessaire
  const complementaryHexColor = '#' + ('000000' + complementaryHexValue.toString(16)).slice(-6);

  // Retournez la couleur complémentaire
  return complementaryHexColor;
}

module.exports = {
  defaultThemeConfig: getThemeConfigFromTheme(defaultTheme, true),
  getCustomThemesConfigs() {
    return themes.map((theme) => getThemeConfigFromTheme(theme));
  },
  getThemesIds() { return [...themes.map(({ id }) => id), defaultTheme.id] },
  themes,
  defaultTheme
};

