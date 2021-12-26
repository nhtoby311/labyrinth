import {renderGhostBoard, renderBoard, addEventArrow, randomizeCell, fixedCellGen, handleGenerateCell} from './board.js'
import {generatePlayer,updatePlayerToBoard,getMoveableCell,renderMoveableCell,movePlayer} from './player.js'

export default function Game(){
    const BoardDiv = document.querySelector('.board')               //Visible Board
    const GhostBoard = document.querySelector('.board-ghost')        //Board that hold the button arrow
    const ExtraDiv  = document.querySelector('.extra-cell')
    
    let playerMoveableState = {value:true};                         //so later pass as reference parameter to function
    let playerRef                                                   //ref of the playerDiv that clicked on

    let boardArr = new Array(7)             //Init Board array
    for(let i = 0; i < boardArr.length; i++){
        boardArr[i] = new Array(7)
    }

    let players = generatePlayer(2)                 //Array of players, change to value of textfield later
    console.log(players)
    
    fixedCellGen(boardArr)      //Generate cells

    let extraCell = {exits: randomizeCell()}            //Need col and row!!!!
    ExtraDiv.innerHTML = handleGenerateCell(extraCell)

    renderGhostBoard(boardArr,GhostBoard)                  //Ghost board use to hold shifting arrow function

    renderBoard(boardArr,BoardDiv)             //Init rendering board

    addEventArrow(GhostBoard,BoardDiv,boardArr,extraCell,ExtraDiv)               //Handle event for arrow like shifting

    updatePlayerToBoard(boardArr,players)

    renderBoard(boardArr,BoardDiv) 



    //Handle player moveable place
    BoardDiv.addEventListener('click',(e)=>{
        if (!e.target.matches('.player') && !e.target.matches('.moveable')) return 

        //Click on player
        if (e.target.matches('.player')){
            playerRef = JSON.parse(e.target.dataset.playerinfo)
            renderMoveableCell(boardArr,getMoveableCell(playerRef,boardArr),playerMoveableState)
            renderBoard(boardArr,BoardDiv) 
        }


        //Click on moveable cells
        else if (e.target.matches('.moveable')){
            const row = parseInt(e.target.parentNode.dataset.row)           //getting data from the data-attr of cell HTML
            const col = parseInt(e.target.parentNode.dataset.col)

            console.log(row)
            console.log(col)

            const playerActual = players.find(e => e.id === playerRef.id)

            for(let i = 0; i < players.length;i++){                     //clear players from prev cell to update new players position
                const rowP = players[i].cell.row
                const colP = players[i].cell.col
                boardArr[rowP][colP] = {...boardArr[rowP][colP],player:undefined}
            }
            
            renderMoveableCell(boardArr,getMoveableCell(playerActual,boardArr),playerMoveableState)               
            movePlayer(playerActual,row,col)        
            
            updatePlayerToBoard(boardArr,players)
            renderBoard(boardArr,BoardDiv)

        }
        
    })
}



