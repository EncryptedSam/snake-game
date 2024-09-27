import React from 'react';
import Game from './Game';

const App: React.FC = () => {


  return (
    <div className="flex flex-col h-screen w-screen  items-center justify-center">
      <div className='max-h-screen max-w-screen'>
        <Game />
      </div>
    </div>
  );
};

export default App;


