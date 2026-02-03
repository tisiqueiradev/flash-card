export interface CreateFlashcardDTO {
  question: string;
  answer: string;
  deck_id: string;
  order?: number;
}
