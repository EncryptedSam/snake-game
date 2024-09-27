import { Position, Direction } from './Components';

export interface Entity {
  id: string;
  position: Position;
  direction: Direction;
}
