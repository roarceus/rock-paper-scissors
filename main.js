const selectionButtons = document.querySelectorAll('[data-selection]');
const playButtons = document.querySelector('.selections');
const results = document.querySelector('.results')
const restartContainer = document.querySelector('.restart-container');
const restartBtn = document.querySelector('.restart-btn');
const historyContainer = document.querySelector('.history-title');
const history = document.querySelector('.history-result');
const yourScore = document.querySelector('[data-your-score]');
const computerScore = document.querySelector('[data-computer-score]');


playButtons.addEventListener('click', e => {
    results.classList.remove('hidden');
    restartContainer.classList.remove('hidden');
    historyContainer.classList.remove('hidden');
})

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '🗿',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🧻',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✂️',
        beats: 'paper'
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection)
    })
});

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);
    if (yourWinner) incrementScore(yourScore)
    if(computerWinner) incrementScore(computerScore)
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection', 'mb-4');
    if (winner) div.classList.add('winner');
    history.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function incrementScore(score) {
    score.innerText = parseInt(score.innerText) + 1;
}

function resetScore(score) {
    score.innerText = parseInt(score.innerText) - parseInt(score.innerText);
}

restartBtn.addEventListener('click', e => {
    resetScore(yourScore);
    resetScore(computerScore);
    results.classList.add('hidden');
    historyContainer.classList.add('hidden');
    // historyContainer.innerText = "";
    restartContainer.classList.add('hidden');
})