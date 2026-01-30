import { Request, Response } from 'express';
import { prisma } from '../../../../shared/database/prisma';

class DeckController {
  // Listar todos os decks
  async index(req: Request, res: Response) {
    const decks = await prisma.deck.findMany();

    // Mapeia Prisma → API
    const mapped = decks.map((d) => ({
      id: d.id,
      name: d.title,
      theme: d.description,
      isPublic: d.isPublic,
      userId: d.userId,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));

    return res.json(mapped);
  }

  // Buscar deck pelo id
  async show(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const deck = await prisma.deck.findUnique({ where: { id } });

    if (!deck) return res.status(404).json({ error: 'deck not found' });

    return res.json({
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    });
  }

  // Criar novo deck
  async store(req: Request, res: Response) {
    const { name, theme, isPublic, userId } = req.body;

    if (!name || !theme || !userId) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const deck = await prisma.deck.create({
      data: {
        title: name,
        description: theme,
        isPublic: isPublic ?? true,
        userId,
      },
    });

    return res.status(201).json({
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    });
  }

  // Atualizar deck
  async update(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const { name, theme, isPublic } = req.body;

    const deck = await prisma.deck
      .update({
        where: { id },
        data: {
          title: name,
          description: theme,
          isPublic,
        },
      })
      .catch(() => null);

    if (!deck) return res.status(404).json({ error: 'deck not found' });

    return res.json({
      id: deck.id,
      name: deck.title,
      theme: deck.description,
      isPublic: deck.isPublic,
      userId: deck.userId,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    });
  }

  // Deletar deck
  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const deck = await prisma.deck.findUnique({ where: { id } });
    if (!deck) return res.status(404).json({ error: 'deck not found' });

    await prisma.deck.delete({ where: { id } });
    return res.sendStatus(204);
  }
}

export default new DeckController();
