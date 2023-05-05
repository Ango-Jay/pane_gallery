import { useState } from "react";
import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GetImages } from "@/lib/pixabay";
import { Image } from "@/interfaces";
import classnames from "classnames";

interface HomePageProps {
  initialImages: Image[];
}

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
