export interface FlashcardReview {
  id: string;

  userId: string;
  flashcardId: string;

  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReview: Date;

  createdAt: Date;
  updatedAt: Date;
}
