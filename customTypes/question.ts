export interface Question {
  id?: string;
  techType: string;
  question: string;
  answer: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  createdAt: string;
}

export type TechCardType = {
  title: string;
  type: string;
  avatar: string;
  href: string;
};
