let words = ['CABALLO', 'CASA', 'PERRO', 'GATO', 'AUTO']; // Lista de palabras
let wordLetters = []; // Letras de la palabra actual
let attempts = 5; // Intentos restantes
let guessedLetters = new Set(); // Letras adivinadas
let wrongLetters = new Set(); // Letras incorrectas

const wordElement = document.getElementById('word');
const attemptsElement = document.getElementById('attempts');
const buttons = document.querySelectorAll('#buttons button');
const newGameButton = document.getElementById('newGame');
const wrongGuessesElement = document.getElementById('wrongGuesses');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

newGameButton.addEventListener('click', startNewGame);

initializeGame();

function initializeGame() {
    attempts = 5; // Reiniciar intentos
    attemptsElement.textContent = `Te quedan ${attempts} intentos`;
    selectWord(); // Seleccionar nueva palabra
    renderWord(); // Renderizar palabra oculta
    guessedLetters.clear(); // Limpiar letras adivinadas
    wrongLetters.clear(); // Limpiar letras incorrectas
    wrongGuessesElement.textContent = ''; // Limpiar letras incorrectas mostradas
    resetCanvas(); // Limpiar el canvas

    buttons.forEach(button => {
        if (!wrongLetters.has(button.textContent)) { // Si la letra no es incorrecta
            button.disabled = false; // Habilitar botón
        }
        button.addEventListener('click', handleButtonClick);
    });
}

function selectWord() {
    let randomIndex = Math.floor(Math.random() * words.length); // Obtener índice aleatorio
    wordLetters = words[randomIndex].split(''); // Separar palabra en letras
}

function renderWord() {
    wordElement.innerHTML = ''; // Limpiar contenido anterior
    wordLetters.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = guessedLetters.has(letter) ? letter : '_';
        wordElement.appendChild(letterElement);
        wordElement.appendChild(document.createTextNode(' '));
    });
}


function handleButtonClick(event) {
    let letter = event.target.textContent; // Obtener letra del botón
    event.target.disabled = true; // Deshabilitar botón

    if (!wordLetters.includes(letter)) { // Si la letra no está en la palabra
        attempts--; // Reducir intentos
        attemptsElement.textContent = `Te quedan ${attempts} intentos`;
        wrongLetters.add(letter); // Agregar letra a incorrectas
        displayWrongGuesses(); // Mostrar letras incorrectas
        drawHangman(); // Dibujar parte del ahorcado

        if (attempts === 0) { // Si se acabaron los intentos
            alert('¡Perdiste! La palabra era: ' + wordLetters.join(''));
            startNewGame();
        }
    }

    guessedLetters.add(letter); // Ag
}

function checkGameEnd() {
    if (wordLetters.every(letter => guessedLetters.has(letter))) { // Si se adivinaron todas las letras
        alert('¡Ganaste!');
        startNewGame();
    }
}

function startNewGame() {
    initializeGame(); // Reiniciar el juego
}

function displayWrongGuesses() {
    wrongGuessesElement.textContent = 'Letras incorrectas: ' + Array.from(wrongLetters).join(', ');
}

function drawHangman() {
    const hangmanParts = [
        () => drawHead(),
        () => drawBody(),
        () => drawLeftArm(),
        () => drawRightArm(),
        () => drawLeftLeg(),
        () => drawRightLeg(),
    ];

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    hangmanParts[4 - attempts](); // Dibuja la parte correspondiente del ahorcado
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(200, 100, 20, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(200, 200);
    ctx.stroke();
}

function drawLeftArm() {
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(160, 160);
    ctx.stroke();
}

function drawRightArm() {
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(240, 160);
    ctx.stroke();
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(180, 240);
    ctx.stroke();
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(220, 240);
    ctx.stroke();
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
}

