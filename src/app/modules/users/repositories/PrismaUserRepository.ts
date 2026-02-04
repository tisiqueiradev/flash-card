import { prisma } from "@/shared/database/prisma";
import { User } from "../entities/user";
import { UserRepository } from "./UserRepository";
import { CreateUserDTO } from "../services/CreateUserDTO";
import { UpdateUserDTO } from "../services/UpdateUserDTO";


export class PrismaUserRepository implements UserRepository {


  async findAll(): Promise<User[]> {
   const users = await prisma.user.findMany();

   return users.map((data) =>({
      id:data.id,
      name:data.name!,
      email:data.email,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt
   }));
 }

  async findById(id: string): Promise<User | null> {
   const user = await prisma.user.findUnique({ where: { id }});
   if(!user) return null;

   return{
    id:user.id,
    name:user.name!,
    email:user.email,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt
   }
 }

 async findByEmail(email: string): Promise<User | null> {
   const user = await prisma.user.findUnique({ where: { email }});
   if(!user) return null;

  return {
    id:user.id,
    name:user.name!,
    email:user.email,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt
   }
 }



 async create(data: User): Promise<CreateUserDTO> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,

    }
    });

    return {
      id:user.id,
      name:user.name!,
      email:user.email,
      createdAt:user.createdAt,
      updatedAt:user.updatedAt
    };

  }


  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name:data.name,
        email:data.email
      }
    }).catch(()=> null);

    if(!user) return null;

    return {
      id:user.id,
      name:user.name!,
      email:user.email,
      createdAt:user.createdAt,
      updatedAt:user.updatedAt
    };
  }


  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id }});
      return true;
    } catch {
      return false;
    }
  }

}
