const inner = document.getElementsByClassName('inner');
const spans = document.getElementsByTagName('span');
const h1 = document.getElementsByTagName('h1')[0];
const restart_btn = document.getElementsByTagName('button')[0];

let turn = 'X';
let times = 0;
const WINNER_COM = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function checkWinner() {
    let winner = null;
    for (let i = 0; i < WINNER_COM.length; i++) {
        const g = WINNER_COM[i];
        if (
            inner[g[0]].innerText === inner[g[1]].innerText &&
            inner[g[1]].innerText === inner[g[2]].innerText &&
            inner[g[0]].innerText.length > 0
        ) {
            winner = inner[g[2]].innerText;
        }
    }
    return winner;
}

const clear = () => {
    for (let i = 0; i < inner.length; i++) {
        spans[i].innerText = '';
    }
};

const startGame = () => {
    h1.innerText = `${ turn } 's turn;`
    for (let i = 0; i < inner.length; i++) {
        inner[i].onclick = () => {
            if (spans[i].innerText.length > 0 || times >= 9) return;
            spans[i].innerText = turn;
            spans[i].style.color = turn === 'X' ? 'green' : 'red';
            turn = turn === 'X' ? 'O' : 'X';
            times++;
            const winner = checkWinner();
            if (winner !== null) {
                times = 9;
                restart_btn.style.display = 'inline-block';
                h1.innerText =` Winner is ${ winner } !;`
            } else {
                if (times === 9) {
                    h1.innerText ='Оюн бутту:);'
                    restart_btn.style.display = 'inline-block';
                } else h1.innerText = `${ turn } 's turn;`
            }
        };
    }
};

restart_btn.onclick = () => {
    const winner = checkWinner();
    if (times < 9 && !winner) return;
    times = 0;
    clear();
    startGame();
};

startGame();