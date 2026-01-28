import { Request, Response } from 'express';
import { FlashcardReviewService } from '../services/FlashcardReviewService';

export class FlashcardReviewController {
  constructor(
    private flashcardReviewService: FlashcardReviewService
  ) {}

  async review(request: Request, response: Response): Promise<Response> {
    const rawFlashcardId = request.params.flashcardId;
    const { userId, quality } = request.body;

    const flashcardId =
      typeof rawFlashcardId === 'string'
        ? rawFlashcardId
        : rawFlashcardId?.[0];

    const parsedQuality = Number(quality);

    if (
      !userId ||
      !flashcardId ||
      Number.isNaN(parsedQuality)
    ) {
      return response.status(400).json({
        error: 'userId, flashcardId and quality are required'
      });
    }

    if (parsedQuality < 0 || parsedQuality > 5) {
      return response.status(400).json({
        error: 'quality must be between 0 and 5'
      });
    }

    const review = await this.flashcardReviewService.execute({
      userId,
      flashcardId,
      quality: parsedQuality
    });

    return response.status(200).json(review);
  }
}
