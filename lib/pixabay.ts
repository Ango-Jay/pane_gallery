import { ImagesDataResponse } from "@/interfaces";
import axios from "axios";

const pixabayAPIKey = process.env.PIXABAY_API_KEY;


export const GetImages = async (params?: {
  searchTerm?: string;
  page: number;
  pageSize: number;
}) => {
  
  const result = await axios.get<ImagesDataResponse>(
    `https://pixabay.com/api/`,
    {
      params : {
        key: pixabayAPIKey,
        page: params?.page || 1,
        per_page: params?.pageSize || 30,
        image_type: "photo",
        q: params?.searchTerm,
      },
    }
  );
  return result
};
