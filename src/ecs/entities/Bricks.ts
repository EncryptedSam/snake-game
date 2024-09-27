// src/ecs/entities/Paddle.ts
import { Position } from "../components/Position";
export type Bricks = Position[];

export const createBricks = (): Bricks => {
  return [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },

    { x: 17, y: 2 },
    { x: 17, y: 3 },
    { x: 17, y: 4 },
    { x: 16, y: 2 },
    { x: 15, y: 2 },

    { x: 2, y: 17 },
    { x: 3, y: 17 },
    { x: 4, y: 17 },
    { x: 2, y: 16 },
    { x: 2, y: 15 },

    { x: 17, y: 17 },
    { x: 17, y: 16 },
    { x: 17, y: 15 },
    { x: 16, y: 17 },
    { x: 15, y: 17 },

    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 9 },
    { x: 9, y: 9 },
  ];
};
