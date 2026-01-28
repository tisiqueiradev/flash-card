export interface SM2Input {
  quality: number;
  repetitions: number;
  interval: number;
  easeFactor: number;
}

export interface SM2Output {
  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReview: Date;
}

export function applySM2(
  input: SM2Input,
  now: Date = new Date()
): SM2Output {
  const { quality } = input;
let { repetitions, interval, easeFactor } = input;


  // Qualidade ruim → reset
  if (quality < 3) {
    return {
      repetitions: 0,
      interval: 1,
      easeFactor,
      nextReview: addDays(now, 1)
    };
  }

  // Atualiza ease factor
  easeFactor =
    easeFactor +
    (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Atualiza repetições e intervalo
  repetitions += 1;

  if (repetitions === 1) {
    interval = 1;
  } else if (repetitions === 2) {
    interval = 6;
  } else {
    interval = Math.round(interval * easeFactor);
  }

  return {
    repetitions,
    interval,
    easeFactor,
    nextReview: addDays(now, interval)
  };
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
