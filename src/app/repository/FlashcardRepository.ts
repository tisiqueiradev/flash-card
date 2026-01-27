
import { v4 as uuidv4 } from 'uuid';
import { Flashcard } from '../models/Flashcard';

interface CreateFlashcardDTO {
  question: string;
  answer: string;
  deck_id: string;
}


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


  async create({
    question, answer, deck_id
  }: CreateFlashcardDTO): Promise<Flashcard> {

      const newFlashcard: Flashcard = {
        id: uuidv4(),
        question,
        answer,
        deck_id,

      };
      flashcards.push(newFlashcard);
      return newFlashcard


  }

  async update(id: string, {
    question, answer, deck_id
  }: CreateFlashcardDTO): Promise<Flashcard> {
    const updateFlashcard: Flashcard = {
        id,
        question,
        answer,
        deck_id,
    }

    flashcards = flashcards.map((flashcard) => (
      flashcard.id === id ? updateFlashcard : flashcard
    ))

    return updateFlashcard
  }
}

export default new FlashcardRepository();
