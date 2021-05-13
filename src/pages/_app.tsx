import { ProductProvider } from '../providers/PlatesContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  );
}

export default MyApp
