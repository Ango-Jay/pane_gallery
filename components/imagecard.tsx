import { Image } from "@/interfaces";
import classnames from "classnames"



interface CardProps {
    darkTheme:boolean;
    image:Image
}
export const Card = (
    {
darkTheme,
image
    }: CardProps
)=>{

    const tags = image.tags.split(",")
    return(
        <>
         <div
      className={classnames("max-w-sm rounded-3xl overflow-hidden shadow-lg my-3 bg-dark-gray", {'bg-dark-blue' : darkTheme})}
    >
      <img
        src={image.previewURL}
        alt="gallery"
        className="w-full h-[320px] max-h-[320px]"
      />
      <div className="px-6 py-4">
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
      </div>
      <div className="px-6 py-4 pb-5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-purple-500 rounded-full px-3 py-1 mx-2 my-2 text-sm font-semibold text-white mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
        </>
    )
}