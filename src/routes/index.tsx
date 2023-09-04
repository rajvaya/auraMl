import { useState } from "react";

const index = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [limit, setLimit] = useState(100);
  const [cost, setCost] = useState(0);
  const [isLoading, setLoader] = useState(false);
  const [time, setTime] = useState("");

  function generateRandomGrid(L: number, W: number, maxLimit: number) {
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

  function calculateCost(grid: number[][]) {
    let start = performance.now();
    let totalCost = 0;
    for (let l = 0; l < grid.length; l++) {
      for (let w = 0; w < grid[l].length; w++) {
        let currFloor = grid[l][w];
        for (const direction of directions) {
          totalCost += grid[l][w] * 4;
          if (w >= 1) {
            totalCost -= Math.min(grid[l][w - 1], grid[l][w]) * 2; // check left
          }
          if (l >= 1) {
            totalCost -= Math.min(grid[l - 1][w], grid[l][w]) * 2; // check top
          }
        }
      }
    }
    let end = performance.now();
    setTime((end - start).toLocaleString());
    return totalCost;
  }

  function handleCalculateClick() {
    setTimeout(() => {
      const grid = generateRandomGrid(height, width, limit);
      const calculatedCost = calculateCost(grid);
      setCost(calculatedCost);
      setLoader(false);
    }, 100);
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-slate-700 w-screen min-h-screen text-yellow-50 ">
      <div>
        <label>Width: </label>
        <input
          type="number"
          value={width}
          min={1}
          max={100000}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="py-3 px-5 block w-48 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
          placeholder="Enter Width"
        ></input>
      </div>
      <div>
        <label>Height: </label>
        <input
          type="number"
          value={height}
          min={1}
          max={100000}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          className="py-3 px-5 block w-48  rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
          placeholder="Enter Width"
        ></input>
      </div>
      <div>
        <label>Max Building Limit</label>
        <input
          type="number"
          value={limit}
          min={1}
          max={100000}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="py-3 px-5 block w-48  rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
          placeholder="Enter Width"
        ></input>
      </div>

      {!isLoading ? (
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setLoader(true);
            setTime("");
            setCost(0);
            handleCalculateClick();
          }}
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-gray-600 border font-semibold text-gray-800 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm bg-gray-700 hover:bg-gray-900 text-white"
        >
          Calculate Cost
        </button>
      ) : (
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        ></div>
      )}
      <p>Total Cost: {cost}</p>
      <p className={time != "" ? "visible" : "hidden"}>
        calaculated in {time} milliseconds
      </p>
    </div>
  );
};

export default index;
