import { Deck } from '../entities/deck';
import { CreateDeckDTO } from '../services/CreateDeckDTO';
import { UpdateDeckDTO} from '../services/UpdateDeckDTO';


export interface DeckRepository{
  findAll(): Promise<Deck[]>;
  findById(id: string):Promise<Deck | null>;
  create(data: CreateDeckDTO) : Promise<Deck>;
  update( id: string, data: UpdateDeckDTO): Promise<Deck | null>;
  delete(id: string): Promise<boolean>
}
