import { Request, Response } from 'express';

class FlashcardController{
  index(request: Request, response: Response){
    response.send('Send from Flashcard Controller')
  }

  show(){

  }

  store(){

  }

  update(){}

  delete(){}

}


export default new FlashcardController();
