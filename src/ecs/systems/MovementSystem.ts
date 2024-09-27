// src/ecs/systems/MovementSystem.ts
import { Board } from "../entities/Board";
import { Snake } from "../entities/Snake";

export const updateMovement = (snake: Snake, board: Board) => {
  let { cols, rows } = board.grid;

  let x = snake.segments[0].x + snake.direction.dx;
  let y = snake.segments[0].y + snake.direction.dy;

  x = x % cols;
  y = y % rows;

  x = x < 0 ? cols - 1 : x;
  y = y < 0 ? rows - 1 : y;

  const newHead = { x, y };
  snake.segments = [newHead, ...snake.segments.slice(0, -1)];
};
