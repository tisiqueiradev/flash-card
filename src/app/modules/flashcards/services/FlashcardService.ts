import { DeckRepository } from "../../decks/respositories/DeckRepository";
import { Flashcard } from "../entities/Flashcard";
import { FlashcardRepository } from "../repositories/FlashcardRepository";
import { CreateFlashcardDTO } from "./CreateFlashcardDTO";
import { UpdateFlashcardDTO } from "./UpdateFlashcardDTO";

export class FlashcardService{

  constructor(
    private readonly flashcardRepository: FlashcardRepository,
    private readonly deckRepository: DeckRepository
  ){}

  async findAll(): Promise<Flashcard []> {
    return this.flashcardRepository.findAll();
  }

  async findById(id: string):Promise<Flashcard>{
    const flashcard = await this.flashcardRepository.findById(id);

    if(!flashcard) {
      throw new Error("Flashcard not found");
    }
    return flashcard;

  }

  async create(data: CreateFlashcardDTO): Promise<Flashcard> {
  if (!data.deck_id) {
    throw new Error('Deck id is required');
  }

  const deckExists = await this.deckRepository.findById(data.deck_id);

  if (!deckExists) {
    throw new Error('Deck not found');
  }

  return this.flashcardRepository.create(data);
}

  async update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard> {

     if(!data.deck_id) throw new Error('Deck id is required');

     if(!id) throw new Error('ID is required');

     const deckExists = await this.deckRepository.findById(data.deck_id);

     if(!deckExists) throw new Error('Deck not found');

     const flashcardExists = await this.flashcardRepository.findById(id);

     if(!flashcardExists) throw new Error('Flashcard not found');

     const updateFlashcard = await this.flashcardRepository.update(id,data);

     return updateFlashcard!;

  }

  async delete(id: string): Promise<void>{
    const deck = await this.flashcardRepository.findById(id);


    if(!deck) throw new Error('Flashcard not found');

    await this.flashcardRepository.delete(id);
  }
}
