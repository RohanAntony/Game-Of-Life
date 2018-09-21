
      function createRowDiv(){
        let board = document.getElementById('board')
        let div = document.createElement('div')
        board.appendChild(div);
        return div;
      }

      function createCellDiv(rowDiv){
        let cellDiv = document.createElement('div')
        rowDiv.appendChild(cellDiv);
        return cellDiv;
      }

      function setDivText(div, text){
        let textNode = document.createTextNode(text);
        div.appendChild(textNode)
        return textNode
      }

      function createDivObject(rowDiv, text){
        let div = createCellDiv(rowDiv);
        let textNode = setDivText(div, text)
        return { div: div, text: textNode };
      }

      function createBoard (rows, cols){
        let board = []
        for(let i = 0; i < rows; i+=1){
          board[i] = []
          let rowDiv = createRowDiv()
          for(let j = 0; j < cols; j+=1){
            board[i][j] = {
              text: i + ',' + j,
              div: createDivObject(rowDiv, '(' + i + ',' + j +')')
            }
            Object.defineProperty(board[i][j], 'content', {
              get: () => {
                return board[i][j].text
              },
              set: (val) => {
                board[i][j].text = val
                board[i][j].div.text.data = val
              }
            })
          }
        }
        return board;
      }

      const NUMBER_OF_ROWS = 5
      const NUMBER_OF_COLS = 5

      let board = createBoard(NUMBER_OF_ROWS, NUMBER_OF_COLS)

      setInterval(function(){
        for(let i = 0; i < parseInt(Math.random() * 10); i++){
          board[parseInt(Math.random() * NUMBER_OF_ROWS)][parseInt(Math.random() * NUMBER_OF_COLS)]['content'] = parseInt(Math.random() * 1000)
        }
      }, 1000)
