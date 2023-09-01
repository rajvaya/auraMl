console.time("time");

let len = 20000;

function generateRandomGrid(L, W, maxLimit) {
  let grid = [];

  for (let l = 0; l < L; l++) {
    let row = [];
    for (let w = 0; w < W; w++) {
      let randomNumber = Math.floor(Math.random() * (maxLimit + 1)); // Generates random number from 0 to maxLimit
      row.push(randomNumber);
    }
    grid.push(row);
  }

  return grid;
}

grid = generateRandomGrid(100000, 100000, 0);
let cost = 0;
function calculateCost(grid) {
  for (let l = 0; l < grid.length; l++) {
    for (let w = 0; w < grid[l].length; w++) {
      let currFloor = grid[l][w];

      // console.clear()
      // console.log(`curren index ${l} - ${w} : ${currFloor}`);

      // check left
      if (grid?.[l - 1]?.[w] == undefined) {
        cost += currFloor;
      } else {
        if (currFloor > grid[l - 1][w]) {
          cost += currFloor - grid[l - 1][w];
        }
      }

      // check bottom
      if (grid?.[l]?.[w + 1] == undefined) {
        cost += currFloor;
      } else {
        if (currFloor > grid[l][w + 1]) {
          cost += currFloor - grid[l][w + 1];
        }
      }
      // check right
      if (grid?.[l + 1]?.[w] == undefined) {
        cost += currFloor;
      } else {
        if (currFloor > grid[l + 1][w]) {
          cost += currFloor - grid[l + 1][w];
        }
      }

      // check top
      if (grid?.[l]?.[w - 1] == undefined) {
        cost += currFloor;
      } else {
        if (currFloor > grid[l][w - 1]) {
          cost += currFloor - grid[l][w - 1];
        }
      }
    }
  }
}

calculateCost(grid);
console.log("total cost :", cost);
console.timeEnd("time");
