/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';

import { FlashcardReviewController } from './FlashcardReviewController';
import { FlashcardReviewService } from '../services/FlashcardReviewService';

describe('FlashcardReviewController', () => {
  let controller: FlashcardReviewController;
  let service: FlashcardReviewService;

  let request: Partial<Request>;
  let response: Partial<Response>;

  beforeEach(() => {
    service = {
      execute: vi.fn()
    } as unknown as FlashcardReviewService;

    controller = new FlashcardReviewController(service);

    request = {
      body: {},
      params: {},
      user: {
        id: 'user-123'
      }
    } as Partial<Request>;

    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  it('should return 400 if required data is missing', async () => {
    request.body = {};
    request.params = { flashcardId: '' };

    await controller.review(
      request as Request,
      response as Response
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: `flashcardId and quality are required`
    });
  });

  it('should return 400 if quality is invalid', async () => {
    request.body = { quality: 10 };
    request.params = { flashcardId: 'flashcard-123' };

    await controller.review(
      request as Request,
      response as Response
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: 'quality must be between 0 and 5'
    });
  });

  it('should call service and return review on success', async () => {
    const review = {
      id: 'review-123',
      userId: 'user-123',
      flashcardId: 'flashcard-123',
      quality: 4
    };

    (service.execute as any).mockResolvedValue(review);

    request.body = { quality: 4 };
    request.params = { flashcardId: 'flashcard-123' };

    await controller.review(
      request as Request,
      response as Response
    );

    expect(service.execute).toHaveBeenCalledWith({
      userId: 'user-123',
      flashcardId: 'flashcard-123',
      quality: 4
    });

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(review);
  });
});
