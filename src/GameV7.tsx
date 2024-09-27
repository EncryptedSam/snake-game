// src/Game.tsx
import React, { useEffect, useRef, useState } from 'react';
import { createBall } from './ecs/entities/Ball';
import { createBricks } from './ecs/entities/Bricks';
import { updateMovement } from './ecs/systems/MovementSystem';
// import { handleCollision } from './ecs/systems/CollisionSystem';
import { createSnake } from './ecs/entities/Snake';
import { Grid } from './ecs/components/Grid';

class GameBoard {
    ctx: CanvasRenderingContext2D | null;
    size: number;
    canvasWidth: number;
    canvasHeight: number;
    grid: { rows: number, cols: number };

    constructor(canvas: HTMLCanvasElement | null, grid: Grid, size: number) {
        canvas!.width = grid.cols * size;
        canvas!.height = grid.rows * size;
        this.ctx = canvas!.getContext('2d');
        this.size = size;
        this.canvasWidth = canvas!.width;
        this.canvasHeight = canvas!.height;
        this.grid = grid;
    }

    private square = (x: number, y: number, color: string = '#97a58c') => {
        const gap = 3
        this.ctx!.strokeStyle = color;
        this.ctx!.fillStyle = color;
        this.ctx!.strokeRect((x * this.size) + gap, (y * this.size) + gap, this.size - (gap * 2), this.size - (gap * 2));
        this.ctx!.fillRect((x * this.size) + (gap * 2.5), (y * this.size) + (gap * 2.5), this.size - (gap * 5), this.size - (gap * 5));
    }

    private patternSquare = (x: number, y: number) => {
        this.square(x, y);
    }

    private snakeSegments = (x: number, y: number) => {
        this.square(x, y, '#151212');
    }

    brick = (x: number, y: number, color: string = '#151212') => {
        const gap = 3
        this.ctx!.strokeStyle = color;
        this.ctx!.fillStyle = color;
        this.ctx!.strokeRect((x * this.size) + gap, (y * this.size) + gap, this.size - (gap * 2), this.size - (gap * 2));
        this.ctx!.fillRect((x * this.size) + (gap * 1.6), (y * this.size) + (gap * 1.6), this.size - (gap * 3.2), this.size - (gap * 3.2));
    }

    private snakeHead = () => {

    }

    private paintBoard = () => {
        let { cols, rows } = this.grid;

        this.ctx!.fillStyle = '#a3b396';
        this.ctx!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                this.patternSquare(col, row);
            }
        }
    }

    drawSnake = (segments: { x: number, y: number }[]) => {
        segments.forEach(({ x, y }) => {
            this.snakeSegments(x, y);
        });
    }

    drawFood = (x: number, y: number) => {
        this.square(x, y, '#b20000');
    }

    clearBoard = () => {
        this.ctx!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.paintBoard();
    }
}

const GameV7: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const snake = createSnake();


    useEffect(() => {
        const canvas = canvasRef.current;
        const grid = { rows: 20, cols: 20 };
        let { clearBoard, drawSnake, drawFood, brick } = new GameBoard(canvas, grid, 25);
        clearBoard();

        const gameLoop = () => {
            clearBoard();
            drawSnake(snake.segments);
            drawFood(10, 10);
            brick(15, 5);

            // Movement system
            updateMovement(snake, grid);

            // handleCollision(snake, briks, food);
        };

        const intervalId = setInterval(gameLoop, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className='p-2' style={{ outline: '1px solid white' }}>
            <canvas ref={canvasRef} />
        </div>
    )
};

export default GameV7;
