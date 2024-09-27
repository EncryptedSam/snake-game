
# Snake Game 🐍

A classic Snake Game built using **ReactJS** and **TypeScript**, powered by **Vite** for fast and efficient development. This game is built using **Entity-Component-System (ECS)** architecture.

## Features

- Snake movement with arrow keys
- Collision detection between the snake, food, and obstacles
- Dynamic growth of the snake upon food consumption
- Randomized food and brick placement
- Game reset functionality with a power reset icon

## Tech Stack

- **ReactJS**: For building the user interface
- **TypeScript**: Ensuring static typing
- **Vite**: For fast builds and hot-reloading during development
- **ECS (Entity-Component-System)**: Used for organizing game logic in a modular way

---

## Project Structure

```
├── components
│   ├── icons
│   │   └── GrPowerReset.tsx  // Icon for resetting the game
│   ├── PopUpCard
│   │   ├── PopUpCard.tsx     // Component for displaying pop-up cards in the game
│   │   └── index.ts          // Export file for PopUpCard
├── ecs
│   ├── components
│   │   ├── GameState.ts      // Tracks the state of the game (score, lives, etc.)
│   │   ├── Grid.ts           // Grid system that defines the game space
│   │   └── Position.ts       // Represents the position of entities in the game
│   ├── entities
│   │   ├── Board.ts          // The game board
│   │   ├── Bricks.ts         // Obstacle entities (bricks)
│   │   ├── Food.ts           // Food entity
│   │   └── Snake.ts          // Snake entity
│   ├── systems
│   │   ├── CollisionSystem.ts // Handles collision detection (snake-food, snake-bricks)
│   │   ├── FoodSystem.ts      // Manages food spawning and consumption
│   │   └── MovementSystem.ts  // Controls snake movement
├── utils
│   ├── generateRandomCoords.ts // Utility function to generate random coordinates
│   └── isPointInList.ts        // Utility to check if a point is within a list of coordinates
├── App.css                    // Styling for the app
├── App.tsx                    // Main entry point for the React app
├── Game.tsx                   // Core game component
└── GameBoard.ts               // Manages the game board display and logic
```

### Folder Details

- **components**: Contains reusable UI components, including icons and pop-up cards.
- **ecs**: The heart of the ECS (Entity-Component-System) architecture for managing game entities, components, and systems.
  - **components**: Define the attributes and state of game entities (like position, grid, game state).
  - **entities**: Represent the core game objects (Snake, Food, Bricks, Board).
  - **systems**: Manage the interaction logic and game rules (Movement, Collision, Food consumption).
- **utils**: Utility functions to support the game logic.
- **App.tsx**: The root component where the game is initialized.
- **Game.tsx**: Contains the main game logic and the React component where the game is rendered.
- **GameBoard.ts**: Handles the board rendering and the game state.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EncryptedSam/snake-game.git
   cd snake-game
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the project in development mode:**

   ```bash
   npm run dev
   ```

4. **Build the project for production:**

   ```bash
   npm run build
   ```

## Game Controls

- **Arrow Keys**: Move the snake in different directions.
- **Spacebar**: Pause or resume the game.
- **Reset Icon**: Click the reset button to restart the game.

## Contributions

Feel free to submit issues or pull requests if you would like to improve or add features to this project.

## License

This project is open-source and available under the [MIT License](LICENSE).