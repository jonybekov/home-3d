const theme = {
  colors: {
    primary: {
      normal: "#785946"
    },
    chocolate: {
      normal: "#9F8474"
    }
  },
  shadows: {
    xs: "box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },

  breakpoints: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px"
  }
};

export const device = {
  mobileS: `(min-width: ${theme.breakpoints.mobileS})`,
  mobileM: `(min-width: ${theme.breakpoints.mobileM})`,
  mobileL: `(min-width: ${theme.breakpoints.mobileL})`,
  tablet: `(min-width: ${theme.breakpoints.tablet})`,
  laptop: `(min-width: ${theme.breakpoints.laptop})`,
  laptopL: `(min-width: ${theme.breakpoints.laptopL})`,
  desktop: `(min-width: ${theme.breakpoints.desktop})`,
  desktopL: `(min-width: ${theme.breakpoints.desktop})`
};

export default theme;
