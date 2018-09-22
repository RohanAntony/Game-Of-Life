
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

      function createBoard (rows, cols){
        let board = []
        for(let i = 0; i < rows; i+=1){
          board[i] = []
          let rowDiv = createRowDiv()
          for(let j = 0; j < cols; j+=1){
            board[i][j] = {
              text: 0,
              div: createDivObject(rowDiv, i, j)
            }
            Object.defineProperty(board[i][j], 'content', {
              get: () => {
                return board[i][j].text
              },
              set: (val) => {
                board[i][j].text = val
                setClass(board[i][j].div, val)
              }
            })
          }
        }
        return board;
      }

      function toggleCell(i, j){
        board[i][j]['content'] = (board[i][j]['content'] ? 0 : 1);
      }

      const NUMBER_OF_ROWS = 50
      const NUMBER_OF_COLS = 50

      let board = createBoard(NUMBER_OF_ROWS, NUMBER_OF_COLS)

      // setInterval(function(){
      //   for(let i = 0; i < parseInt(Math.random() * 100); i++){
      //     let setVal = parseInt(Math.random() * 2);
      //     console.log(setVal);
      //     board[parseInt(Math.random() * NUMBER_OF_ROWS)][parseInt(Math.random() * NUMBER_OF_COLS)]['content'] = setVal;
      //   }
      // }, 1000)
