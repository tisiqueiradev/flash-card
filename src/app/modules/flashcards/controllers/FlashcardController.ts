import { Request, Response } from 'express';
import { prisma } from '../../../../shared/database/prisma';

type IdParams = {
  id: string;
};

class FlashcardController {
  async index(req: Request, res: Response) {
    const flashcards = await prisma.flashcard.findMany();
    return res.json(flashcards);
  }

  async show(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    try {
      const flashcard = await prisma.flashcard.findUnique({
        where: { id },
      });

      if (!flashcard) {
        return res.status(404).json({ error: 'Flashcard not found' });
      }

      return res.json(flashcard);
    } catch {
      return res.status(400).json({ error: 'Invalid flashcard ID' });
    }
  }

  async store(req: Request, res: Response) {
    const { question, answer, deck_id } = req.body;

    if (!question || !answer || !deck_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // ✅ CHECAGEM EXPLÍCITA (isso evita o 500)
    const deckExists = await prisma.deck.findUnique({
      where: { id: deck_id },
    });

    if (!deckExists) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const flashcard = await prisma.flashcard.create({
      data: {
        question,
        answer,
        deck_id,
      },
    });

    return res.status(201).json(flashcard);
  }

  async update(req: Request<IdParams>, res: Response) {
    const { id } = req.params;
    const { question, answer } = req.body;

    const existing = await prisma.flashcard.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: {
        question,
        answer,
      },
    });

    return res.json(flashcard);
  }

  async delete(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const existing = await prisma.flashcard.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    await prisma.flashcard.delete({
      where: { id },
    });

    return res.sendStatus(204);
  }
}

export default new FlashcardController();
