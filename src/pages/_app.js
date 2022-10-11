import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../lib/materialui/theme'
import createEmotionCache from '../lib/emotion/createEmotionCache'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon"
import 'css/app.css'

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default App;
