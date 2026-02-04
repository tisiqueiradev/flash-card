import { prisma } from '../../../../shared/database/prisma';

import { FlashcardReview } from '../entities/FlashcardReview';
import { FlashcardReviewRepository } from './FlashcardReviewRepository';


export class PrismaFlashcardReviewRepository
  implements FlashcardReviewRepository {

  async findByUserAndFlashcard(
    userId: string,
    flashcardId: string
  ): Promise<FlashcardReview | null> {
    const review = await prisma.flashcardReview.findUnique({
      where: {
        userId_flashcardId: {
          userId,
          flashcardId
        }
      }
    });

    return review;
  }

  async findDueByUser(
    userId: string,
    now: Date
  ): Promise<FlashcardReview[]> {
    return prisma.flashcardReview.findMany({
      where: {
        userId,
        nextReview: {
          lte: now
        }
      },
      orderBy: {
        nextReview: 'asc'
      }
    });
  }

  async create(
    review: FlashcardReview
  ): Promise<FlashcardReview> {
    return prisma.flashcardReview.create({
      data: {
        id: review.id,
        userId: review.userId,
        flashcardId: review.flashcardId,

        repetitions: review.repetitions,
        interval: review.interval,
        easeFactor: review.easeFactor,
        nextReview: review.nextReview,

        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      }
    });
  }

  async update(
    review: FlashcardReview
  ): Promise<FlashcardReview> {
    return prisma.flashcardReview.update({
      where: {
        id: review.id
      },
      data: {
        repetitions: review.repetitions,
        interval: review.interval,
        easeFactor: review.easeFactor,
        nextReview: review.nextReview,
        updatedAt: review.updatedAt
      }
    });
  }
}
