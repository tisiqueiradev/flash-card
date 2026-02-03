/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { FlashcardService } from '../services/FlashcardService';
import { PrismaFlashcardRepository } from '../repositories/PrismaFlashcarRepository';
import { PrismaDeckRepository } from '../../decks/respositories/PrismaDeckRepository';


const flashcardRepository  = new PrismaFlashcardRepository();
const deckRepository = new PrismaDeckRepository();

const flashcardService = new FlashcardService(flashcardRepository, deckRepository);

type IdParams = {
  id: string;
};

class FlashcardController {
  async index(req: Request, res: Response) {
    const flashcards = await flashcardService.findAll();
    return res.json(flashcards);
  }

  async show(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    try {
      const flashcard = await flashcardService.findById(id)

      if (!flashcard) {
        return res.status(404).json({ error: 'Flashcard not found' });
      }

      return res.json(flashcard);
    } catch {
      return res.status(400).json({ error: 'Invalid flashcard ID' });
    }
  }

  async store(req: Request, res: Response) {
  const data = req.body;

  if (!data.question || !data.answer || !data.deck_id) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const flashcard = await flashcardService.create(data);
    return res.status(201).json(flashcard);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}


  async update(req: Request<IdParams>, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const existing = await flashcardService.findById(id)

    if (!existing) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    const flashcard = await flashcardService.update(id, data)
    return res.json(flashcard);
  }

  async delete(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const existing = await flashcardService.findById(id);

    if (!existing) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    await flashcardService.delete(id)

    return res.sendStatus(204);
  }
}

export default new FlashcardController();
