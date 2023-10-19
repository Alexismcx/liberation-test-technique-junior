import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#2A2D41',
    },
    secondary: {
      main: '#02020E',
    },
    text: {
        primary: '#000000',
        secondary: '#FFFFFF'
    },
    background: {
        default: '#FFFFFF'
    }
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: ['Lato', 'sans-serif'].join(','),
    h1: {
        fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
        fontSize: '3rem'
    },
    h2: {
        fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
        fontSize: '2.7rem'
    },
    h3: {
        fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
        fontSize: '2.125rem'
    },
    // h4: {
    //     fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
    //     fontSize: '1.5rem'
    // },
    // subtitle1: {
    //     fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
    //     fontSize: '1.25rem'
    // },
    // subtitle2: {
    //     fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
    //     fontSize: '1.125rem'
    // },
    // body1: {
    //     fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
    //     fontSize: '1rem'
    // },
    // body2: {
    //     fontFamily: ['Neue Montreal', 'sans-serif'].join(','),
    //     fontSize: '0.875rem'
    // }
  }
});

