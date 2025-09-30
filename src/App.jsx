import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function Button({value, onButtonClick}) {
  
  return (
    <button className="square" onClick={onButtonClick}>
      {value}
    </button>
  );
}

function Grid({xIsNext, handlePlay, values}) {


 function handleClick(i) {
    if(values[i] || detectWinner(values)) {
      return;
    }
    else {
      const newValues = values.slice();
      if(xIsNext) {
        newValues[i] = "X";
      } 
      else {
        newValues[i] = "O";
      }
      
      handlePlay(newValues);
    }
  } 

  let status;

  const winner = detectWinner(values);

  const draw = detectDraw(values);

  if(winner) {
    status = "Winner: " + winner; 
  }
  else if(draw) {
    status = "Draw";
  }
  else {
    status = "Next turn: " + (xIsNext ? "X" : "O");
  }




  return (
    <>
    <div class="board">
      <div className="status">{status}</div>
      <div className="grid">
        <div className="row">
          <Button value={values[0]} onButtonClick={() => handleClick(0)} />
          <Button value={values[1]} onButtonClick={() => handleClick(1)} />
          <Button value={values[2]} onButtonClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Button value={values[3]} onButtonClick={() => handleClick(3)} />
          <Button value={values[4]} onButtonClick={() => handleClick(4)} />
          <Button value={values[5]} onButtonClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Button value={values[6]} onButtonClick={() => handleClick(6)} />
          <Button value={values[7]} onButtonClick={() => handleClick(7)} />
          <Button value={values[8]} onButtonClick={() => handleClick(8)} />
        </div>
      </div>
    </div>


    
    </>
  );

}



export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentValues = history[currentMove];

  
  function handlePlay(nxtValues) {
    const nxtHistory = [...history.slice(0, currentMove + 1), nxtValues];
    setHistory(nxtHistory);
    setCurrentMove(nxtHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((hist, move) => {
    let description;

    if(move > 0) {
      description = "Go to #" + move + " move";
    }
    else {
      description = "Go to Game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  })


  return (
    <>
    <div className="container">
      <Grid xIsNext={xIsNext} handlePlay={handlePlay} values={currentValues} />
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>

    </>
  );
}

function detectWinner(values) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for(let i=0; i<wins.length; i++) {
    const [a, b, c] = wins[i];

    if(values[a] && values[a] === values[b] && values[a] === values[c]) {
      return values[a];
    }
  }
  return null;
}


function detectDraw(values) {
  for(let i=0; i<values.length; i++) {
    if(values[i] === null) {
      return false;
    }
  }
  return true;
}


