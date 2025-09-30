import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function Button({value, handleClick}) {
  
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [values, setValues] = useState(Array(9).fill(null));

  function handleClick(i) {
    const newValues = values.slice();
    newValues[i] = "X";
    setValues(newValues);
  }


  return (
    <>
      <div className="row">
        <Button value={values[0]} onClick={() => handleClick(0)} />
        <Button value={values[1]} onClick={() => handleClick(1)} />
        <Button value={values[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Button value={values[3]} onClick={() => handleClick(3)} />
        <Button value={values[4]} onClick={() => handleClick(4)} />
        <Button value={values[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Button value={values[6]} onClick={() => handleClick(6)} />
        <Button value={values[7]} onClick={() => handleClick(7)} />
        <Button value={values[8]} onClick={() => handleClick(8)} />
      </div>
    
    </>
  );
}
