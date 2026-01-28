import { FlashcardService } from './FlashcardService';
import { InMemoryFlashcardRepository } from '../repositories/InMemoryFlashcardRepository';

describe('FlashcardService', () => {
  let flashcardService: FlashcardService;
  let flashcardRepository: InMemoryFlashcardRepository;

  beforeEach(() => {
    flashcardRepository = new InMemoryFlashcardRepository();
    flashcardService = new FlashcardService(flashcardRepository);
  });

  it('should create a flashcard', async () => {
    const flashcard = await flashcardService.create({
      question: "What's your name?",
      answer: 'Qual é o seu nome?',
      deck_id: 'deck-1',
    });

    expect(flashcard).toHaveProperty('id');
    expect(flashcard.question).toBe("What's your name?");
  });

  it('should not create a flashcard without question', async () => {
    await expect(
      flashcardService.create({
        question: '',
        answer: 'teste',
        deck_id: 'deck-1',
      })
    ).rejects.toThrow('Question and answer are required');
  });

  it('should throw error when flashcard does not exist', async () => {
    await expect(
      flashcardService.findById('invalid-id')
    ).rejects.toThrow('Flashcard not found');
  });

  it('should not delete a non existing flashcard', async () => {
    await expect(
      flashcardService.delete('invalid-id')
    ).rejects.toThrow('Flashcard not found');
  });
});
