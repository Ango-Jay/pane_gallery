import  { useEffect, useState } from "react";
import {Card} from "./imagecard";
import {SearchBar }from "./searchbar";
import { Image } from "@/interfaces";
import axios from "axios"



interface GalleryProps {
    darkTheme:boolean;
    initialImages:Image[]
}
const Gallery = ({
    darkTheme,
    initialImages
}:GalleryProps)=>{
    const [searchText, setSearchText] = useState("")
    const [images, setImages] = useState(initialImages)
    const handleFetch = async()=>{
      try {
    const res =  await axios.post("api/search", {
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
        <div className="container mx-auto px-6 sm:px-10">
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
          <div className="grid sm:grid-cols-1 sm:gap-6s md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-4 pb-8">
            {images.map(image => (
              <Card key={`${image.id}`} image={image} darkTheme={darkTheme}/>
            ))}
          </div>
        </div>
      </div>
    )
}


export default Gallery;
