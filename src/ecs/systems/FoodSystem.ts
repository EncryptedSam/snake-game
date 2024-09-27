import { Snake } from "../entities/Snake";
import { Grid } from "../components/Grid";
import generateRandomCoords from "../../utils/generateRandomCoords";

export const respawnFood = (grid: Grid) => {
  generateRandomCoords(grid.cols - 1, grid.rows - 1, []);
};

export const growSnake = (snake: Snake) => {
  const lastSegment = snake.segments[snake.segments.length - 1];
  snake.segments.push({ ...lastSegment });
};
