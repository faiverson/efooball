import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import 'css/app.css'

// const theme = createTheme({
//   components: {
//     MuiPopover: {
//       defaultProps: {
//         container: rootElement,
//       },
//     },
//     MuiPopper: {
//       defaultProps: {
//         container: rootElement,
//       },
//     },
//   },
// })

const App = ({ Component, pageProps }) => <Component {...pageProps} />

export default App
