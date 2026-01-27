
import { v4 as uuidv4 } from 'uuid';
import { Flashcard } from '../models/Flashcard';


let flashcards: Flashcard[] = [
  {
    question : "What's Your name?",
    answer: "Qual é o seu nome?",
    id: uuidv4(),
    deck_id: uuidv4()

  },
  {
    question : "Where's You from?",
    answer: "De onde você é?",
    id: uuidv4(),
    deck_id: uuidv4()

  }

];

class FlashcardRepository{

  findAll(): Promise<Flashcard[]> {
    return new Promise((resolve ) => resolve(flashcards));
  }

  async findById(id: string | string[]) {
    return flashcards.find(flashcard => flashcard.id === id);
  }


  async delete(id:string | string []) {

    return new Promise<void>((resolve) => {

      flashcards = flashcards.filter((flashcard) => flashcard.id !== id);
      resolve();
    })

  }
}

export default new FlashcardRepository();
