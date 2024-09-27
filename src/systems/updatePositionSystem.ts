import { Entity } from '../types/Entity';

export const updatePositionSystem = (entity: Entity, boardSize: number) => {
  let { x, y } = entity.position;
  
  switch (entity.direction) {
    case 'UP':
      y = (y - 1 + boardSize) % boardSize;
      break;
    case 'DOWN':
      y = (y + 1) % boardSize;
      break;
    case 'LEFT':
      x = (x - 1 + boardSize) % boardSize;
      break;
    case 'RIGHT':
      x = (x + 1) % boardSize;
      break;
  }
  
  entity.position = { x, y };
  return entity;
};
