/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // limpa tudo (ordem importa)
  await prisma.flashcardReviewHistory.deleteMany()
  await prisma.flashcardReview.deleteMany()
  await prisma.flashcard.deleteMany()
  await prisma.deck.deleteMany()
  await prisma.user.deleteMany()

  // usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'Tiago',
      email: 'tiago@flashcards.dev',
      password: await bcrypt.hash('123456', 10),
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria',
      email: 'maria@flashcards.dev',
      password: await bcrypt.hash('123456', 10),
    },
  })

  // deck público
  const publicDeck = await prisma.deck.create({
    data: {
      title: 'Inglês Básico',
      description: 'Vocabulário essencial',
      isPublic: true,
      userId: user1.id,
    },
  })

  // deck privado
  const privateDeck = await prisma.deck.create({
    data: {
      title: 'Estudos Privados',
      description: 'Somente para mim',
      isPublic: false,
      userId: user1.id,
    },
  })

  // flashcards
  const flashcard1 = await prisma.flashcard.create({
    data: {
      deckId: publicDeck.id,
      question: 'Hello',
      answer: 'Olá',
      order: 1,
    },
  })

  const flashcard2 = await prisma.flashcard.create({
    data: {
      deckId: publicDeck.id,
      question: 'Goodbye',
      answer: 'Adeus',
      order: 2,
    },
  })

  // review
  const review = await prisma.flashcardReview.create({
    data: {
      userId: user2.id,
      flashcardId: flashcard1.id,
      repetitions: 1,
      interval: 1,
      easeFactor: 2.5,
      nextReview: new Date(),
    },
  })

  // history
  await prisma.flashcardReviewHistory.create({
    data: {
      userId: user2.id,
      flashcardId: flashcard1.id,
      quality: 5,
      before: { repetitions: 0 },
      after: { repetitions: 1 },
      reviewedAt: new Date(),
    },
  })
}

main()
  .then(() => {
    console.log('🌱 Seed executado com sucesso')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
