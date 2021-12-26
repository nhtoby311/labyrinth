export default function Start(){
    const startScreen = document.querySelector('.start-screen')
    const startBtn = document.querySelector('.start-btn')
    const startGameBtn = document.querySelector('#start-game')
    const startDialog = document.querySelector('.start-dialog')
    const closeBtn =  document.querySelector('#close-btn')
    const howToDialog = document.querySelector('.how-to-dialog')
    const howToBtn = document.querySelector('#how-to-btn')
    const numOfPlayersInput = document.querySelector('#num-of-player')
    const numOfTreasureInput = document.querySelector('#num-of-treausure')

    startBtn.addEventListener('click',()=>{
        startDialog.classList.add('starting')
    })

    howToBtn.addEventListener('click',()=>{
        howToDialog.classList.add('starting')
    })

    startGameBtn.addEventListener('click',()=>{
        startScreen.classList.add('starting')
        startDialog.classList.remove('starting')
        setTimeout(() => {
            startScreen.style.display = "none"
        }, 1000);
        console.log(numOfPlayersInput.value)
    })

    closeBtn.addEventListener('click',()=>{
        howToDialog.classList.remove('starting')
    })

    console.log(startBtn)
}