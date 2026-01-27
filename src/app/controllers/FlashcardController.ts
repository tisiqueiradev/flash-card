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

  store(){

  }

  update(){}

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const flashcard = await FlashcardRepository.findById(id);

    if(!flashcard) return response.status(404).json({ error: 'Flashcard not found!' });

    await FlashcardRepository.delete(id);

    response.sendStatus(204);


  }

}


export default new FlashcardController();
