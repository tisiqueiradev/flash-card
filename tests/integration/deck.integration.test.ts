import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/shared/database/prisma';

beforeEach(async () => {
  await prisma.flashcard.deleteMany();
  await prisma.deck.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

async function createDeck(overrides: Partial<{ name: string; theme: string; isPublic: boolean; userId: string; }> = {}) {
  const data = {
    name: 'Test Deck',
    theme: 'Tecnologia',
    isPublic: true,
    userId: 'fake-user-1',
    ...overrides,
  };

  const response = await request(app).post('/decks').send(data);
  return response.body;
}

describe('Deck Integration Tests', () => {
  it('should create a new deck', async () => {
    const deck = await createDeck();

    expect(deck).toHaveProperty('id');
    expect(deck.name).toBe('Test Deck');
    expect(deck.theme).toBe('Tecnologia');
    expect(deck.userId).toBe('fake-user-1');
  });

  it('should list all decks', async () => {
    await createDeck({ name: 'Deck A', theme: 'Saúde' });
    await createDeck({ name: 'Deck B', theme: 'Tecnologia' });

    const response = await request(app).get('/decks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('id');
  });
});
