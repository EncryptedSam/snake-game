// src/Game.tsx
import React, { createRef, useEffect, useRef, useState } from 'react';
import { updateMovement } from './ecs/systems/MovementSystem';
import { handleCollision } from './ecs/systems/CollisionSystem';
import { createSnake } from './ecs/entities/Snake';
import { createFood } from './ecs/entities/Food';
import { createBricks } from './ecs/entities/Bricks';
import { growSnake } from './ecs/systems/FoodSystem';
import { createBoard } from './ecs/entities/Board';
import GameBoard from './GameBoard';
import GrPowerReset from './components/icons/GrPowerReset';
import { GameState } from './ecs/components/GameState';
import { PopUpCard } from './components/PopUpCard';


const GameV10: React.FC = () => {
    const [render, setRender] = useState<boolean>(false);
    const gameStateRef = useRef<GameState>('playing');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const snakeRef = useRef(createSnake());
    const foodRef = useRef(createFood());
    const bricksRef = useRef(createBricks());
    const boardRef = useRef(createBoard());

    const handleGameState = (arg: GameState) => {
        gameStateRef.current = arg;
        setRender((bol) => !bol);
    }

    const handleResetGame = () => {
        snakeRef.current = createSnake();
        foodRef.current = createFood();
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        let snake = snakeRef.current;
        let food = foodRef.current;
        let bricks = bricksRef.current;
        let board = boardRef.current;

        let { clearBoard, drawSnake, drawFood, drawBricks, drawBgPattern } = new GameBoard(canvas, board);
        clearBoard();
        drawBgPattern();

        const gameLoop = () => {
            let gameState = gameStateRef.current;
            clearBoard();
            drawBgPattern();

            // Movement system
            !['paused', 'gameOver'].includes(gameState) && updateMovement(snake, board);
            const collisionResult = handleCollision(snake, food, board, bricks, growSnake);

            drawSnake(snake);
            drawFood(food);
            drawBricks(bricks);

            if (collisionResult == 'gameOver') {
                handleGameState('gameOver');
            }

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
                case ' ':
                    if (gameStateRef.current == 'playing') {
                        handleGameState('paused');
                    } else if (gameStateRef.current == 'paused') {
                        handleGameState('playing');
                    }
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

            {
                gameStateRef.current === 'paused' &&
                <PopUpCard type='paused' onClick={() => { handleGameState('playing') }} />
            }
            {
                gameStateRef.current === 'gameOver' &&
                <PopUpCard type='gameOver' onClick={() => { handleResetGame(); handleGameState('playing') }} />
            }
        </div>
    )
};

export default GameV10;
