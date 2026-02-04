/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';

import DeckController from '../controller/DeckController';
import * as DeckServiceModule from '../services/DeckService';

describe('DeckController', () => {
  let req: any;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
      sendStatus: vi.fn(),
    };

    vi.restoreAllMocks();
  });

  it('should return all decks and status code', async () => {
    const decks = [{ id: '1', name: 'Deck 1' }];

    const findAllSpy = vi
      .spyOn(DeckServiceModule.DeckService.prototype, 'findAll')
      .mockResolvedValue(decks as any);

    await DeckController.index(req as Request, res as Response);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(decks);
  });

  it('should return a deck by id', async () => {
    req = { params: { id: '1' } };
    const deck = { id: '1', name: 'Deck 1' };

    const findByIdSpy = vi
      .spyOn(DeckServiceModule.DeckService.prototype, 'findById')
      .mockResolvedValue(deck as any);

    await DeckController.show(req as Request, res as Response);

    expect(findByIdSpy).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deck);
  });

  it('should return 404 if deck not found', async () => {
    req = { params: { id: '1' } };

    const findByIdSpy = vi
      .spyOn(DeckServiceModule.DeckService.prototype, 'findById')
      .mockRejectedValue(new Error('Deck not found'));

    await DeckController.show(req as Request, res as Response);

    expect(findByIdSpy).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Deck not found' });
  });

  it('should create a deck', async () => {
    req = {
      body: {
        name: 'Deck',
        theme: 'Theme',
        isPublic: true,
        userId: 'user-1',
      },
    };

    const deck = { id: '1', ...req.body };

    const createSpy = vi
      .spyOn(DeckServiceModule.DeckService.prototype, 'create')
      .mockResolvedValue(deck as any);

    await DeckController.store(req as Request, res as Response);

    expect(createSpy).toHaveBeenCalledWith({
      name: 'Deck',
      theme: 'Theme',
      isPublic: true,
      userId: 'user-1',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(deck);
  });

  it('should delete a deck', async () => {
    req = { params: { id: '1' } };

    const deleteSpy = vi
      .spyOn(DeckServiceModule.DeckService.prototype, 'delete')
      .mockResolvedValue(undefined);

    await DeckController.delete(req as Request, res as Response);

    expect(deleteSpy).toHaveBeenCalledWith('1');
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
});
