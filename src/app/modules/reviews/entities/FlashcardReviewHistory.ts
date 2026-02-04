export type ReviewSnapshot = {
  repetitions: number;
  interval: number;
  easeFactor: number;
};

export interface FlashcardReviewHistory {
  id: string;

  userId: string;
  flashcardId: string;

  quality: number;

  before: {
    repetitions: number;
    interval: number;
    easeFactor: number;
  };

  after: {
    repetitions: number;
    interval: number;
    easeFactor: number;
  };

  reviewedAt: Date;
}
