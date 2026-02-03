import { prisma } from '../../../../shared/database/prisma';
import { Deck } from '../entities/deck';
import { DeckRepository } from './DeckRepository';
import { CreateDeckDTO } from '../services/CreateDeckDTO';
import { UpdateDeckDTO } from '../services/UpdateDeckDTO';

export class PrismaDeckRepository implements DeckRepository {
  async findAll(): Promise<Deck[]> {
    const decks = await prisma.deck.findMany();

    return decks.map((d) => ({
      id: d.id,
      name: d.title,
      theme: d.description,
      isPublic: d.isPublic,
      userId: d.userId,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
  }

  async findById(id: string): Promise<Deck | null> {
    const deck = await prisma.deck.findUnique({ where: { id } });
    if (!deck) return null;

    return {
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    };
  }

  async create(data: CreateDeckDTO): Promise<Deck> {
    const deck = await prisma.deck.create({
      data: {
        title: data.name,
        description: data.theme,
        isPublic: data.isPublic,
        userId: data.userId,
      },
    });

    return {
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    };
  }

  async update(
    id: string,
    data: UpdateDeckDTO
  ): Promise<Deck | null> {
    const deck = await prisma.deck
      .update({
        where: { id },
        data: {
          title: data.name,
          description: data.theme,
          isPublic: data.isPublic,
        },
      })
      .catch(() => null);

    if (!deck) return null;

    return {
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.deck.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
