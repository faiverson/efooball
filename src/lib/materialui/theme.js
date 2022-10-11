import { createTheme, experimental_sx } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    type: 'dark',
    paper: 'orange',
    primary: {
      main: '#0909bd',
      light: '#02027d',
      dark: '#00003a',
    },
    secondary: {
      main: '#FFE800',
      light: '#b3a200',
      dark: '#534c00',
      contrastText: '#fff',
    },
    text: {
      primary: "#fff",
      secondary: "#FFE800",
    },
    divider: '#fff',
    background: {
      default: '#00003a',
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState }) => {
          return {
              color: theme.palette.text.primary,
            };
        },
      },
    },
    // MuiFormLabel: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => {
    //       return {
    //           color: theme.palette.secondary.main,
    //         };
    //     },
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => {
    //       return {
    //           background: theme.palette.secondary.main,
    //         };
    //     },
    //   },
    // },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => {
    //       return {
    //           background: theme.palette.secondary.main,
    //         };
    //     },
    //   },
    // },
  },
});

export default theme;
