import { Image } from "@/interfaces";
import classnames from "classnames"
import { useState } from "react";
import type {Dispatch, SetStateAction} from "react"
import { ImageModal } from "./imagemodal";


interface CardProps {
    darkTheme:boolean;
    image:Image;
    className:string;
    showImageModal:boolean;
    setShowImageModal: Dispatch<SetStateAction<boolean>>;
    activeImage:string;
    handleSelect:(image:Image)=>void
}
export const Card = (
    {
darkTheme,
image,
className,
showImageModal,
setShowImageModal,
activeImage,
handleSelect
    }: CardProps
)=>{

    const tags = image.tags.split(",")


    return(
        <>
         <div
      className={classnames("relative w-full cursor-pointer overflow-hidden max-h-[473px] shadow-lg my-3 lg:my-0  transition-all duration-300 hover:scale-[1.05] hover:z-[5] hover:max-h-none group", {'bg-dark-blue' : darkTheme}, className)}
   onClick={()=>handleSelect(image)}
   >
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="w-full min-h-full  object-cover"
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
      <div className="group-hover:opacity-100 opacity-0 absolute w-[50px] h-[50px] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        <img src="/assets/icons/eye-regular.svg" alt="view" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[100px] translate-y-[100%] group-hover:translate-y-0 group-hover:opacity-100 opacity-0 py-4 transition-all duration-300 flex items-center">
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