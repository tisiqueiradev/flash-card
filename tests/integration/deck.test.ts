import request from 'supertest';
import app from '../../src/app'; // seu express app
import { v4 as uuidv4 } from 'uuid';

describe('Deck routes', () => {

  async function createDeck(overrides = {}) {
    const data = {
      name: 'Test Deck',
      theme: 'Test Theme',
      isPublic: 'public',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };

    const response = await request(app)
      .post('/decks')
      .send(data);

    return response.body;
  }

  describe('GET /decks', () => {
    it('should return a list of decks', async () => {
      await createDeck();

      const response = await request(app).get('/decks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /decks/:id', () => {
    it('should return a deck by id', async () => {
      const deck = await createDeck();

      const response = await request(app)
        .get(`/decks/${deck.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(deck.id);
    });

    it('should return 404 if deck not found', async () => {
      const response = await request(app)
        .get(`/decks/${uuidv4()}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Deck not found');
    });
  });

  describe('POST /decks', () => {
    it('should create and return a deck', async () => {
      const response = await request(app)
        .post('/decks')
        .send({
          name: 'New Deck',
          theme: 'New Theme',
          isPublic: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('New Deck');
    });

    it('should return 400 if required fields missing', async () => {
      const response = await request(app)
        .post('/decks')
        .send({
          name: '',
          theme: '',
          isPublic: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid data');
    });
  });

  describe('PUT /decks/:id', () => {
    it('should update a deck', async () => {
      const deck = await createDeck();

      const response = await request(app)
        .put(`/decks/${deck.id}`)
        .send({
          name: 'Updated Deck',
          theme: 'Updated Theme',
          createdAt: deck.createdAt,
          updatedAt: new Date(),
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Deck');
    });

    it('should return 404 if deck does not exist', async () => {
      const response = await request(app)
        .put(`/decks/${uuidv4()}`)
        .send({
          name: 'X',
          theme: 'Y',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('deck not found');
    });
  });

  describe('DELETE /decks/:id', () => {
    it('should delete a deck and return 204', async () => {
      const deck = await createDeck();

      const response = await request(app)
        .delete(`/decks/${deck.id}`);

      expect(response.status).toBe(204);

      const getResponse = await request(app)
        .get(`/decks/${deck.id}`);

      expect(getResponse.status).toBe(404);
      expect(getResponse.body.error).toBe('Deck not found');
    });

    it('should return 404 if deck not found', async () => {
      const response = await request(app)
        .delete(`/decks/${uuidv4()}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('deck not found');
    });
  });
});
