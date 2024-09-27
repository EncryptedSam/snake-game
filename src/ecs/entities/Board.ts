import { Grid } from "../components/Grid";

export interface Board {
  grid: Grid;
  size: number;
}

export const createBoard = (): Board => ({
  grid: { cols: 20, rows: 20 },
  size: 25,
});
