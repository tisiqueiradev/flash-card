import { randomUUID } from 'crypto';
import { Flashcard } from '../entities/Flashcard';
import {
  FlashcardRepository,
  CreateFlashcardDTO,
} from './FlashcardRepository';

export class InMemoryFlashcardRepository
  implements FlashcardRepository
{
  private flashcards: Flashcard[] = [];

  async findAll(): Promise<Flashcard[]> {
    return this.flashcards;
  }

  async findById(id: string): Promise<Flashcard | null> {
    const flashcard = this.flashcards.find(
      (flashcard) => flashcard.id === id
    );

    return flashcard ?? null;
  }

  async create(
    data: CreateFlashcardDTO
  ): Promise<Flashcard> {
    const newFlashcard: Flashcard = {
      id: randomUUID(),
      question: data.question,
      answer: data.answer,
      deck_id: data.deck_id,
    };

    this.flashcards.push(newFlashcard);
    return newFlashcard;
  }

  async update(
    id: string,
    data: CreateFlashcardDTO
  ): Promise<Flashcard | null> {
    const index = this.flashcards.findIndex(
      (flashcard) => flashcard.id === id
    );

    if (index === -1) {
      return null;
    }

    const updatedFlashcard: Flashcard = {
      id,
      question: data.question,
      answer: data.answer,
      deck_id: data.deck_id,
    };

    this.flashcards[index] = updatedFlashcard;
    return updatedFlashcard;
  }

  async delete(id: string): Promise<void> {
    this.flashcards = this.flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
  }
}

export const inMemoryFlashcardRepository =
  new InMemoryFlashcardRepository();
