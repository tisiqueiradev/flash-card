import { randomUUID } from 'crypto';

import { FlashcardReview } from '../entities/FlashcardReview';
import { FlashcardReviewHistory } from '../entities/FlashcardReviewHistory';

import { FlashcardReviewRepository } from '../repositories/FlashcardReviewRepository';
import { FlashcardReviewHistoryRepository } from '../repositories/FlashcardReviewHistoryRepository';

import { applySM2 } from '../../flashcards/domain/sm2';
import { InvalidReviewQualityError } from '../../flashcards/domain/errors/InvalidReviewQualityError';

export interface FlashcardReviewRequest {
  userId: string;
  flashcardId: string;
  quality: number; // 0 a 5
}

export class FlashcardReviewService {
  constructor(
    private reviewRepository: FlashcardReviewRepository,
    private historyRepository: FlashcardReviewHistoryRepository
  ) {}

  async execute({
    userId,
    flashcardId,
    quality
  }: FlashcardReviewRequest): Promise<FlashcardReview> {

      if (quality < 0 || quality > 5) {
      throw new InvalidReviewQualityError();
    }

    const now = new Date();

    let review =
      await this.reviewRepository.findByUserAndFlashcard(
        userId,
        flashcardId
      );

    // 1️⃣ Primeiro contato com o flashcard
    if (!review) {
      review = {
        id: randomUUID(),
        userId,
        flashcardId,

        repetitions: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReview: now,

        createdAt: now,
        updatedAt: now
      };

      await this.reviewRepository.create(review);
    }
    const before = {
      repetitions: review.repetitions,
      interval: review.interval,
      easeFactor: review.easeFactor
    };

    // 2️⃣ Aplicar SM-2
    const sm2Result = applySM2(
      {
        quality,
        repetitions: review.repetitions,
        interval: review.interval,
        easeFactor: review.easeFactor
      },
      now
    );

    review.repetitions = sm2Result.repetitions;
    review.interval = sm2Result.interval;
    review.easeFactor = sm2Result.easeFactor;
    review.nextReview = sm2Result.nextReview;
    review.updatedAt = now;

    await this.reviewRepository.update(review);

    // 3️⃣ Persistir histórico (imutável)
    const history: FlashcardReviewHistory = {
      id: randomUUID(),
      userId,
      flashcardId,

      quality,
      before,

      after:{

        repetitions: review.repetitions,
        interval: review.interval,
        easeFactor: review.easeFactor,
      },


      reviewedAt: now
    };

    await this.historyRepository.create(history);

    return review;
  }
}
