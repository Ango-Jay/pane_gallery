import MetaInfo from "@/components/MetaInfo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "@/components/ErrorBoundary";
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyBLAF3KO2cn-ai68-z6hQ7Vms7Wgn1DMdQ",
  authDomain: "panegallery-7975c.firebaseapp.com",
  projectId: "panegallery-7975c",
  storageBucket: "panegallery-7975c.appspot.com",
  messagingSenderId: "158047793157",
  appId: "1:158047793157:web:d4576430989b398156ec6c",
  measurementId: "G-CHV4E51P9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            initial="initialState"
            animate="animateState"
            exit={"exitState"}
            transition={{
              duration: 0.75,
            }}
            variants={{
              initialState: {
                opacity: 0,
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              },
              animateState: {
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              },
              exitState: {
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              },
            }}
          >
            <MetaInfo />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}
