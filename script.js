const board = document.querySelector('.board')
let items = document.getElementsByClassName('square')
let symbol = 'X'
let field = []
const COUNT = 3
board.style.gridTemplateColumns = `repeat(${COUNT}, 60px)`
board.style.gridTemplateRows = `repeat(${COUNT}, 60px)`
let steps = COUNT ** 2, win = false

for(let i = 0; i < COUNT; i++) { 
    field[i] = []
}

function startGame() {
    win = false
    steps = COUNT ** 2
    board.innerHTML = ''
    for(let i = 0; i < COUNT ** 2; i++) {
        const square = document.createElement('div')
        square.className = 'square'
        square.setAttribute('data-pos', i)
        square.textContent = ''
        fillField(i, '')
        square.addEventListener('click', setStep)
        board.append(square)
    }
}




console.log(items);

function toogleChar(char) {
    return char === 'X' ? 'O': 'X'
}

function fillField(n,char) {
    let row = Math.floor(n / COUNT)
    let col = n % COUNT
    field[row][col] = char
}

function checkWin(s) {
    for(let i = 0; i < COUNT; i++) { 
        let flag = true 
        let indexes = []
        for(let j = 0; j < COUNT; j++) { 
            if (field[i][j] === s && flag) {
                indexes.push(i*COUNT+j)
                if (j === COUNT - 1 && flag) {
                    showWin(indexes)
                    endGame(`${s} win!`)
                }
            }
        }
        //-------------------------------
        indexes = []
        flag = true 
        for(let j = 0; j < COUNT; j++) { 
            if (field[j][i] === s && flag) {
                indexes.push(j*COUNT+i)
                if (j === COUNT - 1 && flag) {
                    showWin(indexes)
                    endGame(`${s} win!`)
                }
            }
        }
        // if( field[0][i] === s &&
        //     field[1][i] === s &&
        //     field[2][i] === s
        // ) {
        //     showWin([0*COUNT+i,1*COUNT+i,2*COUNT+i])
        //     endGame(`${s} win!`)
        // }
    }

    if( field[0][0] === s &&
        field[1][1] === s &&
        field[2][2] === s
    ) {
        showWin([0,4,8])
        endGame(`${s} win!`)
    }

    if( field[0][2] === s &&
        field[1][1] === s &&
        field[2][0] === s
    ) {
        showWin([2,4,6])
        endGame(`${s} win!`)
    }
}

function setStep(e) {    
    const el = e.target
    const pos = el.getAttribute('data-pos')
    if(!el.textContent) {
        steps--
        el.textContent = symbol
        fillField(pos, symbol)
        console.table(field);

        checkWin(symbol);
        symbol = toogleChar(symbol)
    }
    if (steps === 0 && !win) {
        endGame(`ничья`)
    }

    

}

function showWin(posArr) {
    win = true
    posArr.forEach(pos => {
        items[pos].classList.add('win')
    })
}

function endGame(text) {
    win = true
    setTimeout(function() {
        alert(text)
        startGame()
    }, 0)
}

startGame()

