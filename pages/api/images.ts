import { GetImages } from "@/lib/pixabay";
import type { NextApiResponse, NextApiRequest } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const params = req.body;

  const results = await GetImages(params);
  
  res.status(200).json({
    ...results,
  });

}



// const getArticle: NextApiHandler<GetResponse> = async (req, res) => {
//   const { id } = req.query;
//   if (id) {
//     // find and return article with given id
//     const article = BLOG_DB.find((article) => article.id === Number(id));

//     if (!article)
//       throw new createHttpError.NotFound(`Article with id ${id} not found!`);
//     // OR
//     // if (!article) throw new createHttpError[404](`Article with id ${id} not found!`)
//     res.status(200).json({ data: article });
//   } else {
//     res.status(200).json({ data: BLOG_DB });
//   }
// };