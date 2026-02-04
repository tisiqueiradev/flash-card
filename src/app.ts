import express from "express";
import { router as flashcardRouter}  from '../src/app/modules/flashcards/routes/routes';
import { router as deckRouter } from '../src/app/modules/decks/routes/routes';
import { router as review } from '../src/app/modules/reviews/routes/routes';
import { router as users } from '../src/app/modules/users/routes/routes';

const app = express();

app.use(express.json());

app.use('/flashcards', flashcardRouter);
app.use('/decks', deckRouter);
app.use('/reviews', review);
app.use('/users', users)

export default app;
