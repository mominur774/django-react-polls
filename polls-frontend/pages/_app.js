import '../styles/globals.css'
import Layout from '../components/Layout/Layout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from '../context/GlobalContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "sdfshjddg"}>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
