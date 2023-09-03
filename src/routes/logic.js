import readline from 'readline';

function generateRandomGrid(L, W, maxLimit) {
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

const directions = [
  { x: 0, y: -1 }, // top
  { x: -1, y: 0 }, // left
  { x: 0, y: 1 }, // bottom
  { x: 1, y: 0 }, // right
];

function calculateCost(grid) {
  console.time("time")
  let totalCost = 0;
  for (let l = 0; l < grid.length; l++) {
    for (let w = 0; w < grid[l].length; w++) {
      let currFloor = grid[l][w];
      for (const direction of directions) {
        let newL = l + direction.x;
        let newW = w + direction.y;
        if (grid?.[newL]?.[newW] === undefined) {
          totalCost += currFloor;
        } else if (currFloor > grid[newL][newW]) {
          totalCost += currFloor - grid[newL][newW];
        }
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