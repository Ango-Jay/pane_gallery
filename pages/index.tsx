import { useState } from 'react'
import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GetImages } from '@/lib/pixabay';
import { Image } from '@/interfaces';
import classnames from "classnames"



interface HomePageProps {
  initialImages: Image[]
}

export default function Home({
  initialImages
}: HomePageProps) {
  const [darkTheme, setDarkTheme] = useState(false)
  const toggleDark = ()=>{
    setDarkTheme(!darkTheme)
  }
  const [showImageModal, setShowImageModal] = useState(false)
  const [active, setActive] = useState("")
  const handleSelect = (image:Image)=>{
    setActive(image.largeImageURL)
    setShowImageModal(true)
  }
  return (
    <main
      className={classnames(`flex flex-col bg-light`, {'bg-dark-gray' : darkTheme}, {'overflow-hidden h-[100vh]' : showImageModal})}
    >
      <Navbar 
      darkTheme={darkTheme} />
      <Gallery 
      darkTheme={darkTheme} 
      initialImages={initialImages} 
      showImageModal={showImageModal} 
      setShowImageModal={setShowImageModal}
      activeImage={active}
      handleSelect={handleSelect}
      />

      <Footer darkTheme={darkTheme} toggleDark={toggleDark} />
    </main>

  );
}


export async function getServerSideProps() {
  const result = await GetImages();
  const initialImages = result.hits;
  return {
    props: {
      initialImages,
    },
  };
}