import { Image } from "@/interfaces";
import classnames from "classnames"
import { useEffect, useState } from "react";
import type {Dispatch, SetStateAction} from "react"
import { ImageModal } from "./imagemodal";
import axios from "axios";
import { useInView } from 'react-intersection-observer';

interface CardProps {
    darkTheme:boolean;
    image:Image;
    className:string;
    showImageModal:boolean;
    setShowImageModal: Dispatch<SetStateAction<boolean>>;
    activeImage:string;
    handleSelect:(image:Image)=>void;
    index:number
}
export const Card = (
    {
darkTheme,
image,
className,
showImageModal,
setShowImageModal,
activeImage,
handleSelect,
index
    }: CardProps
)=>{
  const { ref, inView } = useInView({
    threshold: 0,
  });
    const tags = image.tags.split(",")
    //  show preview image on load
const [imgSrc, setImgSrc] = useState(image.previewURL)
const [fetched, setFetched] = useState(false)

const handleFetchImage = async()=>{
try {
  const res = await axios.get(image.webformatURL,{
    responseType: "arraybuffer",
  })
  const imgBase64 = Buffer.from(res.data, "binary").toString("base64");
  setImgSrc(`data:image/jpeg;charset=utf-8;base64,${imgBase64}`)
  setFetched(true)
} catch (error) {
  console.log(error);
  
}
}

useEffect(
  ()=>{
 if(inView && !fetched){
  handleFetchImage()
 }
  },[inView]
)

    return(
        <>
         <div
         ref={ref}
      className={classnames("relative w-full cursor-pointer overflow-hidden h-[282px] max-h-[473px] shadow-lg  transition-all duration-300 sm:hover:scale-[1.05] sm:hover:z-[5] sm:hover:max-h-none group", {'bg-dark-blue' : darkTheme}, className)}
   onClick={()=>handleSelect(image)}
   >
      <img
        src={imgSrc}
        alt={image.tags}
        loading={index < 5 ? "eager" : "lazy"}
        className="w-full min-h-full object-cover"
      />
      {/* <div className="translate-y-[100%] group-hover:translate-y-0 group-hover:opacity-100 opacity-0 px-6 py-4 transition-all duration-300">
        <div className="font-bold text-white text-2xl mb-2">
          Photo by {image.user}
        </div>
        <ul
          className={classnames("text-base text-white", {'text-white' : darkTheme})}
        >
          <li>
            <strong className="ml-1">Views: </strong>
            {image.views}
          </li>
          <li>
            <strong className="ml-1">Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong className="ml-1">Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div> */}
      <div className="sm:group-hover:opacity-100 sm:opacity-0 absolute w-[50px] h-[50px] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        <img src="/assets/icons/eye-regular.svg" alt="view" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[100px] sm:translate-y-[100%] sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:opacity-0 py-4 transition-all duration-300 flex flex-wrap items-center">
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="flex items-center justify-center bg-dark-blue rounded-full px-2 py-2 mx-1 my-2 text-light text-sm whitespace-nowrap"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>

    {
      showImageModal && activeImage === image.largeImageURL ? (
<ImageModal 
active={activeImage}
closeModal={()=>setShowImageModal(false)}
/>
      )
      : ""
    }
        </>
    )
}