import { useState } from "react";
import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GetImages } from "@/lib/pixabay";
import { Image } from "@/interfaces";
import classnames from "classnames";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";


interface HomePageProps {
  initialImages: Image[];
}

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
const analytics = getAnalytics(app);

export default function Home({ initialImages }: HomePageProps) {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleDark = () => {
    setDarkTheme(!darkTheme);
  };
  const [showImageModal, setShowImageModal] = useState(false);
  return (
    <main
      className={classnames(
        `flex flex-col bg-light`,
        { "bg-dark-gray": darkTheme },
        { "overflow-hidden h-[100vh]": showImageModal }
      )}
    >
      <Navbar darkTheme={darkTheme} />
      <Gallery
        darkTheme={darkTheme}
        initialImages={initialImages}
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
      />

      <Footer darkTheme={darkTheme} toggleDark={toggleDark} />
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const result = await GetImages();
    const initialImages = result.data.hits;
    return {
      props: {
        initialImages,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
