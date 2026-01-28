import { FlashcardReviewService } from './FlashcardReviewService';
import { InMemoryFlashcardReviewRepository } from '../repositories/InMemoryFlashcardReviewRepository';
import { InMemoryFlashcardReviewHistoryRepository } from '../repositories/InMemoryFlashcardReviewHistoryRepository';

describe('FlashcardReviewService', () => {
  let reviewRepository: InMemoryFlashcardReviewRepository;
  let historyRepository: InMemoryFlashcardReviewHistoryRepository;
  let reviewService: FlashcardReviewService;

  beforeEach(() => {
    reviewRepository = new InMemoryFlashcardReviewRepository();
    historyRepository = new InMemoryFlashcardReviewHistoryRepository();

    reviewService = new FlashcardReviewService(
      reviewRepository,
      historyRepository
    );
  });

  it('should create a new review if none exists', async () => {
    const review = await reviewService.execute({
      userId: 'user-1',
      flashcardId: 'flashcard-1',
      quality: 3
    });

    expect(review).toHaveProperty('id');
    expect(review.repetitions).toBe(0);
    expect(review.interval).toBe(1);
    expect(review.easeFactor).toBe(2.5);
  });

  it('should create a history entry on every review', async () => {
    await reviewService.execute({
      userId: 'user-1',
      flashcardId: 'flashcard-1',
      quality: 4
    });

    await reviewService.execute({
      userId: 'user-1',
      flashcardId: 'flashcard-1',
      quality: 5
    });

    const histories =
      await historyRepository.findByUserAndFlashcard(
        'user-1',
        'flashcard-1'
      );

    expect(histories).toHaveLength(2);

    expect(histories[0]).toMatchObject({
      userId: 'user-1',
      flashcardId: 'flashcard-1',
      quality: 4
    });

    expect(histories[1]).toMatchObject({
      userId: 'user-1',
      flashcardId: 'flashcard-1',
      quality: 5
    });
  });
});
