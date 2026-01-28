import { Request, Response } from 'express';
import { InMemoryFlashcardRepository } from '../repositories/InMemoryFlashcardRepository';

const flashcardRepository = new InMemoryFlashcardRepository();

type IdParams = {
  id: string;
};

class FlashcardController {

  async index(req: Request, res: Response) {
    const flashcards = await flashcardRepository.findAll();
    return res.json(flashcards);
  }

  async show(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const flashcard = await flashcardRepository.findById(id);

    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    return res.json(flashcard);
  }

  async store(req: Request, res: Response) {
    const { question, answer, deck_id } = req.body;

    if (!question || !answer || !deck_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const flashcard = await flashcardRepository.create({
      question,
      answer,
      deck_id,
    });

    return res.status(201).json(flashcard);
  }

  async update(req: Request<IdParams>, res: Response) {
    const { id } = req.params;
    const { question, answer, deck_id } = req.body;

    const flashcard = await flashcardRepository.update(id, {
      question,
      answer,
      deck_id,
    });

    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    return res.json(flashcard);
  }

  async delete(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const flashcard = await flashcardRepository.findById(id);

    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    await flashcardRepository.delete(id);
    return res.sendStatus(204);
  }
}

export default new FlashcardController();
