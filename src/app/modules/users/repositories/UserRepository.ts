import { User } from "../entities/user";
import { CreateUserDTO } from "../services/CreateUserDTO";
import { UpdateUserDTO } from "../services/UpdateUserDTO";

export interface UserRepository {
  findAll():Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: User): Promise<CreateUserDTO>;
  update( id: string, data: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>
}
