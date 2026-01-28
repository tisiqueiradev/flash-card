import { FlashcardReviewHistory } from '../entities/FlashcardReviewHistory';

export interface FlashcardReviewHistoryRepository {
  create(
    data: FlashcardReviewHistory
  ): Promise<FlashcardReviewHistory>;

  findByUserAndFlashcard(
    userId: string,
    flashcardId: string
  ): Promise<FlashcardReviewHistory[]>;
}
