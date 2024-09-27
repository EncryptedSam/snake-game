import { Position } from "../types/Components";

export default function isPointInList(
  point: Position,
  pointsList: Position[]
): boolean {
  return pointsList.some((p) => p.x === point.x && p.y === point.y);
}
