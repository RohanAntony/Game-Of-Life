const NUMBER_OF_ROWS = 50
const NUMBER_OF_COLS = 50
let TIME_OF_ITERATION = 500

function createRowDiv(){
  let board = document.getElementById('board')
  let div = document.createElement('div')
  div.classList.add('clearboth')
  board.appendChild(div);
  return div;
}

function createCellDiv(rowDiv){
  let cellDiv = document.createElement('div')
  rowDiv.appendChild(cellDiv);
  return cellDiv;
}

function createDivObject(rowDiv, i, j){
  let div = createCellDiv(rowDiv);
  div.classList.add('cell')
  div.classList.add('inline')
  div.classList.add('dead')
  div.setAttribute("onclick", "toggleCell(" + i + "," + j + ")")
  return div;
}

function setClass(div, val){
  if(val == 0){
    div.classList.add('dead')
    div.classList.remove('live')
  }
  else if(val == 1){
    div.classList.add('live')
    div.classList.remove('dead')
  }
}

let board = [[]]

function createBoardDisplay(rows, cols){
    for(let i = 0; i < rows + 2; i+=1){
      board[i] = []
      let rowDiv = createRowDiv()
      for(let j = 0; j < cols + 2; j+=1){
        if(i != 0 && j != 0 && i != rows + 1 && j != cols + 1){
          board[i][j] = {
            'div':createDivObject(rowDiv, i, j)
          }
        }else{
          board[i][j] = {}
        }
      }
    }
}

function createBoardObject(rows, cols){
  for(let i = 0; i < rows + 2; i+=1){
    for(let j = 0; j < cols + 2; j+=1){
      let obj = board[i][j]
      obj.prev = 0
      obj.next = 0
      Object.defineProperty(obj, 'state', {
        get:() => {
          return obj.prev;  //return the past state value
        },
        set:(val) => {
            obj.next = val; //set the future state value
        }
      })
      obj.updateState = () => {
        obj.prev = obj.next //update the value for the objects
        setClass(obj.div, obj.prev) //update the value for the display
      }
      board[i][j] = obj
    }
  }
}

function toggleCell(i, j){
  let obj = board[i][j]
  obj.state = (obj.state ? 0 : 1);
  obj.updateState()
  board[i][j] = obj;
  console.log(i, j)
}

createBoardDisplay(NUMBER_OF_ROWS, NUMBER_OF_COLS)
createBoardObject(NUMBER_OF_ROWS, NUMBER_OF_COLS)

function sumOfAdjacents(board, i, j){
  return (
    board[i-1][j-1].state + board[i-1][j].state + board[i-1][j+1].state +
    board[ i ][j-1].state +           0         + board[ i ][j+1].state +
    board[i+1][j-1].state + board[i+1][j].state + board[i+1][j+1].state
  )
}

function nextState(board, rows, cols){
  for(let i = 0; i < rows; i+=1){
    for(let j = 0; j < cols; j+=1){
      let sum = sumOfAdjacents(board, i+1, j+1)
      let cell = board[i+1][j+1]
      if(cell.state == 1){
        if(sum < 2 || sum > 3)
          cell.state = 0
        else {
          cell.state = 1
        }
      }else{
        if(sum == 3)
          cell.state = 1
        else {
          cell.state = 0
        }
      }
    }
  }
  for(let i = 0; i < rows; i+=1){
    for(let j = 0; j < cols; j+=1){
      board[i+1][j+1].updateState()
    }
  }
}

function resetState(board, rows, cols){
  for(let i = 0; i < rows; i+=1){
    for(let j = 0; j < cols; j+=1){
      board[i+1][j+1].state = 0
      board[i+1][j+1].updateState()
    }
  }
}

let IntervalFunction = null;

function start(){
  let iterationTime = document.getElementById('time').value
  TIME_OF_ITERATION = parseInt(iterationTime) ? parseInt(iterationTime) : 500;
  document.getElementById('time').value = TIME_OF_ITERATION
  IntervalFunction = setInterval(function(){
    nextState(board, NUMBER_OF_ROWS, NUMBER_OF_COLS)
  }, TIME_OF_ITERATION)
}

function stop(){
  clearInterval(IntervalFunction)
  IntervalFunction = null
}

function next(){
  clearInterval(IntervalFunction)
  IntervalFunction = null
  nextState(board, NUMBER_OF_ROWS, NUMBER_OF_COLS)
}

function reset(){
  clearInterval(IntervalFunction)
  IntervalFunction = null
  resetState(board, NUMBER_OF_ROWS, NUMBER_OF_COLS)
}
