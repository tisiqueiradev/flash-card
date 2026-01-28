import { v4 as uuidv4 } from 'uuid';
import { Deck } from '../entities/deck';
import {
  DeckRepository,
  CreateDeckDTO,
} from '../respositores/DeckRepository';

export class DeckService {
  constructor(
    private readonly DeckRepository: DeckRepository
  ) {}

  async findAll(): Promise<Deck[]> {
    return this.DeckRepository.findAll();
  }

  async findById(id: string): Promise<Deck> {
    const flashcard = await this.DeckRepository.findById(id);

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    return flashcard;
  }

  async create(data: CreateDeckDTO): Promise<Deck> {
    if (!data.name || !data.theme) {
      throw new Error('Question and answer are required');
    }

    const deck: Deck = {
      id: uuidv4(),
      name: data.name,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
      isPublic: 'public',
      theme: ''
    };

    return this.DeckRepository.create(deck);
  }

  async update(
    id: string,
    data: CreateDeckDTO
  ): Promise<Deck> {
    const existingFlashcard =
      await this.DeckRepository.findById(id);

    if (!existingFlashcard) {
      throw new Error('Flashcard not found');
    }

    const updatedFlashcard = await this.DeckRepository.update(
      id,
      data
    );

    return updatedFlashcard!;
  }

  async delete(id: string): Promise<void> {
    const flashcard = await this.DeckRepository.findById(id);

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    await this.DeckRepository.delete(id);
  }
}
