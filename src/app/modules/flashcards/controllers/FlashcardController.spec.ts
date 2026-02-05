/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';

/* =====================================================
   MOCK HOISTED DOS MÉTODOS DO SERVICE
===================================================== */
const mockFlashcardServiceMethods = vi.hoisted(() => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}));

/* =====================================================
   MOCK DO SERVICE (COMO CLASSE CONSTRUTÍVEL)
===================================================== */
vi.mock('../services/FlashcardService', () => {
  class FlashcardServiceMock {
    constructor() {
      Object.assign(this, mockFlashcardServiceMethods);
    }
  }

  return {
    FlashcardService: FlashcardServiceMock,
  };
});

/* =====================================================
   MOCK DOS REPOSITÓRIOS (TAMBÉM CLASSES)
===================================================== */
vi.mock('../repositories/PrismaFlashcarRepository', () => {
  class PrismaFlashcardRepositoryMock {}
  return {
    PrismaFlashcardRepository: PrismaFlashcardRepositoryMock,
  };
});

vi.mock('../../decks/respositories/PrismaDeckRepository', () => {
  class PrismaDeckRepositoryMock {}
  return {
    PrismaDeckRepository: PrismaDeckRepositoryMock,
  };
});

/* =====================================================
   IMPORT DO CONTROLLER (DEPOIS DOS MOCKS)
===================================================== */
import FlashcardController from './FlashcardController';

describe('FlashcardController', () => {
  let mockRequest: any;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      params: {},
      body: {},
    };

    mockResponse = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };
  });

  describe('index', () => {
    it('deve retornar todos os flashcards', async () => {
      const flashcards = [{ id: '1', question: 'Q', answer: 'A' }];

      mockFlashcardServiceMethods.findAll.mockResolvedValue(flashcards);

      await FlashcardController.index(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockFlashcardServiceMethods.findAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(flashcards);
    });
  });

  describe('show', () => {
    it('deve retornar um flashcard pelo id', async () => {
      const flashcard = { id: '1', question: 'Q', answer: 'A' };
      mockRequest.params = { id: '1' };

      mockFlashcardServiceMethods.findById.mockResolvedValue(flashcard);

      await FlashcardController.show(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockFlashcardServiceMethods.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.json).toHaveBeenCalledWith(flashcard);
    });

    it('deve retornar 404 se não encontrar', async () => {
      mockRequest.params = { id: '999' };
      mockFlashcardServiceMethods.findById.mockResolvedValue(null);

      await FlashcardController.show(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Flashcard not found',
      });
    });
  });

  describe('store', () => {
    it('deve criar um flashcard', async () => {
      const data = { question: 'Q', answer: 'A', deck_id: 'd1' };
      mockRequest.body = data;

      mockFlashcardServiceMethods.create.mockResolvedValue({
        id: '1',
        ...data,
      });

      await FlashcardController.store(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockFlashcardServiceMethods.create).toHaveBeenCalledWith(data);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('delete', () => {
    it('deve deletar um flashcard', async () => {
      mockRequest.params = { id: '1' };
      mockFlashcardServiceMethods.findById.mockResolvedValue({ id: '1' });

      await FlashcardController.delete(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockFlashcardServiceMethods.delete).toHaveBeenCalledWith('1');
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
