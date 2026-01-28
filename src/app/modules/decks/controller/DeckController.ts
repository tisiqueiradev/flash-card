import { Request, Response } from 'express';
import { InMemoryDeckRepository } from '../respositores/InMemoryDeckRepository';


const deckRepository = new InMemoryDeckRepository();

type IdParams = {
  id: string;
};

class DeckController {

  async index(req: Request, res: Response) {
    const decks = await deckRepository.findAll();
    return res.json(decks);
  }

  async show(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const deck = await deckRepository.findById(id);

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    return res.json(deck);
  }

  async store(req: Request, res: Response) {
    const { name,theme, isPublic, createdAt,updatedAt } = req.body;

    if (!theme || !name ) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const deck = await deckRepository.create({
      name,
      theme,
      isPublic,
      createdAt,
      updatedAt,
    });

    return res.status(201).json(deck);
  }

  async update(req: Request<IdParams>, res: Response) {
    const { id } = req.params;
    const { name, theme, updatedAt, createdAt } = req.body;

    const deck = await deckRepository.update(id, {
      name,
      theme,
      updatedAt,
      isPublic: 'public',
      createdAt
    });

    if (!deck) {
      return res.status(404).json({ error: 'deck not found' });
    }

    return res.json(deck);
  }

  async delete(req: Request<IdParams>, res: Response) {
    const { id } = req.params;

    const deck = await deckRepository.findById(id);

    if (!deck) {
      return res.status(404).json({ error: 'deck not found' });
    }

    await deckRepository.delete(id);
    return res.sendStatus(204);
  }
}

export default new DeckController();
