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
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.decks.push(newDeck);
    return newDeck;
  }

  async update(id: string, data: CreateDeckDTO): Promise<Deck | null> {
  const index = this.decks.findIndex(deck => deck.id === id);
  if (index === -1) return null;

  const deck = this.decks[index];

  const updatedDeck: Deck = {
    id,
    name: data.name,
    theme: data.theme,
    isPublic: data.isPublic,
    createdAt: deck.createdAt,
    updatedAt: new Date(),
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


