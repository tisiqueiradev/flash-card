import { prisma } from '../../../../shared/database/prisma';

import { FlashcardReviewHistory } from '../entities/FlashcardReviewHistory';
import { FlashcardReviewHistoryRepository } from './FlashcardReviewHistoryRepository';

export class PrismaFlashcardReviewHistoryRepository
  implements FlashcardReviewHistoryRepository {

  async create(
    history: FlashcardReviewHistory
  ): Promise<FlashcardReviewHistory> {
    const created = await prisma.flashcardReviewHistory.create({
      data: {
        id: history.id,
        userId: history.userId,
        flashcardId: history.flashcardId,
        quality: history.quality,
        before: history.before as unknown as object,
        after: history.after as unknown as object,
        reviewedAt: history.reviewedAt
      }
    });

    // 👇 adaptação explícita Prisma → Domínio
    return {
      id: created.id,
      userId: created.userId,
      flashcardId: created.flashcardId,
      quality: created.quality,
      before: created.before as FlashcardReviewHistory['before'],
      after: created.after as FlashcardReviewHistory['after'],
      reviewedAt: created.reviewedAt
    };
  }

  async findByUserAndFlashcard(
    userId: string,
    flashcardId: string
  ): Promise<FlashcardReviewHistory[]> {
    const rows = await prisma.flashcardReviewHistory.findMany({
      where: {
        userId,
        flashcardId
      },
      orderBy: {
        reviewedAt: 'desc'
      }
    });

    return rows.map(row => ({
      id: row.id,
      userId: row.userId,
      flashcardId: row.flashcardId,
      quality: row.quality,
      before: row.before as FlashcardReviewHistory['before'],
      after: row.after as FlashcardReviewHistory['after'],
      reviewedAt: row.reviewedAt
    }));
  }

  async findByFlashcard(
    flashcardId: string
  ): Promise<FlashcardReviewHistory[]> {
    const rows = await prisma.flashcardReviewHistory.findMany({
      where: { flashcardId },
      orderBy: { reviewedAt: 'desc' }
    });

    return rows.map(row => ({
      id: row.id,
      userId: row.userId,
      flashcardId: row.flashcardId,
      quality: row.quality,
      before: row.before as FlashcardReviewHistory['before'],
      after: row.after as FlashcardReviewHistory['after'],
      reviewedAt: row.reviewedAt
    }));
  }

  async findByUser(
    userId: string
  ): Promise<FlashcardReviewHistory[]> {
    const rows = await prisma.flashcardReviewHistory.findMany({
      where: { userId },
      orderBy: { reviewedAt: 'desc' }
    });

    return rows.map(row => ({
      id: row.id,
      userId: row.userId,
      flashcardId: row.flashcardId,
      quality: row.quality,
      before: row.before as FlashcardReviewHistory['before'],
      after: row.after as FlashcardReviewHistory['after'],
      reviewedAt: row.reviewedAt
    }));
  }
}
