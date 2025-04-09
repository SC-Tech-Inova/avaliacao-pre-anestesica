import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/jquery.mCustomScrollbar.min.css';
import '../styles/animate.min.css';
import '../styles/owl.carousel.min.css';
import '../styles/global.css'; // Keep your existing global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
