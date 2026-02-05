/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';

/* =====================================================
   MOCK HOISTED DOS MÉTODOS DO SERVICE
===================================================== */
const mockUserServiceMethods = vi.hoisted(() => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}));

/* =====================================================
   MOCK DO UserService (COMO CLASSE)
===================================================== */
vi.mock('../services/UserService', () => {
  class UserServiceMock {
    constructor() {
      Object.assign(this, mockUserServiceMethods);
    }
  }

  return {
    UserService: UserServiceMock,
  };
});

/* =====================================================
   MOCK DO REPOSITÓRIO (CLASSE CONSTRUTÍVEL)
===================================================== */
vi.mock('../repositories/PrismaUserRepository', () => {
  class PrismaUserRepositoryMock {}
  return {
    PrismaUserRepository: PrismaUserRepositoryMock,
  };
});

/* =====================================================
   IMPORT DO CONTROLLER (DEPOIS DOS MOCKS)
===================================================== */
import UserController from './UserController';

describe('UserController', () => {
  let mockRequest: any;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      params: {},
      body: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(), //
    };
  });

  /* =========================
     INDEX
  ========================== */
  it('deve retornar todos os usuários', async () => {
    const users = [{ id: '1', name: 'Tiago', email: 't@t.com' }];

    mockUserServiceMethods.findAll.mockResolvedValue(users);

    await UserController.index(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockUserServiceMethods.findAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(users);
  });

  /* =========================
     SHOW
  ========================== */
  it('deve retornar usuário por id', async () => {
    const user = { id: '1', name: 'Tiago', email: 't@t.com' };
    mockRequest.params = { id: '1' };

    mockUserServiceMethods.findById.mockResolvedValue(user);

    await UserController.show(
      mockRequest as any,
      mockResponse as Response
    );

    expect(mockUserServiceMethods.findById).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  it('deve retornar 404 se usuário não existir', async () => {
    mockRequest.params = { id: '999' };

    mockUserServiceMethods.findById.mockRejectedValue(
      new Error('User not found')
    );

    await UserController.show(
      mockRequest as any,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'User not found',
    });
  });

  /* =========================
     SHOW EMAIL
  ========================== */
  it('deve retornar usuário por email', async () => {
    const user = { id: '1', name: 'Tiago', email: 't@t.com' };
    mockRequest.body = { email: 't@t.com' };

    mockUserServiceMethods.findByEmail.mockResolvedValue(user);

    await UserController.showEmail(
      mockRequest as any,
      mockResponse as Response
    );

    expect(mockUserServiceMethods.findByEmail).toHaveBeenCalledWith('t@t.com');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  it('deve retornar 404 se email não existir', async () => {
    mockRequest.body = { email: 'x@x.com' };

    mockUserServiceMethods.findByEmail.mockRejectedValue(
      new Error('User not found')
    );

    await UserController.showEmail(
      mockRequest as any,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'User not found',
    });
  });

  /* =========================
     STORE
  ========================== */
  it('deve criar um usuário', async () => {
    const user = {
      id: '1',
      name: 'Tiago',
      email: 't@t.com',
    };

    mockRequest.body = user;

    mockUserServiceMethods.create.mockResolvedValue(user);

    await UserController.store(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockUserServiceMethods.create).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  it('deve retornar 400 se erro ao criar usuário', async () => {
    mockUserServiceMethods.create.mockRejectedValue(
      new Error('Invalid data')
    );

    await UserController.store(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Invalid data',
    });
  });

  /* =========================
     UPDATE
  ========================== */
  it('deve atualizar um usuário', async () => {
    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'Novo Nome', email: 'novo@t.com' };

    const updatedUser = { id: '1', ...mockRequest.body };

    mockUserServiceMethods.update.mockResolvedValue(updatedUser);

    await UserController.update(
      mockRequest as any,
      mockResponse as Response
    );

    expect(mockUserServiceMethods.update).toHaveBeenCalledWith(
      '1',
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
  });

  /* =========================
     DELETE
  ========================== */
 it('deve deletar um usuário', async () => {
  mockRequest.params = { id: '1' };

  mockUserServiceMethods.delete.mockResolvedValue(undefined);

  await UserController.delete(
    mockRequest as any,
    mockResponse as Response
  );

  expect(mockUserServiceMethods.delete).toHaveBeenCalledWith('1');
  expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
});
});
