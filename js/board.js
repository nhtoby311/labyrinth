export function renderGhostBoard(boardArr,GhostBoard){
    let innerHTMLBoard = ''
    for (let i = 0; i < boardArr.length;i++){
        for(let j =0; j < boardArr[i].length; j++){
            innerHTMLBoard += handleGenerateBoard(boardArr[i][j])
        }
    }
    GhostBoard.innerHTML = innerHTMLBoard



    function handleGenerateBoard(cell){
        if (cell == undefined ) return '<div></div>'

        const DirecRendered = () => {
            let res = ''
            const renderDirec = (e)=>{
                return `<div class='${e}'></div>`
            }

            const renderArrow = (e) =>{
                if (e.col){
                    if (e.reverse === true){
                        return `<img src='./assets/arrowup.png' class='arrow-btn' data-type='${JSON.stringify(e)}' style=' bottom: -50px;'>↑</img>`
                    }
                    return `<img src='./assets/arrowdown.png' class='arrow-btn' data-type='${JSON.stringify(e)}' style=' top: -50px;'>↓</img>`
                }
                
                else if (e.row){
                    if (e.reverse === true){
                        return `<img src='./assets/arrowleft.png' class='arrow-btn' data-type='${JSON.stringify(e)}' style=' right: -50px;'>←</img>`
                    }
                    return `<img src='./assets/arrowright.png' class='arrow-btn' data-type='${JSON.stringify(e)}' style=' left: -50px;'>→</img>`
                }
                return `<button class='arrow-btn'>a</button>`
            } 

            if (cell.exits){
                for (let i = 0 ; i < cell.exits.length; i++){
                    res  += renderDirec(cell.exits[i])
                } 
                if (cell.arrow){
                    res += renderArrow(cell.arrow)
                }
            }
            
            return res
        }

        return `<div class="cell" data-exit='${JSON.stringify(cell.exits)}'>` + DirecRendered() + '</div>'    ///???
    }
}
        //Ghost board use to hold shifting arrow function



export function renderBoard(boardArr,BoardDiv){
    let innerHTMLBoard = ''
    for (let i = 0; i < boardArr.length;i++){
        for(let j =0; j < boardArr[i].length; j++){
            innerHTMLBoard += handleGenerateCell(boardArr[i][j])
        }
    }
    BoardDiv.innerHTML = innerHTMLBoard
}
       //Init rendering board

//Shifting Algo
export function addEventArrow(GhostBoard,BoardDiv,boardArr,extraCell,ExtraDiv){         //!!! Errors shifting does not update player Object cell.          
    const ArrowBtns = document.querySelectorAll('.arrow-btn')
    console.log(ArrowBtns)

    GhostBoard.addEventListener('click',(e)=>{
        if (!e.target.matches('.cell') && !e.target.matches('.arrow-btn'))
            return
    
        else if (e.target.matches('.arrow-btn')){
            const data = JSON.parse(e.target.dataset.type)
            console.log(data)
            const shiftArray = () =>{
                if (data.col){
                    if (data.reverse === false){
                        let temp = boardArr[6][data.col]
                        for (let i = 6; i > 0; i--){
                            //console.log(boardArr[i][data.col])
                            const rowNext = boardArr[i][data.col].row
                            const colNext = boardArr[i][data.col].col
                            boardArr[i][data.col] = {...boardArr[i - 1][data.col]}
                            boardArr[i][data.col].row = rowNext
                            boardArr[i][data.col].col = colNext
                        }
                        boardArr[0][data.col] = extraCell
                        extraCell = temp
                    }
                    else {
                        let temp = boardArr[0][data.col]
                        for (let i = 0; i < 6; i++){
                            //console.log(boardArr[i][data.col])
                            const rowNext = boardArr[i][data.col].row
                            const colNext = boardArr[i][data.col].col
                            boardArr[i][data.col] = {...boardArr[i + 1][data.col]}
                            boardArr[i][data.col].row = rowNext
                            boardArr[i][data.col].col = colNext
                        }
                        boardArr[6][data.col] = extraCell
                        extraCell = temp
                    }
                    
                }
                else if (data.row){
                    if (data.reverse === false){
                        let temp = boardArr[data.row][6]
                        for (let i = 6; i > 0; i--){
                            const rowNext = boardArr[data.row][i].row
                            const colNext = boardArr[data.row][i].col
                            boardArr[data.row][i] = {...boardArr[data.row][i-1]}
                            boardArr[data.row][i].row = rowNext
                            boardArr[data.row][i].col = colNext
                        }
                        boardArr[data.row][0] = extraCell
                        extraCell = temp
                    } 
                    else {
                        let temp = boardArr[data.row][0]
                        for (let i = 0; i < 6; i++){
                            const rowNext = boardArr[data.row][i].row
                            const colNext = boardArr[data.row][i].col
                            boardArr[data.row][i] = {...boardArr[data.row][i+1]}
                            boardArr[data.row][i].row = rowNext
                            boardArr[data.row][i].col = colNext
                        }
                        boardArr[data.row][6] = extraCell
                        extraCell = temp
                    }
                }
            }
            shiftArray()
            renderBoard(boardArr,BoardDiv) 
            ExtraDiv.innerHTML = handleGenerateCell(extraCell)
        }
    })
}




export function randomizeCell(){
    const arr = []
    const numDirection = Math.floor(Math.random() * 2)+2;
    //console.log(numDirection)

    const numToDirec = (num)=>{
        switch (num){
            case 1:{
                return "up"
            }
            case 2:{
                return "left"
            }
            case 3:{
                return "right"
            }
            case 4:{
                return "down"
            }
            
        }
    }

    for (let i = 0 ; i < numDirection; i++){
        let direction = Math.floor(Math.random() * 4)+1;
        while (arr.includes(numToDirec(direction))){
            direction = Math.floor(Math.random() * 4)+1;
        }
        arr.push(numToDirec(direction))
    }

    let res = [...new Set(arr)]
    return res
}


export function fixedCellGen(boardArr){
    boardArr[0][0] = {exits: ["down","right"],row: 0, col: 0}
    boardArr[0][2] = {exits: ["down","left"],row: 0, col: 2}
    boardArr[0][4] = {exits: ["down","left"],row: 0, col: 4}
    boardArr[0][6] = {exits: ["down","left"],row: 0, col: 6}

    boardArr[2][0] = {exits: ["down","left"],row: 2, col: 0}
    boardArr[2][2] = {exits: ["down","left"],row: 2, col: 2}
    boardArr[2][4] = {exits: ["down","left"],row: 2, col: 4}
    boardArr[2][6] = {exits: ["down","left"],row: 2, col: 6}

    boardArr[4][0] = {exits: ["down","left"],row: 4, col: 0}
    boardArr[4][2] = {exits: ["down","left"],row: 4, col: 2}
    boardArr[4][4] = {exits: ["down","left"],row: 4, col: 4}
    boardArr[4][6] = {exits: ["down","left"],row: 4, col: 6}

    boardArr[6][0] = {exits: ["down","left"],row: 6, col: 0}
    boardArr[6][2] = {exits: ["down","left"],row: 6, col: 2}
    boardArr[6][4] = {exits: ["down","left"],row: 6, col: 4}
    boardArr[6][6] = {exits: ["down","left"],row: 6, col: 6}



    boardArr[0][1] = {exits: randomizeCell(), arrow: {col: 1, reverse: false},row: 0, col: 1}
    boardArr[0][3] = {exits: randomizeCell(), arrow: {col: 3, reverse: false},row: 0, col: 3}
    boardArr[0][5] = {exits: randomizeCell(), arrow: {col: 5, reverse: false},row: 0, col: 5}

    boardArr[6][1] = {exits: randomizeCell(), arrow: {col: 1, reverse: true},row: 6, col: 1}
    boardArr[6][3] = {exits: randomizeCell(), arrow: {col: 3, reverse: true},row: 6, col: 3}
    boardArr[6][5] = {exits: randomizeCell(), arrow: {col: 5, reverse: true},row: 6, col: 5}

    boardArr[1][0] = {exits: randomizeCell(), arrow: {row: 1, reverse: false},row: 1, col: 0}
    boardArr[3][0] = {exits: randomizeCell(), arrow: {row: 3, reverse: false},row: 3, col: 0}
    boardArr[5][0] = {exits: randomizeCell(), arrow: {row: 5, reverse: false},row: 5, col: 0}

    boardArr[1][6] = {exits: randomizeCell(), arrow: {row: 1, reverse: true},row: 1, col: 6}
    boardArr[3][6] = {exits: randomizeCell(), arrow: {row: 3, reverse: true},row: 3, col: 6}
    boardArr[5][6] = {exits: randomizeCell(), arrow: {row: 5, reverse: true},row: 5, col: 6}



    //Test

    boardArr[2][4] = {exits: randomizeCell(),row: 2, col: 4,treasure:true}
    boardArr[3][5] = {exits: randomizeCell(),row: 3, col: 5,treasure:true}
    boardArr[4][2] = {exits: randomizeCell(),row: 4, col: 2,treasure:true}


    const fillInCell = ()=>{
        for(let i = 0; i < boardArr.length; i++){
            for (let j =0; j < boardArr[i].length; j++){
                if (boardArr[i][j] === undefined){
                    boardArr[i][j] = {exits: randomizeCell(),row: i, col: j}
                }
            }
        }
    }
    fillInCell()
}


export function handleGenerateCell(cell){
    if (cell == undefined ) return '<div></div>'

    const DirecRendered = () => {
        let res = ''
        const renderDirec = (e)=>{
            return `<div class='${e}'></div>`
        }

        const renderArrow = (e) =>{
            if (e.col){
                if (e.reverse === true){
                    return `<button class='arrow-btn' data-type='${JSON.stringify(e)}' style='left:calc(50% - 5px); bottom: -30px;'>a</button>`
                }
                return `<button class='arrow-btn' data-type='${JSON.stringify(e)}' style='left:calc(50% - 5px); top: -30px;'>a</button>`
            }
            
            else if (e.row){
                if (e.reverse === true){
                    return `<button class='arrow-btn' data-type='${JSON.stringify(e)}' style='top:calc(50% - 5px); right: -30px;'>a</button>`
                }
                return `<button class='arrow-btn' data-type='${JSON.stringify(e)}' style='top:calc(50% - 5px); left: -30px;'>a</button>`
            }
            return `<button class='arrow-btn'>a</button>`
        } 

        const renderPlayer = (player)=>{
            return `<div class='player' data-playerinfo='${JSON.stringify(player)}'>${player.id}</div>`
        }

        const renderMoveable = ()=>{
            return `<div class='moveable'></div>`
        }

        const renderTreasure = ()=>{
            return `<div class='treasure'></div>`
        }

        if (cell.exits){
            const exitSortedArr = cell.exits.sort()
            const classExit = exitSortedArr.join("")
            res += `<div style='background-image: url(./assets/cell/${classExit}.png);' class="cell-img"></div>`

            for (let i = 0 ; i < cell.exits.length; i++){
                res  += renderDirec(cell.exits[i])
            }
        }
        if (cell.player){
            for (let i = 0; i < cell.player.length; i++){
                res  += renderPlayer(cell.player[i])
            }
        }
        if (cell.moveable){
            res  += renderMoveable()
        }

        if(cell.treasure){
            res += renderTreasure()
        }
        
        return res
    }

    return `<div class="cell" data-exit='${JSON.stringify(cell.exits)}' data-row='${JSON.stringify(cell.row)}' data-col='${JSON.stringify(cell.col)}'>` + DirecRendered() + '</div>'    
}