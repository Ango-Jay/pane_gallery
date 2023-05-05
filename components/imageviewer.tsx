import { useKeyPress } from "@/hooks/useKeyPress";
import { Image } from "@/interfaces";
import classNames from "classnames";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction} from "react";



interface ImageModalProps {
  active: {
    src: string;
    id:string;
    index: number;
};
setActive: Dispatch<SetStateAction<{
  src: string;
  id:string;
  index: number;
} | null >>;
  closeModal: () => void;
  images: Image[];
}
export const ImageViewer = ({
  active,
  closeModal,
  images,
  setActive
}: ImageModalProps) => {
const leftKeyPress = useKeyPress("ArrowLeft")
const rightKeyPress = useKeyPress("ArrowRight")
  const handleNext = ()=>{
    const nextImage = images.find((image, index) => (
      (active.index + 1) === index 
     ))
    if(active.index <= (images.length - 1) && nextImage){
    
      setActive({
        src:nextImage?.largeImageURL,
        id:`${nextImage?.id}`,
        index: active.index + 1
      })
    }
  }
  const handlePrev = ()=>{
    const prevImage = images.find((image, index) => (
      (active.index - 1) === index 
     ))
    if(active.index >= 0 && prevImage){
    
      setActive({
        src:prevImage?.largeImageURL,
        id:`${prevImage?.id}`,
        index: active.index - 1
      })
    }
  }
  //  change image on keypress
  useEffect(()=>{
    if(leftKeyPress){   
handlePrev()
    }
    if(rightKeyPress){
      handleNext()
    }
  }, [leftKeyPress, rightKeyPress])
  const [imageTiles, setImageTiles] = useState([
    active.index,
    active.index + 1,
    active.index + 2,
    active.index + 3,
    active.index + 4,
    active.index + 5
     ])
  useEffect(() => {

    if([6, 12, 18, 24, 30].includes(active.index)){
      setImageTiles([
        active.index,
        active.index + 1,
        active.index + 2,
        active.index + 3,
        active.index + 4,
        active.index + 5
      ]);
    }
  }, [active.index]);
  return (
    <>
      <div
        // onClick={closeModal}
        className="bg-black/50 backdrop-blur-[1px] w-full min-w-[100vw] pt-[5rem] pb-8 h-full min-h-[100vh] overflow-y-auto fixed top-0 left-0 flex flex-col z-[500]"
      >
    <div className="w-full h-full flex flex-col relative">
  
          <div className="max-w-[90%] sm:max-w-[70%] md:max-w-[90%]  max-h-[50vh] h-[400px] sm:h-auto sm:max-h-[400px] m-auto relative z-[600]">

            <img src={active.src} alt={"test"} className="w-auto h-full object-cover" />
     
          </div>
          <div className="flex justify-between w-[100vw] fill-light px-8 relative sm:absolute sm:top-[50%] sm:translate-y-[-50%] sm:left-0 sm:z-[600]">
    <button 
        onClick={handlePrev}
    className="w-[30px] sm:w-[50px] min-w-[30px] sm:min-w-[50px] h-[30px] sm:h-[50px] rotate-180 flex items-center justify-center btn-style relative z-[600]">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
            </svg>
    </button>
    <button
    onClick={handleNext}
    className="w-[30px] sm:w-[50px] min-w-[30px] sm:min-w-[50px] h-[30px] sm:h-[50px]  flex items-center justify-center btn-style relative z-[600]">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
            </svg>
    </button>
          </div>
          <div className="mx-auto mt-auto grid grid-cols-6">
            {images && images.length
              ? images
              .filter((image, index) => {
return (
imageTiles.includes(index)
)
              })
              .map((image) => (
                  <div key={image.id} className={classNames("w-[100px] min-w-[100px] h-[150px] transition-all duration-300", {'scale-[1.05]' : `${image.id}` === active.id})}>
                    <img
                      className="w-full h-full object-cover"
                      src={image.webformatURL}
                      alt={`${image.id}`}
                    />
                  </div>
                ))
              : ""}
          </div>
          <div
      onClick={closeModal}
      className=" w-full h-full fixed inset-0 z-[400]"></div>
   </div>
      </div>

    </>
  );
};
