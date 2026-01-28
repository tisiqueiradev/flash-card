export interface FlashcardReviewHistory {
  id: string;

  userId: string;
  flashcardId: string;

  quality: number;

  repetitions: number;
  interval: number;
  easeFactor: number;

  reviewedAt: Date;
}
