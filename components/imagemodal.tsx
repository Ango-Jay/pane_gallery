interface ImageModalProps {
    active:string;
    closeModal: ()=>void
}
export const ImageModal = (
    {
active,
closeModal
    }:ImageModalProps
)=>{
    return(
        <>
        <div
          onClick={closeModal}
          className="bg-[#000]/10 backdrop-blur-[1px] w-full min-w-[100vw] py-[5rem] h-full min-h-[100vh] overflow-y-auto fixed top-0 left-0 flex z-[999]"
        >
          <div className="max-w-[90%] sm:max-w-[600px] max-h-[50vh] sm:max-h-[600px] m-auto">
            <img src={active} alt={"test"} className="w-auto h-auto" />
          </div>
        </div>
      </>
    )
}