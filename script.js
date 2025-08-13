const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const puzzleScreen = document.getElementById('puzzle-screen');

const puzzleContainer = document.getElementById('puzzle-container');
const checkPuzzleBtn = document.getElementById('check-puzzle-btn');
const puzzleMessage = document.getElementById('puzzle-message');

const sonidoVictoria = document.getElementById('sonidoVictoria');
const sonidoMover = document.getElementById('sonidoMover');

const puzzleOrder = [0,1,2,3,4,5,6,7,8];
let currentOrder = [];

// Cambiar de pantalla
startBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  puzzleScreen.classList.remove('hidden');
  generatePuzzle();
});

// Mezclar array
function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generar puzzle
function generatePuzzle() {
    puzzleContainer.innerHTML = '';
    currentOrder = shuffle([...puzzleOrder]);
  
    currentOrder.forEach((pos, index) => {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
  
      const x = (pos % 3) * -100;
      const y = Math.floor(pos / 3) * -100;
      piece.style.backgroundPosition = `${x}px ${y}px`;
  
      piece.setAttribute('draggable', 'true');
      piece.dataset.index = pos; // número real de la pieza
      puzzleContainer.appendChild(piece);
    });
  
    let dragged = null;
  
    puzzleContainer.addEventListener('dragstart', e => {
      dragged = e.target;
      sonidoMover.currentTime = 0;
      sonidoMover.play();
    });
  
    puzzleContainer.addEventListener('dragover', e => e.preventDefault());
  
    puzzleContainer.addEventListener('drop', e => {
      e.preventDefault();
      const target = e.target;
      if (!target.classList.contains('puzzle-piece') || target === dragged) return;
  
      // Intercambiar piezas
      const draggedNext = dragged.nextSibling;
      const targetNext = target.nextSibling;
  
      puzzleContainer.insertBefore(dragged, targetNext);
      puzzleContainer.insertBefore(target, draggedNext);
    });
  }
  
  

// Verificar puzzle
checkPuzzleBtn.addEventListener('click', () => {
    const pieces = Array.from(puzzleContainer.children);
    const correct = pieces.every((piece, i) => parseInt(piece.dataset.index) === i);
  
    if (correct) {
      puzzleMessage.textContent = "¡Correcto! Tu primera pista es: 'USA ROT13'.";
      sonidoVictoria.play();
      pieces.forEach(p => p.classList.add('victoria'));

       // Mostrar el segundo reto
       showCodex(); // <-- aquí
       
    } else {
      puzzleMessage.textContent = "Todavía no está correcto. Intenta reorganizar las piezas.";
    }
  });
  



  //SEGUNDO RETO
  const codexSection = document.getElementById('codex-section');
  const codexMessage = document.getElementById('codex-message');
  const codexInput = document.getElementById('codex-input');
  const codexCheckBtn = document.getElementById('codex-check-btn');
  const codexFeedback = document.getElementById('codex-feedback');
  
  // Función rot13 para descifrar
  /*function rot13(str) {
    return str.replace(/[A-Z]/gi, c =>
      String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      )
    );
  }*/
 // Función ROT13 más clara
 function rot13(str) {
    return str.replace(/[A-Z]/gi, c => {
      const code = c.charCodeAt(0);
      // Mayúsculas
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      } 
      // Minúsculas
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      } 
      else {
        return c; // deja espacios y símbolos
      }
    });
  }
  
  
  // Mostrar sección tras completar el rompecabezas
  function showCodex() {
    codexSection.classList.remove('hidden');
  }
  
  function normalize(s) {
    return s
      .normalize("NFD")             // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .replace(/\s+/g, " ")         // múltiples espacios → 1
      .trim()
      .toUpperCase();               // convierte todo a mayúsculas
  }
  


  // Comprobar respuesta// Frase descifrada correcta
const correctAnswer = "LA HISTORIA COBRA VIDA";

codexCheckBtn.addEventListener('click', () => {
    const userAnswer = normalize(codexInput.value);
    
    if (userAnswer === normalize(correctAnswer)) {
      codexFeedback.textContent = "¡Correcto! Has desbloqueado la pista del sombrero.";
      codexFeedback.style.color = 'green';

    // Mostrar el tercer desafío
    showThirdChallenge();

    } else {
      codexFeedback.textContent = "No es correcto. Intenta descifrar el mensaje nuevamente.";
      codexFeedback.style.color = 'red';
    }
});


// TERCER RETO

// Elementos
const thirdChallengeSection = document.getElementById('third-challenge-section');
const thirdChallengeInput = document.getElementById('third-challenge-input');
const thirdChallengeCheckBtn = document.getElementById('third-challenge-check-btn');
const thirdChallengeFeedback = document.getElementById('third-challenge-feedback');

// Mostrar el tercer desafío
function showThirdChallenge() {
    thirdChallengeSection.classList.remove('hidden');
}
// Función para normalizar texto (quitar acentos y espacios extras)
function normalizeText(str) {
    return str
        .normalize("NFD")                  // separa los acentos
        .replace(/[\u0300-\u036f]/g, "") // elimina acentos
        .replace(/\s+/g, " ")             // múltiples espacios → 1
        .trim()
        .toLowerCase();
}
// Comprobar respuesta
thirdChallengeCheckBtn.addEventListener('click', () => {
    const answer = normalizeText(thirdChallengeInput.value);
    const correctAnswer = normalizeText("El sueño de Toledo"); // normalizamos también

    if (answer === correctAnswer) {
        thirdChallengeFeedback.textContent = "¡Correcto! Has completado todos los desafíos.";
        thirdChallengeFeedback.style.color = 'green';
    } else {
        thirdChallengeFeedback.textContent = "No es correcto. Intenta nuevamente.";
        thirdChallengeFeedback.style.color = 'red';
    }
});
