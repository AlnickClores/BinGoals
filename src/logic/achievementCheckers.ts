import { achievements } from "../data/achievements";

export type GoalGrid = string[][];
export type CompletionGrid = boolean[][];

export interface BingoCard {
  id: string;
  name: string;
  goals: GoalGrid;
  completedGoals: CompletionGrid;
  createdAt: string;
  updatedAt?: string;
}

export const checkAchievements = (cards: BingoCard[]) => {
  const unlocked: string[] = [];

  // Achievement 1: My First Bingoal
  if (cards.length >= 1) {
    unlocked.push(achievements[0].title);
  }

  // Achievement 2: Dream Catcher
  const hasFilledRow = cards.some((card: any) =>
    card.goals.some((row: string[]) => row.every((goal) => goal.trim() !== ""))
  );

  if (hasFilledRow) {
    unlocked.push(achievements[1].title);
  }

  // Achievement 3: Consistency is Key
  const completedCount = cards.reduce((sum, card) => {
    return (
      sum + card.completedGoals.flat().filter((done: boolean) => done).length
    );
  }, 0);
  if (completedCount >= 5) {
    unlocked.push(achievements[2].title);
  }

  // Achievement 4: Halfway There
  cards.forEach((card) => {
    const totalCells = card.completedGoals.flat().length;
    const doneCells = card.completedGoals.flat().filter((done) => done).length;
    if (doneCells / totalCells >= 0.5) {
      unlocked.push(achievements[3].title);
    }
  });

  // Achievement 5: Bingoal Champion
  cards.forEach((card) => {
    if (card.completedGoals.flat().every((done) => done)) {
      unlocked.push(achievements[4].title);
    }
  });

  // Achievement 6: Getting Organized
  const totalGoalsAdded = cards.reduce((sum, card) => {
    return sum + card.goals.flat().filter((goal) => goal.trim() !== "").length;
  }, 0);
  if (totalGoalsAdded >= 10) {
    unlocked.push(achievements[5].title);
  }

  return achievements.filter((a) => unlocked.includes(a.title));
};
