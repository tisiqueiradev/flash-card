import { prisma } from '../../src/shared/database/prisma';

beforeEach(async () => {
  // Limpa tabelas na ordem correta por dependência
  await prisma.flashcard.deleteMany();
  await prisma.deck.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
