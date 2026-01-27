import {  Request,Response } from 'express';
import FlashcardRepository from '../repository/FlashcardRepository';

class FlashcardController{

  async index(request: Request, response: Response){
    const flashcard =  await FlashcardRepository.findAll();
    response.json(flashcard);

  }

  async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const flashcard = await FlashcardRepository.findById(id);

    if (!flashcard) return response.status(404).json({ error: 'Flashcard not found!' });

    return response.json(flashcard);
  }

  async store(request: Request, response: Response) {

    const { question, answer, deck_id } = request.body;

    const flashcard = await FlashcardRepository.create({
      question, answer, deck_id
    });

    return response.status(201).json(flashcard);


  }

  async update(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
    return response.status(400).json({ error: 'Invalid id' });
  }

    const { question, answer, deck_id } = request.body;

    if(!question) return response.status(400).json({error: 'question is required!.'});
    if(!answer) return response.status(400).json({error: 'answer is required!.'});
    if(!deck_id) return response.status(400).json({error: 'deck_id is required!.'});

    const flashcardExist = await FlashcardRepository.findById(id);

    if(!flashcardExist) return response.status(404).json({error: 'flashcard not found!.'});

    const flashcard = await FlashcardRepository.update(id, {question, answer, deck_id });

    return response.json(flashcard);

  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const flashcard = await FlashcardRepository.findById(id);

    if(!flashcard) return response.status(404).json({ error: 'Flashcard not found!' });

    await FlashcardRepository.delete(id);

    response.sendStatus(204);


  }

}


export default new FlashcardController();
