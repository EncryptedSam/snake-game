// src/ecs/entities/Snake.ts
import { Position } from "../components/Position";

export interface Snake {
  segments: Position[];
  direction: { dx: number; dy: number };
}

export const createSnake = (): Snake => ({
  segments: [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ], 
  direction: { dx: 1, dy: 0 }, 
});
