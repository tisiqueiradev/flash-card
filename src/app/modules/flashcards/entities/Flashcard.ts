export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deck_id: string;
  createdAt: Date;
  updatedAt: Date;
  order?: number;
}

