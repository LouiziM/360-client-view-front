// color design tokens export
export const tokensLight = {
  grey: {
    0: "#ffffff", 
    10: "#f6f6f6", 
    50: "#f0f0f0", 
    100: "#e0e0e0",
    200: "#d2d2d2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", 
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", 
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // Blue
    50: "#f0f0f0", 
    100: "#fff6e0",
    200: "#000000",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#EEF5FF",
    700: "#004BAB",//changed
    800: "#665429",
    900: "#332a14",
    1000:"#C8DDF9",
    1100:"#080440"
  },
};

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
      mode: "light",
      primary: {
        ...tokensLight.primary,
        white: tokensLight.grey[0],
        main: tokensLight.grey[50],
        light: tokensLight.grey[100],
        faint: tokensLight.grey[200],
        dark: tokensLight.grey[700],
      },
      secondary: {
        ...tokensLight.secondary,
        main: tokensLight.secondary[600],
        light: tokensLight.secondary[700],
        faint: tokensLight.secondary[1000],
        dark: tokensLight.secondary[1100],
      },
      neutral: {
        ...tokensLight.grey,
        main: tokensLight.grey[500],
      },
      background: {
        default: tokensLight.grey[0],
        alt: tokensLight.grey[200],
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
