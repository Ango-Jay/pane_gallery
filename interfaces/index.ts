export interface Image {
  id: number;
  pageURL: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  views: number;
  downloads: number;
  likes: number;
  user: string;
}

export interface ImagesDataResponse {
  total: number;
  totalHits: number;
  hits: Image[];
}

export interface ImageQueryParams {
  key: string;
  page: number;
  per_page: number;
  image_type: string;
  q?: string;
}
