# Game-Of-Life

Game of life is a zero player game, which lives as an example of how a simple set of rules with an initial state can lead to creation of complex life forms.
The game consits of a board which needs to be set with an initial configuration. Once the configuration is set, the below rules are followed till the board collapses with no cells available.
The rules for game of life are as follows
1.  Any live cell with fewer than two live neighbors dies, as if by under population.
2.  Any live cell with two or three live neighbors lives on to the next generation.
3.  Any live cell with more than three live neighbors dies, as if by overpopulation.
4.  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## ToDo
- Create CSS elements for each cell and row along with each state as classes
- Implement the rules as javascript functions
- make changes in code to update the classes for each div instead of modifying textNode
- Allow user to set initial configuration which means support 2 way data binding
- Add button to start the game
- Allow user to set cycle time to reduce time for each iteration

## Nice to have ToDo
- Allow user to use a preset configuration like 'Gosper\'s Glider Gun' or 'Pulsar' or even 'Breeder'
