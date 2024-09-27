import { Position } from "../components/Position";
import { Velocity } from "../components/Velocity";
import { Size } from "../components/Size";

export interface Ball {
  position: Position;
  velocity: Velocity;
  size: Size;
}

export const createBall = (): Ball => ({
  position: { x: 50, y: 300 },
  velocity: { dx: 2, dy: -2 },
  size: { width: 10, height: 10 },
});
