import { Router } from 'express';

import { FlashcardReviewController } from '../controller/FlashcardReviewController';
import { FlashcardReviewService } from '../services/FlashcardReviewService';

import { InMemoryFlashcardReviewRepository } from '../repositories/InMemoryFlashcardReviewRepository';
import { InMemoryFlashcardReviewHistoryRepository } from '../repositories/InMemoryFlashcardReviewHistoryRepository';
import { ensureAuthenticated } from '../../../../shared/middlewares/ensureAuthenticated';

const router = Router();

/**
 * Dependency Injection manual (simples e profissional)
 */
const reviewRepository = new InMemoryFlashcardReviewRepository();
const historyRepository = new InMemoryFlashcardReviewHistoryRepository();

const reviewService = new FlashcardReviewService(
  reviewRepository,
  historyRepository
);

const reviewController = new FlashcardReviewController(reviewService);

 router.post(
  '/flashcards/:flashcardId/review',
  ensureAuthenticated,
  (request, response) => reviewController.review(request, response)
);


router.post('/:flashcardId/review', (request, response) =>
  reviewController.review(request, response)
);

export { router };
