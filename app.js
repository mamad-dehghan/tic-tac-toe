'use strict';
let turn = 'o';
let yours = 'x';
let xScore = 0;
let oScore = 0;
let equal = 0;
let move = 0;

let r1c1_value = null;
let r1c2_value = null;
let r1c3_value = null;
let r2c1_value = null;
let r2c2_value = null;
let r2c3_value = null;
let r3c1_value = null;
let r3c2_value = null;
let r3c3_value = null;

const reset = document.getElementById('reset');
const key_r1c1 = document.getElementById('r1c1');
const key_r1c2 = document.getElementById('r1c2');
const key_r1c3 = document.getElementById('r1c3');
const key_r2c1 = document.getElementById('r2c1');
const key_r2c2 = document.getElementById('r2c2');
const key_r2c3 = document.getElementById('r2c3');
const key_r3c1 = document.getElementById('r3c1');
const key_r3c2 = document.getElementById('r3c2');
const key_r3c3 = document.getElementById('r3c3');

const endGameDialog = document.getElementById('end-game-dialog');
const endGameDialogWinner = document.getElementById('winner-name');
const endGameDialogContent = document.getElementById('dialog-content');
const quitBtn = document.getElementById('quit-button');
const nextRoundBtn = document.getElementById('next-round-button');
const oScoreKey = document.getElementById('o-score');
const evanScoreKey = document.getElementById('equal-score');
const xScoreKey = document.getElementById('x-score');
const turnViewer = document.getElementById('turn-viewer');

const row1Complete = () => {
	return ((r1c1_value === r1c2_value) && (r1c1_value === r1c3_value));
}
const row2Complete = () => {
	return ((r2c1_value === r2c2_value) && (r2c1_value === r2c3_value));
}
const row3Complete = () => {
	return ((r3c1_value === r3c2_value) && (r3c1_value === r3c3_value));
}
const column1Complete = () => {
	return ((r1c1_value === r2c1_value) && (r1c1_value === r3c1_value));
}
const column2Complete = () => {
	return ((r1c2_value === r2c2_value) && (r1c2_value === r3c2_value));
}
const column3Complete = () => {
	return ((r1c3_value === r2c3_value) && (r1c3_value === r3c3_value));
}
const x1Complete = () => {
	return ((r1c1_value === r2c2_value) && (r1c1_value === r3c3_value));
}
const x2Complete = () => {
	return ((r1c3_value === r2c2_value) && (r1c3_value === r3c1_value));
}

const updateScore = (winner) => {
	if (winner === 'x') {
		xScore++;
		xScoreKey.innerText = xScore.toString();
	} else if (winner === 'o') {
		oScore++;
		oScoreKey.innerText = oScore.toString();
	} else {
		equal++;
		evanScoreKey.innerText = equal.toString();
	}
}

const showWinDialog = (winner) => {
	endGameDialog.style.display = 'flex';
	endGameDialogContent.classList.add(winner);
	if (yours === winner)
		endGameDialogWinner.innerText = 'you won!'
	else if (winner === 'e')
		endGameDialogWinner.innerText = 'game even!'
	else
		endGameDialogWinner.innerText = 'you loss!'


	if (winner === 'x') {
		endGameDialogContent.classList.add('color-orange');
		quitBtn.classList.add('bg-grey')
		nextRoundBtn.classList.add('bg-light-blue')
	} else if (winner === 'o') {
		endGameDialogContent.classList.add('color-light-blue');
		quitBtn.classList.add('bg-grey')
		nextRoundBtn.classList.add('bg-orange')
	} else {
		endGameDialogContent.classList.add('color-grey');
		quitBtn.classList.add('bg-light-blue')
		nextRoundBtn.classList.add('bg-orange')
	}

	updateScore(winner);
}

const hideWinDialog = () => {
	endGameDialog.style.display = 'none';
}

const showEvenDialog = () => {
	showWinDialog('e');
}

const changeTurn = () => {
	changeBg();
	turnViewer.classList.remove('x', 'o')
	if (turn === 'x')
		turn = 'o';
	else turn = 'x';
	turnViewer.classList.add(turn);
	move++;
	console.log(move)
	if (move === 9) {
		showEvenDialog();
	}
}

function resetGameSpace() {
	key_r1c1.classList.remove('x', 'o')
	key_r1c2.classList.remove('x', 'o')
	key_r1c3.classList.remove('x', 'o')
	key_r2c1.classList.remove('x', 'o')
	key_r2c2.classList.remove('x', 'o')
	key_r2c3.classList.remove('x', 'o')
	key_r3c1.classList.remove('x', 'o')
	key_r3c2.classList.remove('x', 'o')
	key_r3c3.classList.remove('x', 'o')
	r1c1_value = null;
	r1c2_value = null;
	r1c3_value = null;
	r2c1_value = null;
	r2c2_value = null;
	r2c3_value = null;
	r3c1_value = null;
	r3c2_value = null;
	r3c3_value = null;
	move = 0;

	quitBtn.classList.remove('bg-light-blue', 'bg-grey');
	endGameDialogContent.classList.remove('color-orange', 'color-light-blue', 'color-grey', 'x', 'o', 'e');
	nextRoundBtn.classList.remove('bg-orange', 'bg-light-blue', 'bg-orange')
	hideWinDialog();
}

const winActions = () => {
	showWinDialog(turn);
	move = 0
}


key_r1c1.addEventListener('click', () => {
	if (r1c1_value === null) {
		r1c1_value = turn
		key_r1c1.classList.add(turn)
		if (row1Complete() || column1Complete() || x1Complete())
			winActions();
		changeTurn();
	}
});
key_r1c2.addEventListener('click', () => {
	if (r1c2_value == null) {
		r1c2_value = turn
		key_r1c2.classList.add(turn)
		if (row1Complete() || column2Complete())
			winActions();
		changeTurn();
	}
});
key_r1c3.addEventListener('click', () => {
	if (r1c3_value === null) {
		r1c3_value = turn
		key_r1c3.classList.add(turn)
		if (row1Complete() || column3Complete() || x2Complete())
			winActions();
		changeTurn();
	}
});
key_r2c1.addEventListener('click', () => {
	if (r2c1_value === null) {
		r2c1_value = turn
		key_r2c1.classList.add(turn)
		if (row2Complete() || column1Complete())
			winActions();
		changeTurn();
	}
});
key_r2c2.addEventListener('click', () => {
	if (r2c2_value === null) {
		r2c2_value = turn
		key_r2c2.classList.add(turn)
		if (row2Complete() || column2Complete() || x1Complete() || x2Complete())
			winActions();
		changeTurn();
	}
});
key_r2c3.addEventListener('click', () => {
	if (r2c3_value === null) {
		r2c3_value = turn
		key_r2c3.classList.add(turn)
		if (row2Complete() || column3Complete())
			winActions();
		changeTurn();
	}
});
key_r3c1.addEventListener('click', () => {
	if (r3c1_value === null) {
		r3c1_value = turn
		key_r3c1.classList.add(turn)
		if (row3Complete() || column1Complete() || x2Complete())
			winActions();
		changeTurn();
	}
});
key_r3c2.addEventListener('click', () => {
	if (r3c2_value === null) {
		r3c2_value = turn
		key_r3c2.classList.add(turn)
		if (row3Complete() || column2Complete())
			winActions();
		changeTurn();
	}
});
key_r3c3.addEventListener('click', () => {
	if (r3c3_value === null) {
		r3c3_value = turn
		key_r3c3.classList.add(turn)
		if (row3Complete() || column3Complete() || x1Complete())
			winActions();
		changeTurn();
	}
});

nextRoundBtn.addEventListener('click', resetGameSpace)


const changeBg = () => {
	flowingElements.forEach(e =>{
		e.style.top  = `${Math.random() * 100}%`;
		e.style.left  = `${Math.random() * 100}%`;
		e.style.fontSize = `${Math.random() * 8+1}rem`;

		e.style.rotateX  = `${Math.random() * 100}deg`;
	})
}

const flowingElements = []
const body = document.body;
const createBg = () => {
	for (let i = 0; i < 10; i++) {
		let element = document.createElement('span');
		// element.style.position = 'absolute';
		element.style.top  = `${Math.random() * 100}%`;
		element.style.left  = `${Math.random() * 100}%`;
		element.style.fontSize = `${Math.random() * 8+1}rem`;
		element.innerText = 'x';
		element.classList.add('x-bg')
		body.prepend(element)
		flowingElements.push(element)

		element = document.createElement('span');
		// element.style.position = 'absolute';
		element.style.top  = `${Math.random() * 100}%`;
		element.style.left  = `${Math.random() * 100}%`;
		element.style.fontSize = `${Math.random() * 8+1}rem`;
		element.innerText= 'o'
		element.classList.add('o-bg')
		body.prepend(element)
		flowingElements.push(element)
	}
	// setInterval(changeBg, 5000)
}

createBg();
