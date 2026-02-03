import { FlashcardService } from './FlashcardService';
import { InMemoryFlashcardRepository } from '../repositories/InMemoryFlashcardRepository';
import { InMemoryDeckRepository } from '../../decks/respositores/InMemoryDeckRepository';

describe('FlashcardService', () => {
  let flashcardService: FlashcardService;
  let flashcardRepository: InMemoryFlashcardRepository;
  let deckRepository: InMemoryDeckRepository;

  beforeEach(() => {
    flashcardRepository = new InMemoryFlashcardRepository();
    deckRepository = new InMemoryDeckRepository();

    flashcardService = new FlashcardService(
      flashcardRepository,
      deckRepository
    );
  });

  it('should create a flashcard', async () => {
    const deck = await deckRepository.create({
      name: 'Deck test',
      theme: 'Theme',
      isPublic: 'true',
      userId: 'user-1'
    });

    const flashcard = await flashcardService.create({
      question: 'Question?',
      answer: 'Answer',
      deck_id: deck.id,
    });

    expect(flashcard).toHaveProperty('id');
  });

  it('should not create flashcard without deck', async () => {
    await expect(
      flashcardService.create({
        question: 'Question?',
        answer: 'Answer',
        deck_id: 'invalid-deck',
      })
    ).rejects.toThrow('Deck not found');
  });
});
