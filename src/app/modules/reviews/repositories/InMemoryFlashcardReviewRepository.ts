import { FlashcardReview } from '../entities/FlashcardReview';
import { FlashcardReviewRepository } from './FlashcardReviewRepository';

export class InMemoryFlashcardReviewRepository
  implements FlashcardReviewRepository {

  private reviews: FlashcardReview[] = [];

  async findByUserAndFlashcard(userId: string, flashcardId: string) {
    return (
      this.reviews.find(
        r => r.userId === userId && r.flashcardId === flashcardId
      ) ?? null
    );
  }

  async create(review: FlashcardReview) {
    this.reviews.push(review);
    return review;
  }

  async update(review: FlashcardReview) {
    const index = this.reviews.findIndex(r => r.id === review.id);
    this.reviews[index] = review;
    return review;
  }

  async findDueReviews(userId: string) {
    const now = new Date();

    return this.reviews.filter(
      r => r.userId === userId && r.nextReview <= now
    );
  }

  async findDueByUser(
    userId: string,
    now: Date
  ): Promise<FlashcardReview[]> {
    return this.reviews.filter(
      review =>
        review.userId === userId &&
        review.nextReview <= now
    );
  }

}
