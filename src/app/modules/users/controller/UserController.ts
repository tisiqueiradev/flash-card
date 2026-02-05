/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);


class UserController {

  async index(req: Request, res: Response){
    const users = await userService.findAll();
    return res.status(200).json(users);
  }

  async show(req: Request, res: Response){
    const { id } = req.params as { id: string}

    try {
      const user = await userService.findById(id);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message})
    }
  }

  async showEmail(req: Request, res: Response) {
    const { email } = req.body

    try {
      const user = await userService.findByEmail(email);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message})
    }
  }

  async store(req: Request, res: Response) {

    try {
      const user = await userService.create({
        id:req.body.id,
        name: req.body.name,
        email: req.body.email,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      });

      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message})
    }
  }

  async update(req: Request, res: Response){
    const { id } = req.params as {id: string};

    try {
      const user = await userService.update(id, {
        name: req.body.name,
        email: req.body.email,

      });
      return res.status(201).json(user);

    }catch ( err: any){
      return res.status(404).json({error: err.message});
    }
  }

  async delete(req: Request, res: Response){
    const { id } = req.params as { id: string};

    try{
      await userService.delete(id);
      return res.sendStatus(204);
    }catch (err: any) {
      return res.status(404).json({ error: err.message});
    }
  }
}
export default new UserController();
