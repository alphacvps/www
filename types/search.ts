export interface SearchResult {
  slug: string;
  title: string;
  excerpt?: string;
}

export interface ScoredPost extends SearchResult {
  content: string;
  score: number;
}