import request from 'supertest';
import app from '../../src/app';

describe('Flashcards routes', () => {

  async function createFlashcard(overrides = {}) {
    const data = {
      question: 'How old are you?',
      answer: 'Quantos anos você tem?',
      deck_id: 'deck-test-id',
      ...overrides,
    };

    const response = await request(app)
      .post('/flashcards')
      .send(data);

    return response.body;
  }

  describe('GET /flashcards', () => {
    it('should return a list of flashcards', async () => {
      await createFlashcard();

      const response = await request(app).get('/flashcards');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /flashcards/:id', () => {
    it('should return a flashcard by id', async () => {
      const flashcard = await createFlashcard();

      const response = await request(app)
        .get(`/flashcards/${flashcard.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(flashcard.id);
    });
  });

  describe('POST /flashcards', () => {
    it('should create and return a flashcard', async () => {
      const response = await request(app)
        .post('/flashcards')
        .send({
          question: 'What is your name?',
          answer: 'Qual é o seu nome?',
          deck_id: 'deck-1',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.question).toBe('What is your name?');
    });
  });

  describe('PUT /flashcards/:id', () => {
    it('should update a flashcard', async () => {
      const flashcard = await createFlashcard();

      const response = await request(app)
        .put(`/flashcards/${flashcard.id}`)
        .send({
          question: 'Updated question?',
          answer: 'Pergunta atualizada?',
          deck_id: flashcard.deck_id,
        });

      expect(response.status).toBe(200);
      expect(response.body.question).toBe('Updated question?');
    });

    it('should return 200 if question is missing', async () => {
      const flashcard = await createFlashcard();

      const response = await request(app)
        .put(`/flashcards/${flashcard.id}`)
        .send({
          answer: 'test',
          deck_id: 'test',
        });

      expect(response.status).toBe(200);
    });

    it('should return 404 if flashcard does not exist', async () => {
      const response = await request(app)
        .put('/flashcards/invalid-id')
        .send({
          question: 'test',
          answer: 'test',
          deck_id: 'test',
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Flashcard not found');
    });
  });

  describe('DELETE /flashcards/:id', () => {
    it('should delete a flashcard and return 204', async () => {
      const flashcard = await createFlashcard();

      const response = await request(app)
        .delete(`/flashcards/${flashcard.id}`);

      expect(response.status).toBe(204);

      const getResponse = await request(app)
        .get(`/flashcards/${flashcard.id}`);

      expect(getResponse.status).toBe(404);
    });
  });

});
