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
  const primaryObj = getGradientColor(primary);
  const secondaryObj = getGradientColor(secondary);
  const tertiaryObj = getGradientColor(tertiary);
  const complementary = getGradientColor(getComplementaryColor(primary))
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
//Version 4.0
const pSBC = (p, c0, c1, l) => {
  let r, g, b, P, f, t, h, i = parseInt,
    m = Math.round,
    a = typeof (c1) == "string";
  if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
  const pSBCr = (d) => {
    let n = d.length,
      x = {};
    if (n > 9) {
      [r, g, b, a] = d = d.split(","), n = d.length;
      if (n < 3 || n > 4) return null;
      x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
      d = i(d.slice(1), 16);
      if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
      else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
    }
    return x
  };
  h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? pSBCr(c1) : P ? {
    r: 0,
    g: 0,
    b: 0,
    a: -1
  } : {
    r: 255,
    g: 255,
    b: 255,
    a: -1
  }, p = P ? p * -1 : p, P = 1 - p;
  if (!f || !t) return null;
  if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
  else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
  a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
  if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
  else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)

}
function getGradientColor(hexColor) {
  const gradient = { DEFAULT: hexColor }
  for (let i = 1; i <= 9; i++) {
    const shade = parseFloat(((5 - i) * 0.1).toFixed(1))
    gradient[i * 100] = pSBC(shade, hexColor, false, true)
  }
  return gradient
}
function formatColor(hexColor) {
  if (hexColor.length === 4) {
    // Ajouter des zéros à gauche pour obtenir 7 caractères
    hexColor = '#' + hexColor.slice(1).split('').map(function (c) {
      return c + c;
    }).join('');
  } else if (hexColor.length === 7) {
    // Renvoyer la couleur telle quelle
    hexColor = hexColor;
  } else {
    // Renvoyer une erreur pour les couleurs qui ne font pas 4 ou 7 caractères
    throw new Error('La couleur doit faire 4 ou 7 caractères.');
  }
  return hexColor;
}

function brightColor(hexColor, percent) {
  hexColor = formatColor(hexColor);
  let R = parseInt(hexColor.substring(1, 3), 16);
  let G = parseInt(hexColor.substring(3, 5), 16);
  let B = parseInt(hexColor.substring(5, 7), 16);

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

function getMiddleColor(hexColor1, hexColor2) {
  hexColor1 = formatColor(hexColor1);
  hexColor2 = formatColor(hexColor2);

  // Convertir les couleurs hexadécimales en valeurs RGB
  let rgb1 = hexToRgb(hexColor1);
  let rgb2 = hexToRgb(hexColor2);

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
  hexColor = formatColor(hexColor);

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
  hexColor = formatColor(hexColor);

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

