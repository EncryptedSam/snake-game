import { Snake } from "../entities/Snake";
import { Food } from "../entities/Food";
import { Grid } from "../components/Grid";
import { Bricks } from "../entities/Bricks";
import generateRandomCoords from "../../utils/generateRandomCoords";

export const respawnFood = (
  snake: Snake,
  food: Food,
  grid: Grid,
  bricks: Bricks
) => {

  generateRandomCoords(grid.cols - 1, grid.rows - 1, []);
  

};

export const growSnake = (snake: Snake) => {
  const lastSegment = snake.segments[snake.segments.length - 1];
  snake.segments.push({ ...lastSegment });
};
