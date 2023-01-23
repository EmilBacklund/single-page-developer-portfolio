/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{html,js}', './src/js/*.js', './src/js/helpers/*.js'],
  theme: {
    extend: {
      colors: {
        portfolioGreen: '#4EE1A0',
        portfolioBlack: '#151515',
        portfolioDarkGrey: '#242424',
        portfolioLightGrey: '#D9D9D9',
      },
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      maxWidth: {
        portfolioMaxWidth: '1110px',
      },
      fontSize: {
        portfolioName: '32px',
        portfolioHeadingXL: '88px',
      },
      padding: {
        portfolioHeaderPaddingXL: '39px',
      },
      margin: {
        portfolioMarginBottomHeader: '88px',
        porfolioH1MarginBottom: '43px',

        portfolioIntroductionMarginBottom: '66px',
      },
      lineHeight: {
        portfolioHeadingXL: '88px',
      },
      letterSpacing: {
        portfolioLetterSpacing: '-0.156em',
      },
    },
  },
  plugins: [],
};
