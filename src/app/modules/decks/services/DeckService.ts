import { Deck } from '../entities/deck';
import {
  DeckRepository,
} from '../respositores/DeckRepository';
import { CreateDeckDTO } from '../services/CreateDeckDTO';
import { UpdateDeckDTO} from '../services/UpdateDeckDTO';

export class DeckService {
  constructor(
    private readonly deckRepository: DeckRepository
  ) {}

  async findAll(): Promise<Deck[]> {
    return this.deckRepository.findAll();
  }

  async findById(id: string): Promise<Deck> {
    const deck = await this.deckRepository.findById(id);

    if (!deck) {
      throw new Error('Deck not found');
    }

    return deck;
  }

  async create(data: CreateDeckDTO): Promise<Deck> {
    if (!data.name || !data.theme) {
      throw new Error('Name and theme are required');
    }

    return this.deckRepository.create(data);
  }

  async update(id: string, data: UpdateDeckDTO): Promise<Deck> {
    const existingDeck = await this.deckRepository.findById(id);

    if (!existingDeck) {
      throw new Error('Deck not found');
    }

    const updatedDeck = await this.deckRepository.update(id, data);

    return updatedDeck!;
  }

  async delete(id: string): Promise<void> {
    const deck = await this.deckRepository.findById(id);

    if (!deck) {
      throw new Error('Deck not found');
    }

    await this.deckRepository.delete(id);
  }
}
