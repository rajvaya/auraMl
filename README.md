# Problem

Ram works for a building window cleaning company and they charge $1 for each window cleaned. The building complex is built on a 2D grid of size L X W with L Rows
and W Columns. The grid is divided into cells of size 1X1 with each cell indicated by its coordinates (i, j) and each cell represents a single cuboid-shaped building.
Each cell has an integer Aij associated with it. Aij represents the total number of floors in the building at coordinates (i, j) and each floor is of size 1X1X1 and has 4 walls
with 1 window per wall if exposed to the outside.
Given the description of the building complex, find the total cost of cleaning the windows which will be equal to the sum of windows in every building exposed to the
outside of the complex.
## Solution

Define an array directions with four direction objects: top, left, bottom, and right.
Create a function calculateCost(grid).
Initialize totalCost to 0.
Loop through each cell in the grid.
For each cell, calculate its cost based on elevation differences with its neighboring cells in the four directions.
Add the calculated cost to totalCost.
Print totalCost as the result.
This algorithm calculates the total cost of cells in a grid based on elevation differences with neighboring cells in four directions.

## Complexity

### Time Complexity:
The algorithm uses nested loops to iterate through each cell in the grid and, for each cell, iterates through the four directions. In the worst case, it visits each cell once and performs a constant amount of work for each direction. Therefore, the time complexity is O(N*M), where N is the number of rows in the grid, and M is the number of columns in the grid.

### Space Complexity:
The algorithm uses a few additional variables, such as totalCost, currFloor, direction, and newL and newW, which consume a constant amount of memory regardless of the input grid size. Therefore, the space complexity is O(1), indicating that the space used by the algorithm remains constant and does not depend on the size of the input grid.

In summary, the time complexity is O(N*M), where N is the number of rows and M is the number of columns in the grid, while the space complexity is O(1), indicating a constant amount of additional memory usage

## Preview
![screely-1693549292922](https://github.com/rajvaya/auraMl/assets/28836300/f2a36fba-b3d6-4368-b2a6-ca7a818f7344)

### Additionl Information

- [Logic Code](https://github.com/rajvaya/auraMl/blob/main/src/routes/logic.js)
- [React App Link](https://elaborate-treacle-9dc265.netlify.app/)
