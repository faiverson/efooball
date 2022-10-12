import { ThemeProvider } from "@material-tailwind/react";
import 'css/app.css'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App
