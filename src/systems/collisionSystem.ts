import { Entity } from '../types/Entity';

export const collisionSystem = (snake: Entity[], head: Entity) => {
  return snake.some(segment => segment.position.x === head.position.x && segment.position.y === head.position.y);
};
