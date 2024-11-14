export interface TVShow {
  id: number;
  url: string;
  name: string;
  language: string;
  genres: string[];
  status: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
}
