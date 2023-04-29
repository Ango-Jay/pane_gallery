import { useState } from 'react'
import Gallery from "@/components/gallery";
import NewsLetter from "@/components/newsletter";
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
  return (
    <main
      className={classnames(`flex flex-col bg-light`, {'bg-dark-gray' : darkTheme})}
    >
      <Navbar darkTheme={darkTheme} />
      <Gallery darkTheme={darkTheme} initialImages={initialImages} />
      <NewsLetter darkTheme={darkTheme} />
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