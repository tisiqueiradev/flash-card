import { Router } from 'express';

import { FlashcardReviewController } from '../controller/FlashcardReviewController';
import { FlashcardReviewService } from '../services/FlashcardReviewService';

import { InMemoryFlashcardReviewRepository } from '../repositories/InMemoryFlashcardReviewRepository';
import { InMemoryFlashcardReviewHistoryRepository } from '../repositories/InMemoryFlashcardReviewHistoryRepository';

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

/**
 * Routes
 * POST /flashcards/:flashcardId/review
 */
router.post('/:flashcardId/review', (request, response) =>
  reviewController.review(request, response)
);

export { router };
