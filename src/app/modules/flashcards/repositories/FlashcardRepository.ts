import { Flashcard } from '../entities/Flashcard';

export interface CreateFlashcardDTO {
  question: string;
  answer: string;
  deck_id: string;
}

export interface FlashcardRepository {
  findAll(): Promise<Flashcard[]>;
  findById(id: string): Promise<Flashcard | null>;
  create(data: CreateFlashcardDTO): Promise<Flashcard>;
  update(
    id: string,
    data: CreateFlashcardDTO
  ): Promise<Flashcard | null>;
  delete(id: string): Promise<void>;
}
