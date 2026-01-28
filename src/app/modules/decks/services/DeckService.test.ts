// tests/DeckService.test.ts
import { DeckService } from '../services/DeckService';
import { DeckRepository } from '../respositores/DeckRepository';
import { Deck } from '../entities/deck';


jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('DeckService', () => {
  let deckRepository: jest.Mocked<DeckRepository>;
  let deckService: DeckService;

  beforeEach(() => {
    deckRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<DeckRepository>;

    deckService = new DeckService(deckRepository);
  });

  describe('findAll', () => {
    it('should return all decks', async () => {
      const decks: Deck[] = [{ id: '1', name: 'Deck 1', theme: 'Theme', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public' }];
      deckRepository.findAll.mockResolvedValue(decks);

      const result = await deckService.findAll();

      expect(result).toEqual(decks);
      expect(deckRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a deck when found', async () => {
      const deck: Deck = { id: '1', name: 'Deck 1', theme: 'Theme', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public' };
      deckRepository.findById.mockResolvedValue(deck);

      const result = await deckService.findById('1');

      expect(result).toEqual(deck);
      expect(deckRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error when deck not found', async () => {
      deckRepository.findById.mockResolvedValue(null);

      await expect(deckService.findById('1')).rejects.toThrow('Flashcard not found');
    });
  });

  describe('create', () => {
    it('should create and return a new deck', async () => {
      const data = { name: 'New Deck', theme: 'Theme', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public', };
      const createdDeck: Deck = { id: 'mock-uuid', ...data, isPublic: 'public', theme: '' };
      deckRepository.create.mockResolvedValue(createdDeck);

      const result = await deckService.create(data);

      expect(result).toEqual(createdDeck);
      expect(deckRepository.create).toHaveBeenCalledWith(createdDeck);
    });

    it('should throw an error when data is invalid', async () => {
      return await expect(deckService.create({
        name: '', theme: '', createdAt: new Date(), updatedAt: new Date(),
        isPublic: ''
      }))
        .rejects.toThrow('Question and answer are required');
    });
  });

  describe('update', () => {
    it('should update and return the deck', async () => {
      const data = { name: 'Updated Deck', theme: 'Theme', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public', };
      const existingDeck: Deck = { id: '1', name: 'Old Deck', theme: 'Old', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public' };
      deckRepository.findById.mockResolvedValue(existingDeck);
      deckRepository.update.mockResolvedValue({ ...existingDeck, ...data });

      const result = await deckService.update('1', data);

      expect(result).toEqual({ ...existingDeck, ...data });
      expect(deckRepository.update).toHaveBeenCalledWith('1', data);
    });

    it('should throw an error when deck not found', async () => {
      deckRepository.findById.mockResolvedValue(null);
      await expect(deckService.update('1', {
        name: 'X', theme: 'Y', createdAt: new Date(), updatedAt: new Date(),
        isPublic: ''
      }))
        .rejects.toThrow('Flashcard not found');
    });
  });

  describe('delete', () => {
    it('should delete the deck if found', async () => {
      const existingDeck: Deck = { id: '1', name: 'Deck', theme: 'Theme', createdAt: new Date(), updatedAt: new Date(), isPublic: 'public' };
      deckRepository.findById.mockResolvedValue(existingDeck);

      await deckService.delete('1');

      expect(deckRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if deck not found', async () => {
      deckRepository.findById.mockResolvedValue(null);

      await expect(deckService.delete('1')).rejects.toThrow('Flashcard not found');
    });
  });
});
