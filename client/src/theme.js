// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "cfe5f3",
    100: "#a0cbe7",
    200: "#70b2da",
    300: "#4198ce",
    400: "#117ec2",
    500: "#0e659b",
    600: "#0a4c74",
    700: "#07324e",
    800: "#031927",
    900: "#000000",
  },
  task:{
    100:"#e5f5e0",
    200:"#fee6ce",
    300:"#fff7bc",
    400:"#fde0dd",


    500:"#00441b",
    600:"#a14213",
    700:"#96860c",
    800:"#850c5b",
  },
  project:{
    100:"#deebf7",
    500:"#08306b",
  },
};
// mui theme settings
export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
              text:{
                alt: colorTokens.grey[0]
              },
              project: {
                main: colorTokens.project[500],
              },
              task: {
                main: colorTokens.task[500],
                inProgress: colorTokens.task[600],
                review: colorTokens.task[700],
                completed: colorTokens.task[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[200],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
              text:{
                alt: colorTokens.grey[900]
              },
              project: {
                main: colorTokens.project[100],
              },
              task: {
                main: colorTokens.task[100],
                inProgress: colorTokens.task[200],
                review: colorTokens.task[300],
                completed: colorTokens.task[400],
              },
            }),
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
};
  