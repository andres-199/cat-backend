export interface Breed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  alt_names?: string;
  wikipedia_url?: string;
  image?: {
    id: string;
    url: string;
  };
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}
