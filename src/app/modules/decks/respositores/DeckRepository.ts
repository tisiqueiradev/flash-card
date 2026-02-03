import { Deck } from '../entities/deck';

export interface CreateDeckDTO {
  name: string;
  theme: string;
  isPublic: string;
  userId:string;
}

export interface DeckRepository{
  findAll(): Promise<Deck[]>;
  findById(id: string):Promise<Deck | null>;
  create(data: CreateDeckDTO) : Promise<Deck>;
  update( id: string, data: CreateDeckDTO): Promise<Deck | null>;
  delete(id: string): Promise<void>
}
