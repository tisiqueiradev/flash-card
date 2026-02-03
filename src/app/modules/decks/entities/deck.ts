export interface Deck {
  id: string;
  name: string;
  theme: string | null;
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt:Date;
}
