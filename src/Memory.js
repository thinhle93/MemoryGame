import React from 'react';
import React, { useState } from 'react';
import './Memory.css';
export default function Memory() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [gridCheck, setGridCheck] = useState(
    new Array(grid.length)
      .fill('')
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [firstClicked, setFirstClicked] = useState(null);

  function handleCellClicked(rowIndex, colIndex) {
    if (gridCheck[rowIndex][colIndex]) return; // prevents same cell from being clicked
    const tempGridCheck = [...gridCheck];
    tempGridCheck[rowIndex][colIndex] = true;
    setGridCheck(tempGridCheck);

    if (firstClicked) {
      // already has a firstClicked so need to comparet the 2 numbers
      const firstNumberClicked = grid[firstClicked[0]][firstClicked[1]];
      const secondNumberClicked = grid[rowIndex][colIndex];
      console.log(firstNumberClicked, secondNumberClicked);
      // if the 2 numbers match do nothing
      if (firstNumberClicked != secondNumberClicked) {
        setTimeout(() => {
          // set both firstClicked and secondClicked to false to hide numbers
          tempGridCheck[rowIndex][colIndex] = false;
          tempGridCheck[firstClicked[0]][firstClicked[1]] = false;
          setGridCheck([...tempGridCheck]);
          // reset firstClicked to null so new firstNumber can be recorded
          setFirstClicked(null);
        }, 500);
      } else {
        // check if board is clear
        const clear = gridCheck.flat().every((element) => element);
        if (clear) {
          setTimeout(() => {
            alert('game cleared');
          }, 500);
        }
      }
      setFirstClicked(null);
    } else {
      // did not have a firstCicked so make it firstClicked
      setFirstClicked([rowIndex, colIndex]);
    }
  }
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} clasName="row">
          {row.map((number, colIndex) => (
            <div
              onClick={() => handleCellClicked(rowIndex, colIndex)}
              key={colIndex}
              className={
                'card ' + (gridCheck[rowIndex][colIndex] ? 'show' : '')
              }
            >
              {gridCheck[rowIndex][colIndex] ? number : ' '}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
