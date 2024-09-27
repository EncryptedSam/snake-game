// src/Game.tsx
import React, { useEffect, useRef, useState } from 'react';
import { updateMovement } from './ecs/systems/MovementSystem';
import { handleCollision } from './ecs/systems/CollisionSystem';
import { createSnake } from './ecs/entities/Snake';
import { createFood } from './ecs/entities/Food';
import { createBricks } from './ecs/entities/Bricks';
import { growSnake } from './ecs/systems/FoodSystem';
import { createBoard } from './ecs/entities/Board';
import GameBoard from './GameBoard';
import { GameState } from './ecs/components/GameState';
import { PopUpCard } from './components/PopUpCard';


const Game: React.FC = () => {
    const [_render, setRender] = useState<boolean>(false);
    const gameStateRef = useRef<GameState>('init');
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

        let { clearBoard, drawSnake, drawFood, drawBricks, drawBgPattern } = new GameBoard(canvas, boardRef.current);

        let keyPressed = true;

        const gameLoop = () => {
            let gameState = gameStateRef.current;
            clearBoard();
            drawBgPattern();

            if (gameState == 'playing') {
                updateMovement(snakeRef.current, boardRef.current);
            }

            const collisionResult = handleCollision(snakeRef.current, foodRef.current, boardRef.current, bricksRef.current, growSnake);

            drawSnake(snakeRef.current);
            drawFood(foodRef.current);
            drawBricks(bricksRef.current);

            if (collisionResult == 'gameOver') {
                handleGameState('gameOver');
            }

            if (collisionResult == 'ateFood') {
                setRender((bol) => (!bol));
            }

            keyPressed = false;
        };

        gameLoop();

        let intervalId = setInterval(gameLoop, 200);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (keyPressed == true) return;
            let snake = snakeRef.current;
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
                    } else if (gameStateRef.current == 'init') {
                        handleGameState('playing');
                    } else if (gameStateRef.current == 'gameOver') {
                        handleResetGame();
                        handleGameState('playing');
                    }
                    break;
            }
            keyPressed = true;
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className='flex flex-col mt-10 items-center justify-center relative p-2' style={{ border: '1px solid #A3B396' }}>
                <div className='flex text-white mb-3 justify-between w-full absolute bottom-[100%]'>
                    <span className='font-medium'>Snake Game</span>
                    <span className='font-medium'>Score: {foodRef.current.ateFood}</span>
                </div>
                <canvas ref={canvasRef} />
                {
                    gameStateRef.current === 'paused' &&
                    <PopUpCard
                        type='paused'
                        onReset={() => { handleResetGame(); handleGameState('playing') }}
                        onClick={() => { handleGameState('playing') }}
                    />
                }
                {
                    gameStateRef.current === 'gameOver' &&
                    <PopUpCard
                        type='gameOver'
                        onClick={() => { handleResetGame(); handleGameState('playing') }}
                    />
                }
                {
                    gameStateRef.current === 'init' &&
                    <PopUpCard
                        type='init'
                        onClick={() => { handleResetGame(); handleGameState('playing') }}
                    />
                }
            </div>
        </>
    )
};

export default Game;
