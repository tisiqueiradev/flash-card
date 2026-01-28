import { FlashcardReview } from '../entities/FlashcardReview';

export interface FlashcardReviewRepository {
  findByUserAndFlashcard(
    userId: string,
    flashcardId: string
  ): Promise<FlashcardReview | null>;

  findDueByUser(
    userId: string,
    now: Date
  ): Promise<FlashcardReview[]>;

  create(review: FlashcardReview): Promise<FlashcardReview>;

  update(review: FlashcardReview): Promise<FlashcardReview>;
}
