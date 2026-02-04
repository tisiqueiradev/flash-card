
export class InvalidReviewQualityError extends Error {
  constructor() {
    super('quality must be between 0 and 5');
  }
}
