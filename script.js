const btnNewGame = document.querySelector('.btnNewGame')
btnNewGame.addEventListener('click', startGame)


const board = document.querySelector('.board')
let items = document.getElementsByClassName('square')
let symbol = 'X'
let field = []
let COUNT = 4

let steps = COUNT ** 2, win = false





function startGame() {
    COUNT = +document.querySelector('#COUNT').value
    board.style.gridTemplateColumns = `repeat(${COUNT}, 60px)`
    board.style.gridTemplateRows = `repeat(${COUNT}, 60px)`

    field = []
    for(let i = 0; i < COUNT; i++) { 
        field[i] = []
    }

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

function toogleChar(char) {
    return char === 'X' ? 'O': 'X'
}

function fillField(n,char) {
    let row = Math.floor(n / COUNT)
    let col = n % COUNT
    field[row][col] = char
}

function checkWin(s) {
    //console.clear()
    /*
        COUNT = 4
        [[00],[01],[02],[03]],
        [[10],[11],[12],[13]],
        [[20],[21],[22],[23]],
        [[30],[31],[32],[33]],

        [[0],[1],[2],[3]],
        [[4],[5],[6],[7]],
        [[8],[9],[10],[11]],
        [[12],[13],[14],[15]],
    */

    let indexes_i1 = []
    let indexes_i2 = []
    let j2 = COUNT-1
    for(let i = 0; i < COUNT; i++) { 
        //-горизонтальная------------------------------
        let flag = true 
        let indexes = []
        for(let j = 0; j < COUNT; j++) { 
            if (field[i][j] === s && flag) {
                indexes.push(i*COUNT+j)
                if (j === COUNT - 1 && flag) {
                    showWin(indexes)
                    endGame(`${s} win! [ - ]`)
                }
            } else { flag = false}
        }
        //-вертикальная------------------------------
        indexes = []
        flag = true 
        for(let j = 0; j < COUNT; j++) { 
            if (field[j][i] === s && flag) {
                indexes.push(j*COUNT+i)
                if (j === COUNT - 1 && flag) {
                    showWin(indexes)
                    endGame(`${s} win! [ | ]`)
                }
            } else { flag = false}
        }
        //-диагональ 1------------------------------
        if (field[i][i] === s) {
            indexes_i1.push(i*COUNT+i)           
            if (indexes_i1.length === COUNT) {
                showWin(indexes_i1)
                endGame(`${s} win! [ \\ ]`)
            }
        }

        //-диагональ 2------------------------------                        
        if (field[i][j2] === s) {
            indexes_i2.push(COUNT*i+j2)       
            if (indexes_i2.length === COUNT) {
                showWin(indexes_i2)
                endGame(`${s} win! [ / ]`)
            }
        }
        j2--

    }
}

function setStep(e) {    
    const el = e.target
    const pos = el.getAttribute('data-pos')
    if(!el.textContent) {
        steps--
        el.textContent = symbol
        fillField(pos, symbol)
        //console.table(field);

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

