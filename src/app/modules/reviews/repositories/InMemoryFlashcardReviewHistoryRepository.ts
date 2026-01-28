import { FlashcardReviewHistory } from '../entities/FlashcardReviewHistory';
import { FlashcardReviewHistoryRepository } from './FlashcardReviewHistoryRepository';

export class InMemoryFlashcardReviewHistoryRepository
  implements FlashcardReviewHistoryRepository {

  private histories: FlashcardReviewHistory[] = [];

  async create(
    data: FlashcardReviewHistory
  ): Promise<FlashcardReviewHistory> {
    this.histories.push(data);
    return data;
  }

  async findByUserAndFlashcard(
    userId: string,
    flashcardId: string
  ): Promise<FlashcardReviewHistory[]> {
    return this.histories.filter(
      history =>
        history.userId === userId &&
        history.flashcardId === flashcardId
    );
  }
}
