import { Board } from "./ecs/entities/Board";
import { Bricks } from "./ecs/entities/Bricks";
import { Food } from "./ecs/entities/Food";
import { Snake } from "./ecs/entities/Snake";

class GameBoard {
  ctx: CanvasRenderingContext2D | null;
  size: number;
  canvasWidth: number;
  canvasHeight: number;
  grid: { rows: number; cols: number };

  constructor(canvas: HTMLCanvasElement | null, board: Board) {
    let { grid, size } = board;
    canvas!.width = grid.cols * size;
    canvas!.height = grid.rows * size;
    this.ctx = canvas!.getContext("2d");
    this.size = size;
    this.canvasWidth = canvas!.width;
    this.canvasHeight = canvas!.height;
    this.grid = grid;
  }

  private square = (x: number, y: number, color: string = "#97a58c") => {
    const gap = 3;
    this.ctx!.strokeStyle = color;
    this.ctx!.fillStyle = color;
    this.ctx!.strokeRect(
      x * this.size + gap,
      y * this.size + gap,
      this.size - gap * 2,
      this.size - gap * 2
    );
    this.ctx!.fillRect(
      x * this.size + gap * 2.5,
      y * this.size + gap * 2.5,
      this.size - gap * 5,
      this.size - gap * 5
    );
  };

  private patternSquare = (x: number, y: number) => {
    this.square(x, y);
  };

  private snakeSegments = (x: number, y: number) => {
    this.square(x, y, "#151212");
  };

  private brick = (x: number, y: number, color: string = "#151212") => {
    const gap = 3;
    this.ctx!.strokeStyle = color;
    this.ctx!.fillStyle = color;
    this.ctx!.strokeRect(
      x * this.size + gap,
      y * this.size + gap,
      this.size - gap * 2,
      this.size - gap * 2
    );
    this.ctx!.fillRect(
      x * this.size + gap * 1.6,
      y * this.size + gap * 1.6,
      this.size - gap * 3.2,
      this.size - gap * 3.2
    );
  };


  drawBgPattern = () => {
    let { cols, rows } = this.grid;

    this.ctx!.fillStyle = "#a3b396";
    this.ctx!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        this.patternSquare(col, row);
      }
    }
  };

  drawSnake = (snake: Snake) => {
    snake.segments.forEach(({ x, y }) => {
      this.snakeSegments(x, y);
    });
  };

  drawFood = (food: Food) => {
    this.square(food.position.x, food.position.y, "#b20000");
  };

  drawBricks = (bricks: Bricks) => {
    bricks.forEach(({ x, y }) => {
      this.brick(x, y);
    });
  };

  clearBoard = () => {
    this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  };
}
export default GameBoard;
