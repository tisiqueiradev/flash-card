import request from 'supertest';
import app from '../src/app/app';
import FlashcardRepository from '../src/app/repository/FlashcardRepository';

describe('Flashcards routes', () => {
  it('GET /flashcards should return flashcards', async () => {
    const response = await request(app).get('/flashcards');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('Flashcards routes', () => {
  it('GET /flashcards/:id should return flashcard by id', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const testId = flashcards[0].id;
    const response = await request(app).get(`/flashcards/${testId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(testId);
  });
});

describe('Flashcards routes', () => {
  it('DELETE /flashcards/:id should return status code 204', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const testId = flashcards[0].id;
    const response = await request(app).delete(`/flashcards/${testId}`);

    expect(response.status).toBe(204);

    const remaining = await FlashcardRepository.findAll();
    expect(remaining.find(f => f.id === testId)).toBeUndefined();

  });
});

