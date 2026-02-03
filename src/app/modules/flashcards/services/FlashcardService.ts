import { v4 as uuidv4 } from 'uuid';
import { Flashcard } from '../entities/Flashcard';
import {
  FlashcardRepository,
  CreateFlashcardDTO,
} from '../repositories/FlashcardRepository';
import { DeckRepository } from '../../decks/respositores/DeckRepository';

export class FlashcardService {
  constructor(
    private readonly flashcardRepository: FlashcardRepository,
    private readonly deckRepository: DeckRepository
  ) {}

  async findAll(): Promise<Flashcard[]> {
    return this.flashcardRepository.findAll();
  }

  async findById(id: string): Promise<Flashcard> {
    const flashcard = await this.flashcardRepository.findById(id);

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    return flashcard;
  }

  async create(data: CreateFlashcardDTO): Promise<Flashcard> {
    if (!data.question || !data.answer || !data.deck_id) {
      throw new Error('Invalid data');
    }

    // 🔐 REGRA DE NEGÓCIO: flashcard não existe sem deck
    const deckExists = await this.deckRepository.findById(data.deck_id);

    if (!deckExists) {
      throw new Error('Deck not found');
    }

    const flashcard: Flashcard = {
      id: uuidv4(),
      question: data.question,
      answer: data.answer,
      deck_id: data.deck_id,
    };

    return this.flashcardRepository.create(flashcard);
  }

  async update(
    id: string,
    data: CreateFlashcardDTO
  ): Promise<Flashcard> {
    const existingFlashcard =
      await this.flashcardRepository.findById(id);

    if (!existingFlashcard) {
      throw new Error('Flashcard not found');
    }

    if (data.deck_id) {
      const deckExists = await this.deckRepository.findById(data.deck_id);

      if (!deckExists) {
        throw new Error('Deck not found');
      }
    }

    const updatedFlashcard = await this.flashcardRepository.update(
      id,
      data
    );

    return updatedFlashcard!;
  }

  async delete(id: string): Promise<void> {
    const flashcard = await this.flashcardRepository.findById(id);

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    await this.flashcardRepository.delete(id);
  }
}
