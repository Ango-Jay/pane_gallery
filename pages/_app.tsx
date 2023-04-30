import MetaInfo from '@/components/MetaInfo'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <AnimatePresence mode="wait">
      <motion.div
      initial="initialState"
      animate="animateState"
      exit={"exitState"}
      transition={{
        duration:0.75
      }}
      variants={{
        initialState:{
opacity:0,
clipPath:"polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
        },
        animateState:{
opacity:1,
clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        },
        exitState:{
          clipPath:"polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
        }
      }}
      >
    <MetaInfo />
    <Component {...pageProps} />
    </motion.div>
    </AnimatePresence>
    </>
  )
}
