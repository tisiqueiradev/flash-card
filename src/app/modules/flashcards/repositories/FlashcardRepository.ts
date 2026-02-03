import { Flashcard } from '../entities/Flashcard';
import { CreateFlashcardDTO } from '../services/CreateFlashcardDTO';
import { UpdateFlashcardDTO } from '../services/UpdateFlashcardDTO';

export interface FlashcardRepository {
  findAll(): Promise<Flashcard[]>;
  findById(id: string): Promise<Flashcard | null>;
  create(data: CreateFlashcardDTO): Promise<Flashcard>;
  update(
    id: string,
    data: UpdateFlashcardDTO
  ): Promise<Flashcard | null>;
  delete(id: string): Promise<boolean>;
}
