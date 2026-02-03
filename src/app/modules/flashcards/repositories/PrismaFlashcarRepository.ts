import { prisma } from '../../../../shared/database/prisma';
import { Flashcard } from '../entities/Flashcard';
import { FlashcardRepository } from './FlashcardRepository';
import { CreateFlashcardDTO } from '../services/CreateFlashcardDTO';
import { UpdateFlashcardDTO } from '../services/UpdateFlashcardDTO';

export class PrismaFlashcardRepository implements FlashcardRepository {

  async findAll(): Promise<Flashcard[]> {
    const flashcards = await prisma.flashcard.findMany();

    return flashcards.map((data) => ({
      id: data.id,
      deck_id: data.deckId,
      question: data.question,
      answer: data.answer,
      order: data.order,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt

    }))
  }

  async findById(id: string): Promise<Flashcard | null> {
   const flashcard = await prisma.flashcard.findUnique({
    where: { id } })

    if(!flashcard) return null;

    return {

      id: flashcard.id,
      deck_id: flashcard.deckId,
      question: flashcard.question,
      answer: flashcard.answer,
      order: flashcard.order,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt
    }


  }

  async create(data: CreateFlashcardDTO) : Promise<Flashcard> {
    const flashcard = await prisma.flashcard.create({
      data: {
        question: data.question,
        answer: data.answer,
        deckId: data.deck_id,
        order: 1
      }
    });

   return {

      id: flashcard.id,
      deck_id: flashcard.deckId,
      question: flashcard.question,
      answer: flashcard.answer,
      order: flashcard.order,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt
    }

  }

  async update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard | null> {
    const flashcard = await prisma.flashcard.update({
      where: { id },
      data:{
        question: data.question,
        answer: data.answer,

      }
    }).catch(() => null);

    if(!flashcard) return null;

    return {

      id: flashcard.id,
      deck_id: flashcard.deckId,
      question: flashcard.question,
      answer: flashcard.answer,
      order: flashcard.order,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt
    }
  }

  async  delete(id: string): Promise<boolean> {
    try{
      await prisma.flashcard.delete({ where: { id }});
      return true;
    } catch {
      return false;
    }
  }
}
