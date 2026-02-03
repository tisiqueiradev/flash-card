/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { DeckService } from '../services/DeckService';
import { PrismaDeckRepository } from '../respositores/PrismaDeckRepository';

const deckRepository = new PrismaDeckRepository();
const deckService = new DeckService(deckRepository);

class DeckController {
  async index(req: Request, res: Response) {
    const decks = await deckService.findAll();
    return res.json(decks);
  }

  async show(req: Request<{ id: string }>, res: Response) {
    try {
      const deck = await deckService.findById(req.params.id);
      return res.json(deck);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const deck = await deckService.create({
        name: req.body.name,
        theme: req.body.theme,
        isPublic: req.body.isPublic ?? true,
        userId: req.body.userId,
      });

      return res.status(201).json(deck);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const deck = await deckService.update(req.params.id, {
        name: req.body.name,
        theme: req.body.theme,
        isPublic: req.body.isPublic,
      });

      return res.json(deck);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await deckService.delete(req.params.id);
      return res.sendStatus(204);

    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}

export default new DeckController();
