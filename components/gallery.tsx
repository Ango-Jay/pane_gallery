import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Card } from "./imagecard";
import { SearchBar } from "./searchbar";
import { Image } from "@/interfaces";
import axios from "axios";
import classNames from "classnames";
import { Skeleton } from "./Loaders/Skeleton";
import { ImageViewer } from "./imageviewer";

interface GalleryProps {
  darkTheme: boolean;
  initialImages: Image[];
  showImageModal: boolean;
  setShowImageModal: Dispatch<SetStateAction<boolean>>;
}
const Gallery = ({
  darkTheme,
  initialImages,
  showImageModal,
  setShowImageModal,
}: GalleryProps) => {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState(initialImages);
  const [activeImage, setActiveImage] = useState<{
    src: string;
    id: string;
    index: number;
  } | null>(null);
  const handleSelect = (image: Image, index: number) => {
    setActiveImage({
      src: image.largeImageURL,
      id: `${image.id}`,
      index,
    });
    setShowImageModal(true);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [imagesError, setImagesError] = useState<Error | null>(null)
 const [page, setPage] = useState(1)
  const handleFetch = async () => {
    try {
      setIsLoading(true);
      setImagesError(null)
      const res = await axios.post("api/images", {
        searchTerm: searchText,
        page
      });
      setIsLoading(false);
      // setImages(res.data?.hits);

      setImages(prevItems => [...prevItems, ...res.data?.hits]);
      setPage(prevPage => prevPage + 1);

    } catch (error) {
      setIsLoading(false);
     if(error instanceof Error){
      setImagesError(error)
     }
      console.log("ERR");
      console.log(error);
    }
  };
  useEffect(() => {
    if (searchText) {
      handleFetch();
    }
  }, [searchText]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    handleFetch();
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);


  const displayImages = () => {
    if (images && !isLoading) {
      return images.map((image, index) => (
        <Card
          key={`${image.id}-${image.imageURL}`}
          image={image}
          index={index}
          darkTheme={darkTheme}
          handleSelect={handleSelect}
          className={classNames({
            "row-span-2 max-h-none h-[100%] min-h-full": [
              "1",
              "6",
              "11",
              "16",
              "21",
              "26",
            ].includes(`${index}`),
          })}
        />
      ));
    }
    return Array.from(Array(30).keys()).map((item, index) => (
      <Skeleton
        key={`${item}`}
        isLoading={isLoading}
        className={classNames({
          "row-span-2 max-h-none h-[100%] min-h-full": [
            "1",
            "6",
            "11",
            "16",
            "21",
            "26",
          ].includes(`${index}`),
        })}
      />
    ));
  };

  return (
    <div className="container mx-auto px-6 sm:px-10 mt-[3rem]">
      <SearchBar setSearchTerm={setSearchText} darkTheme={darkTheme} />

      <div className="justify-center flex items-center">
        {images.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No images found
          </h1>
        )}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-1  pb-8 mt-[3rem]">
          {displayImages()}
        </div>
      </div>
      {showImageModal && activeImage ? (
        <ImageViewer
          active={activeImage}
          setActive={setActiveImage}
          closeModal={() => {
            setActiveImage(null);
            setShowImageModal(false);
          }}
          images={images}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
