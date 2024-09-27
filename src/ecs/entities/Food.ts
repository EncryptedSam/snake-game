import { Position } from "../components/Position";

export interface Food {
  position: Position;
  ateFood: number;
}

export const createFood = (): Food => ({
  position: { x: 10, y: 2 },
  ateFood: 0,
});
