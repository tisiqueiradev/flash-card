import { Router } from 'express';

import { FlashcardReviewController } from '../controller/FlashcardReviewController';
import { FlashcardReviewService } from '../services/FlashcardReviewService';
import { InMemoryFlashcardReviewRepository } from '../repositories/InMemoryFlashcardReviewRepository';

const router = Router();

/**
 * Dependency Injection manual (simples e profissional)
 */
const reviewRepository = new InMemoryFlashcardReviewRepository();
const reviewService = new FlashcardReviewService(reviewRepository);
const reviewController = new FlashcardReviewController(reviewService);

/**
 * Routes
 * POST /flashcards/:flashcardId/review
 */
router.post('/:flashcardId/review', (request, response) =>
  reviewController.review(request, response)
);

export { router };
