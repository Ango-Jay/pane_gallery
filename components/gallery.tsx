import  {  useEffect, useState } from "react";
import type {Dispatch, SetStateAction} from "react"
import {Card} from "./imagecard";
import {SearchBar }from "./searchbar";
import { Image } from "@/interfaces";
import axios from "axios"
import classNames from "classnames";
import { Skeleton } from "./Loaders/Skeleton";



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
    const [isLoading, setIsLoading] = useState(false)

    const handleFetch = async()=>{
      try {
        setIsLoading(true)
    const res =  await axios.post("api/images", {
    searchTerm:searchText
    }) 
    setIsLoading(false)
setImages(res.data?.hits)
      } catch (error) {
        setIsLoading(false)
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

    const displayImages = ()=>{
      if(images && !isLoading){
        return images.map((image, index) => (
          <Card
           key={`${image.id}`} 
           image={image}
           index={index}
            darkTheme={darkTheme}
            showImageModal={showImageModal}
            setShowImageModal={setShowImageModal}
            activeImage={activeImage}
            handleSelect={handleSelect}
           className={classNames({'row-span-2 max-h-none h-[100%] min-h-full': ["1", "6", "11", "16", "21", "26"].includes(`${index}`) })}/>
        ))
      }
      return (
        Array.from(Array(30).keys()).map(
          (item, index)=>(
            <Skeleton
             key={index} 
            isLoading={isLoading}
            className={classNames({'row-span-2 max-h-none h-[100%] min-h-full': ["1", "6", "11", "16", "21", "26"].includes(`${index}`) })}
            />
          )
        )
      )
    }

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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-1  pb-8 mt-[3rem]">
            {
         displayImages()
            }
          </div>
        </div>
      </div>
    )
}


export default Gallery;
