import { FlashcardReview } from '../entities/FlashcardReview';
import { FlashcardReviewRepository } from '../repositories/FlashcardReviewRepository';

export class FlashcardsDueService {
  constructor(
    private reviewRepository: FlashcardReviewRepository
  ) {}

  async execute(userId: string): Promise<FlashcardReview[]> {
    const now = new Date();

    return this.reviewRepository.findDueByUser(
      userId,
      now
    );
  }
}
