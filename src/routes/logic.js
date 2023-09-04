import readline from 'readline';

export function generateRandomGrid(L, W, maxLimit) {
  let grid = [];
  for (let l = 0; l < L; l++) {
    let row = [];
    for (let w = 0; w < W; w++) {
      let randomNumber = Math.floor(Math.random() * maxLimit) + 1;
      row.push(randomNumber);
    }
    grid.push(row);
  }
  return grid;
}

export function calculateCost(grid) {
  console.time("time")
  let totalCost = 0;
  for (let l = 0; l < grid.length; l++) {
    for (let w = 0; w < grid[l].length; w++) {
      totalCost += grid[l][w] * 4; 
      if (w >= 1) {
        totalCost -= Math.min(grid[l][w - 1], grid[l][w]) * 2; // check left
      }
      if (l >= 1) {
        totalCost -= Math.min(grid[l - 1][w], grid[l][w]) * 2; // check top
      }
    }
  }
  console.timeEnd("time");
  console.log(totalCost);
}

function takeUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter two space-separated integers L and W: ", (dimensions) => {
    const [L, W] = dimensions.split(' ').map(Number);
    if (isNaN(L) || isNaN(W) || L <= 0 || W <= 0) {
      console.log("Invalid input. L and W must be positive integers.");
      rl.close();
      return;
    }
    const grid = [];
    console.log("Enter the grid values (each row separated by a new line):");
    let rowCounter = 0;
    function readRow() {
      rl.question(`Row ${rowCounter + 1} (${W} space-separated integers): `, (rowInput) => {
        const rowValues = rowInput.split(' ').map(Number);
        if (rowValues.length === W && rowValues.every(val => val !== 0)) {
          grid.push(rowValues);
          rowCounter++;
          if (rowCounter < L) {
            readRow();
          } else {
            rl.close();
            calculateCost(grid);
          }
        } else {
          console.log(`Invalid input. Please enter ${W} non-zero integers.`);
          readRow();
        }
      });
    }
    readRow();
  });
}

takeUserInput();