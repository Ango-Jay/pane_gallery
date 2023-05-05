import { GetImages } from "@/lib/pixabay";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const params = req.body;

  try {
    const response = await GetImages(params);
    if (response.status >= 400) {
      return res.status(400).json({
        error: `Sorry an error occured`,
      });
    }
    const results = response.data;
    return res.status(200).json({
      ...results,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return (error as {}).toString();
  }
}
