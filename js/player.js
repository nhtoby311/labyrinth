export function generatePlayer(numOfPlayer){
    const arr = []

    const defaultPos = (num) => {
        switch(num){
            case 1:
                return {row: 0, col: 0}
            case 2:
                return {row: 0, col: 6}
            case 3: 
                return {row: 6, col: 0}
            case 4:
                return {row: 6, col: 6}
        }
    }

    for (let i = 1; i <= numOfPlayer; i++){
        arr.push({
            id: i,
            name: 'test',
            cell: defaultPos(i),
            moveablecell: '',
        })
    }
    return arr
}

export function getMoveableCell(player,boardArr){
    const playerPos = player.cell;

    let arr = [] 
    determinedCell(playerPos,boardArr)              //Fill in array


    function determinedCell(playerPos,boardArr){  
        const exits = getBoardData(playerPos,boardArr).exits
        arr.push(playerPos)
        let found = false
        for (let i = 0 ; i < exits.length; i++){
            if (!found)
            {
                if (exits[i] === 'left'){
                    if(playerPos.col-1 >= 0 && playerPos.col-1 < 7){
                        if (boardArr[playerPos.row][playerPos.col-1].exits.includes('right') === true){
                            if (arr.filter(e => e.row === playerPos.row && e.col === playerPos.col-1).length === 0){
                                determinedCell({row: playerPos.row, col: playerPos.col-1},boardArr)
                            }
                        }
                    }
                }
                else if (exits[i] === 'right'){
                    if(playerPos.col+1 >= 0 && playerPos.col+1 < 7){
                        if (boardArr[playerPos.row][playerPos.col+1].exits.includes('left') === true){
                            if (arr.filter(e => e.row === playerPos.row && e.col === playerPos.col+1).length === 0){
                                determinedCell({row: playerPos.row, col: playerPos.col+1},boardArr)
                            }
                        }
                    }
                }
                else if (exits[i] === 'up'){
                    if(playerPos.row-1 >= 0 && playerPos.row-1 < 7){
                        if (boardArr[playerPos.row-1][playerPos.col].exits.includes('down') === true){
                            if (arr.filter(e => e.row === playerPos.row-1 && e.col === playerPos.col).length === 0){
                                determinedCell({row: playerPos.row-1, col: playerPos.col},boardArr)
                            }
                        }
                    }
                }
                else if (exits[i] === 'down'){
                    if(playerPos.row+1 >= 0 && playerPos.row+1 < 7){
                        if (boardArr[playerPos.row+1][playerPos.col].exits.includes('up') === true){
                            if (arr.filter(e => e.row === playerPos.row+1 && e.col === playerPos.col).length === 0){
                                determinedCell({row: playerPos.row+1, col: playerPos.col},boardArr)
                            }
                        }
                    }
                }
            }
            

        }
        return 
    }

    console.log(arr)
    return arr

}


export function renderMoveableCell(boardArr,arrMoveable,state){
    //console.log(state.value)
    if (state.value === true){
        for (let i = 0; i < arrMoveable.length; i++){
            boardArr[arrMoveable[i].row][arrMoveable[i].col] = {...boardArr[arrMoveable[i].row][arrMoveable[i].col], moveable:true};
        }
        state.value = false
    }
    else {
        for (let i = 0; i < arrMoveable.length; i++){
            boardArr[arrMoveable[i].row][arrMoveable[i].col] = {...boardArr[arrMoveable[i].row][arrMoveable[i].col], moveable:false};
        }
        state.value = true
    }
}


export function movePlayer(player,row,col){
    player.cell.row = row
    player.cell.col = col
}




export function getBoardData(cell,boardArr){
    return boardArr[cell.row][cell.col]
}


export function updatePlayerToBoard(boardArr, players){
    for (let i = 0; i < players.length; i++){
        if (boardArr[players[i].cell.row][players[i].cell.col].player !== undefined){
            let playersDataArr = boardArr[players[i].cell.row][players[i].cell.col].player
            playersDataArr.push(players[i])
            boardArr[players[i].cell.row][players[i].cell.col] = {...boardArr[players[i].cell.row][players[i].cell.col],
                player:playersDataArr
            }
        }
        else{
            boardArr[players[i].cell.row][players[i].cell.col] = {...boardArr[players[i].cell.row][players[i].cell.col],
                player:[players[i]]
            }
        }
    }
}