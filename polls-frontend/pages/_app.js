import '../styles/globals.css'
import Layout from '../components/Layout/Layout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  )
}

export default MyApp
