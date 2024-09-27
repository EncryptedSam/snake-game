// src/Game.tsx
import React, { useEffect, useRef } from 'react';
import { updateMovement } from './ecs/systems/MovementSystem';
import { handleCollision } from './ecs/systems/CollisionSystem';
import { createSnake } from './ecs/entities/Snake';
import { createFood } from './ecs/entities/Food';
import { createBricks } from './ecs/entities/Bricks';
import { growSnake } from './ecs/systems/FoodSystem';
import { createBoard } from './ecs/entities/Board';
import GameBoard from './GameBoard';
import GrPowerReset from './components/icons/GrPowerReset';

const GameV8: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        let snake = createSnake();
        let food = createFood();
        let bricks = createBricks();
        let board = createBoard();

        let { clearBoard, drawSnake, drawFood, drawBricks, drawBgPattern } = new GameBoard(canvas, board);
        clearBoard();
        drawBgPattern();

        const resetGame = () => {
            snake = createSnake();
            food = createFood();
        }

        const gameLoop = () => {
            clearBoard();
            drawBgPattern();

            // Movement system
            updateMovement(snake, board);
            const collisionResult = handleCollision(snake, food, board, bricks, growSnake);
            if (collisionResult) resetGame();

            drawSnake(snake);
            drawFood(food);
            drawBricks(bricks);
        };

        let intervalId = setInterval(gameLoop, 500);

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (snake.direction.dy === 0) snake.direction = { dx: 0, dy: -1 };
                    break;
                case 'ArrowDown':
                    if (snake.direction.dy === 0) snake.direction = { dx: 0, dy: 1 };
                    break;
                case 'ArrowLeft':
                    if (snake.direction.dx === 0) snake.direction = { dx: -1, dy: 0 };
                    break;
                case 'ArrowRight':
                    if (snake.direction.dx === 0) snake.direction = { dx: 1, dy: 0 };
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='flex items-center justify-center relative p-2' style={{ outline: '1px solid white' }}>
            <canvas ref={canvasRef} />
            <div className='flex flex-col border border-[#151212]  absolute  justify-center items-center bg-[#A3B396] w-[300px] h-[150px]'>
                <div className='absolute w-[calc(100%-8px)] h-[calc(100%-8px)] bg-[#151212]' />
                {/* <span className='z-0 text-lg'>😩</span> */}
                {/* <span className='z-0 text-lg text-[#A3B396]'>(¬‿¬)</span> */}
                {/* <span className='z-0 text-lg text-[#A3B396]'>(╥﹏╥)</span> */}
                <span className='z-0 text-lg text-[#A3B396]'>(⌐■_■)</span>
                <h2 className='text-[22px] z-0 text-[#A3B396] font-bold mb-1'>Game Over</h2>
                <button className='inline-flex items-center space-x-1 text-[12px] font-medium py-1 px-2  z-0 bg-[#A3B396] text-[#151212]'>
                    <GrPowerReset /><span>Try Again</span>
                </button>
            </div>
        </div>
    )
};

export default GameV8;
