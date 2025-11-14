export interface NewsArticle {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  content?: string;
  imageUrl?: string;
}

export type StoryContent = {
  speaker: "W" | "D" | "V"; // Speaker can be W (Vinesh), D (Deep), or V (Vaidehi)
  text: string;
};

export type Story = {
  title: string;
  content: StoryContent[];
};
