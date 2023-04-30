import  {  useEffect, useState } from "react";
import type {Dispatch, SetStateAction} from "react"
import {Card} from "./imagecard";
import {SearchBar }from "./searchbar";
import { Image } from "@/interfaces";
import axios from "axios"
import classNames from "classnames";



interface GalleryProps {
    darkTheme:boolean;
    initialImages:Image[];
    showImageModal:boolean;
    setShowImageModal: Dispatch<SetStateAction<boolean>>;
    activeImage:string;
    handleSelect:(image:Image)=>void
}
const Gallery = ({
    darkTheme,
    initialImages,
    showImageModal,
    setShowImageModal,
    activeImage,
    handleSelect
}:GalleryProps)=>{
    const [searchText, setSearchText] = useState("")
    const [images, setImages] = useState(initialImages)
    const handleFetch = async()=>{
      try {
    const res =  await axios.post("api/images", {
    searchTerm:searchText
    }) 
setImages(res.data?.hits)
      } catch (error) {
        console.log("ERR");
        console.log(error);
        
      }
    }
    useEffect(
      ()=>{
        if(searchText){
handleFetch()
        }
      }, [searchText]
    )
    return (
        <div className="container mx-auto px-6 sm:px-10 mt-[3rem]">
        <SearchBar
setSearchTerm={setSearchText}
darkTheme={darkTheme}
        />
    
        <div className="justify-center flex items-center">
          {images.length === 0 && (
            <h1 className="text-5xl text-center mx-auto mt-32">
              No images found
            </h1>
          )}
          <div className="w-full grid sm:grid-cols-1 sm:gap-6s md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-1 pb-8 mt-[3rem]">
            {images.map((image, index) => (
              <Card
               key={`${image.id}`} 
               image={image}
                darkTheme={darkTheme}
                showImageModal={showImageModal}
                setShowImageModal={setShowImageModal}
                activeImage={activeImage}
                handleSelect={handleSelect}
               className={classNames(`${index}`, {'row-span-2 max-h-none': ["1", "6", "11", "16", "21", "26"].includes(`${index}`) })}/>
            ))}
          </div>
        </div>
      </div>
    )
}


export default Gallery;
