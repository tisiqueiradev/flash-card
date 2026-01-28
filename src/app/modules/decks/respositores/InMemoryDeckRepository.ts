import { randomUUID } from "crypto";
import { Deck } from '../entities/deck';
import { DeckRepository, CreateDeckDTO } from "./DeckRepository";

export class InMemoryDeckRepository implements DeckRepository{

  private decks: Deck[] = [];

  async findAll(): Promise<Deck[]> {
    return this.decks
  }

  async findById(id: string): Promise<Deck | null> {
    const decks = this.decks.find(
      (deck) => deck.id === id
    );

    return decks ?? null
  }

  async create(
    data: CreateDeckDTO
  ): Promise<Deck>{

    const newDeck: Deck = {
      id: randomUUID(),
      name: data.name,
      theme: data.theme,
      isPublic: data.isPublic,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };

    this.decks.push(newDeck);
    return newDeck;
  }

  async update(id: string, data: CreateDeckDTO): Promise<Deck | null> {
  const index = this.decks.findIndex(deck => deck.id === id);

  if (index === -1) return null; // ⬅ agora retorna null se não existir

  const updatedDeck: Deck = {
    id,
    name: data.name,
    theme: data.theme,
    isPublic: data.isPublic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };

  this.decks[index] = updatedDeck;
  return updatedDeck;
}
  async delete(id:string): Promise<void> {
    this.decks = this.decks.filter(
      (deck) => deck.id !== id
    )
  }

}

