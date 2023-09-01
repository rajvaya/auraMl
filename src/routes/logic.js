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

let data = [
  [1, 3, 4],
  [2, 2, 3],
  [1, 2, 4],
]
calculateCost(data);
calculateCost(generateRandomGrid(10 , 10, 100));
calculateCost(generateRandomGrid(1000 , 1000, 100000));
calculateCost(generateRandomGrid(10000, 10000, 100000));
calculateCost(generateRandomGrid(1000, 100000, 100000));
calculateCost(generateRandomGrid(10000, 20000, 10000));

