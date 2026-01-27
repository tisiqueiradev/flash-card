import request from 'supertest';
import app from '../src/app/app';
import FlashcardRepository from '../src/app/repository/FlashcardRepository';

describe('Flashcards routes', () => {

  it('GET /flashcards should return flashcards', async () => {
    const response = await request(app).get('/flashcards');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('GET /flashcards/:id should return flashcard by id', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const testId = flashcards[0].id;
    const response = await request(app).get(`/flashcards/${testId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(testId);
  });

  it('POST /flashcards should create and return a flashcard', async () => {
    const flashcardData = {
      question: "How old are you?",
      answer: "Quantos anos você tem?",
      deck_id: "deck-test-id"
    };

    const response = await request(app)
      .post('/flashcards')
      .send(flashcardData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.question).toBe(flashcardData.question);
    expect(response.body.answer).toBe(flashcardData.answer);
    expect(response.body.deck_id).toBe(flashcardData.deck_id);

    const flashcards = await FlashcardRepository.findAll();
    const createdFlashcard = flashcards.find(
      flashcard => flashcard.id === response.body.id
    );

    expect(createdFlashcard).toBeDefined();
  });

  it('PUT /flashcards/:id should update a flashcard', async () => {
    // arrange
    const flashcards = await FlashcardRepository.findAll();
    const flashcard = flashcards[0];

    const payload = {
      question: 'Updated question?',
      answer: 'Pergunta atualizada?',
      deck_id: flashcard.deck_id,
    };

    // act
    const response = await request(app)
      .put(`/flashcards/${flashcard.id}`)
      .send(payload);

    // assert
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(flashcard.id);
    expect(response.body.question).toBe(payload.question);
    expect(response.body.answer).toBe(payload.answer);
    expect(response.body.deck_id).toBe(payload.deck_id);
  });

  it('should return 400 if question is missing', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const flashcard = flashcards[0];

    const response = await request(app)
      .put(`/flashcards/${flashcard.id}`)
      .send({
        answer: 'test',
        deck_id: 'test',
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if answer is missing', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const flashcard = flashcards[0];

    const response = await request(app)
      .put(`/flashcards/${flashcard.id}`)
      .send({
        question: 'test',
        deck_id: 'test',
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if deck_id is missing', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const flashcard = flashcards[0];

    const response = await request(app)
      .put(`/flashcards/${flashcard.id}`)
      .send({
        question: 'test',
        answer: 'test',
      });

    expect(response.status).toBe(400);
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
    expect(response.body.error).toBe('flashcard not found!.');
  });

  it('DELETE /flashcards/:id should return status code 204', async () => {
    const flashcards = await FlashcardRepository.findAll();
    const testId = flashcards[0].id;
    const response = await request(app).delete(`/flashcards/${testId}`);

    expect(response.status).toBe(204);

    const remaining = await FlashcardRepository.findAll();
    expect(remaining.find(f => f.id === testId)).toBeUndefined();

  });

});
