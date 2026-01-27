import request from 'supertest';
import app from '../src/app/app';

describe('Flashcards routes', () => {
  it('GET /flahscards should return controller message', async () => {
    const response = await request(app).get('/flahscards');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Send from Flashcard Controller');
  });
});
