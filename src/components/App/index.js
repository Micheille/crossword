import React from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './App.css';

function App() {
  return (
    <div className='crossword-app'>
      <header className='crossword-app__header'>
        <h1>Сrossword Puzzle Site</h1>
      </header>

      <main className='crossword-app__main'>
        <CrosswordTable width={10} height={10} />
      </main>
    </div>
  );
}

export default App;
