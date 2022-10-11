import Head from "next/head";
import '../styles/globals.css';
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from "react";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(()=>{
    router.events.on("routeChangeComplete", ()=>{
      setProgress(100);
    })
  })
  return (<>
   <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  <Head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  </Head>
  
  <Component {...pageProps} />
  </>)
}

export default MyApp
