import '@/styles/globals.css'
import '@/styles/Player.css'
import '@/styles/Short.css'
import '@/styles/Admin.css'
import '@/styles/swiper.css'
import '@/styles/controls.css'
import '@/styles/fonts.css'
import { SessionProvider } from '@/components/context/Auth'
import Navbar from '@/components/Navs/Navbar'
import Messagerie from '@/components/Messages/Messagerie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { LoadProvider } from '@/components/context/loading'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Load from '@/components/Load'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const [blur, setBlur] = useState(false)
  const [load, setLoad] = useState(true)
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoad(true)
    };

    const handleRouteStart = (url) => {
      setLoad(false)
    };

    const handleRouteEnd = (url) => {
      setLoad(true)
    };

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteEnd);
    };
  }, [router.events]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          })
          .catch(err => {
            console.log('Service Worker registration failed: ', err);
          });
      });
    }
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  const sideAllOpened = (state) => {
    setBlur(state)
  }
  return (
    <SessionProvider>
      <LoadProvider>
        <div className="font-quicksand">
          <Head>
            <title>TeraMaFlix - Video Sharing Platform</title>
            <meta name="google-adsense-account" content="ca-pub-8097044169349946"></meta>
            <meta name="description" content="Discover and share captivating videos on TeraMaFlix." />
            <meta property="og:title" content="TeraMaFlix - Video Sharing Platform" />
            <meta property="og:description" content="Discover and share captivating videos on TeraMaFlix." />
            <meta property="og:image" content="/logo/TeramaFlixpic.png" />
            <meta property="og:url" content="https://www.teramaflix.com/" />
            <meta name="6a97888e-site-verification" content="2278ea106cccdf69801561234d523f7d"/>
            <meta name="google-site-verification" content="O-XRmj2k40bOs7UhxNg0hSxEEJkuwhdVkqBE89uWOtg" />
            <Script src="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js"></Script>
          </Head>

          <div className="wrapper relative w-full h-full bg-gray-100   pt-1 overflow-x-hidden ">
            <Navbar sideAllOpened={sideAllOpened} />
            <div className={`Acceuilcontainer ${blur ? 'blur' : {}}  w-full  justify-center items-center  bg-gray-100 flex flex-col h-full `}>
              <div className={`container w-[100%] h-[100%] lg:px-6    bg-white lg:p-4 lg:rounded  flex flex-col justify-center`}>
                <Component {...pageProps} />
                <Messagerie />
              </div>
            </div>
          </div>
        </div>
        <Load load={load} />
        <ToastContainer />
      </LoadProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag-manager"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="afterInteractive" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </SessionProvider>

  )
}
