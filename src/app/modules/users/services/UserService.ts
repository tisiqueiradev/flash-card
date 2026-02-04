
import { User } from '../entities/user';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO } from './CreateUserDTO';
import { UpdateUserDTO } from './UpdateUserDTO';

export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id:string): Promise<User> {
   const user = await this.userRepository.findById(id);
   if(!user) throw new Error('User not found.');

   return user;
  }

  async findByEmail(email: string): Promise<User>{
    if(!email) throw new Error('E-mail is required');

    const user = await this.userRepository.findByEmail(email);

    if(!user) throw new Error('E-mail not found.');

    return user;

  }

  async create(data: User): Promise<CreateUserDTO> {
    if(!data.name || !data.email) throw new Error('Name and email is required.');

    return this.userRepository.create(data);
  }


  async update(id:string, data: UpdateUserDTO): Promise<UpdateUserDTO> {
    if(!id) throw new Error('User not found.');

    if(!data.name || !data.email) throw new Error('Name and email is required');

    const updateUser = await this.userRepository.update(id, data);

    return updateUser!;
  }

  async delete(id:string):Promise<void> {
    const user = await this.userRepository.findById(id);

    if(!user) throw new Error('User not found');

    await this.userRepository.delete(id);
  }
}
