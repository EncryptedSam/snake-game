// src/ecs/systems/CollisionSystem.ts
import generateRandomCoords from "../../utils/generateRandomCoords";
import isPointInList from "../../utils/isPointInList";
import { GameState } from "../components/GameState";
import { Position } from "../components/Position";
import { Board } from "../entities/Board";
import { Bricks } from "../entities/Bricks";
import { Food } from "../entities/Food";
import { Snake } from "../entities/Snake";

export const handleCollision = (
  snake: Snake,
  food: Food,
  board: Board,
  bricks: Bricks,
  growSnake: (snake: Snake) => void
): GameState | null => {
  const head = snake.segments[0];

  let snakeBody: Position[] = JSON.parse(JSON.stringify(snake.segments));
  snakeBody.shift();

  // Collision with own body
  if (isPointInList({ x: head.x, y: head.y }, snakeBody)) {
    return "gameOver";
  }

  // Collision with brick
  if (isPointInList({ x: head.x, y: head.y }, [...bricks])) {
    return "gameOver";
  }

  // Collision with food
  if (head.x === food.position.x && head.y === food.position.y) {
    growSnake(snake);

    let existingCoords: Position[] = [...bricks, ...snake.segments];
    food.position = generateRandomCoords(
      board.grid.cols - 1,
      board.grid.rows - 1,
      existingCoords
    );
    food.ateFood = food.ateFood + 1;
    return "ateFood";
  }

  return null;
};
