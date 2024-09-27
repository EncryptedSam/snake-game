import { Position } from "../types/Components";

export default function generateRandomCoords( maxX: number, maxY: number, existingCoords: Position[] ): Position {
  const getRandomInt = (max: number): number => Math.floor(Math.random() * (max + 1));

  let newCoords: Position;
  let isDuplicate: boolean;

  do {
    const x = getRandomInt(maxX);
    const y = getRandomInt(maxY);
    newCoords = { x, y };

    isDuplicate = existingCoords.some(
      (coord) => coord.x === newCoords.x && coord.y === newCoords.y
    );
  } while (isDuplicate);

  return newCoords;
}
