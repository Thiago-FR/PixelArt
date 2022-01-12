const cores = document.getElementsByClassName('color');
const input = document.getElementById('board-size');
const corPalet = document.getElementById('color-palette');
const btnGerarPalet = document.getElementById('gerar-palet');
const inputGerarPalet = document.getElementById('input-gerar-palet');
const minumum = 5;
const maximum = 33;
const minumumPalet = 5;
const maximumPalet = 10;
const rgb = 'rgb(255,255,255)';
let qtdPalet = minumumPalet;

const quadroPixel = document.getElementById('pixel-board');
const btn = document.querySelector('#clear-board');
const btnGerar = document.querySelector('#generate-board');

function createBox(linhas, colunas) {
  for (let index = 0; index < linhas.length; index += 1) {
    for (let j = 0; j < colunas; j += 1) {
      const positionLine = linhas[index];
      const divGrid = document.createElement('div');
      divGrid.className = 'pixel';
      positionLine.appendChild(divGrid);
    }
  }
}

function gerarPaletCores(number) {
  for(let index = 0; index < number; index += 1) {
    const div = document.createElement('div');
    div.className = 'color';
    corPalet.appendChild(div);
  }
}

function removeAll() {
  while (quadroPixel.firstChild) {
    quadroPixel.removeChild(quadroPixel.lastChild);
  }
}

function numberLines(number) {
  removeAll();
  for (let index = 0; index < number; index += 1) {
    const div = document.createElement('div');
    div.className = 'line';
    quadroPixel.appendChild(div);
  }
  const lines = document.querySelectorAll('.line');
  createBox(lines, number);
}

function verificaInput() {
  if (input.value === '') {
    return minumum;
  }
  return input.value;
}

numberLines(minumum);

btnGerar.addEventListener('click', () => {
  let numberOfLines = input.value;
  if (numberOfLines === '') {
    alert('Board inválido!');
  }
  if (numberOfLines < minumum) {
    numberOfLines = minumum;
    input.value = minumum;
  }
  if (numberOfLines > maximum) {
    numberOfLines = maximum;
    input.value = maximum;
  }
  numberLines(numberOfLines);
});

function trocaCor(event) {
  const techElement = document.querySelector('.selected');
  techElement.classList.remove('selected');
  event.target.classList.add('selected');
}

function pintaGrid(event) {
  const colorDiv = document.querySelectorAll('.color');
  for (let index = 0; index < colorDiv.length; index += 1) {
    if (colorDiv[index].className === 'color selected') {
      const selectCor = colorDiv[index].style.background;
      const color = event.target;
      color.style.background = selectCor;
    }
  }
}

function boxClear() {
  const lines = document.querySelectorAll('.line');
  const pixelTotal = verificaInput() * verificaInput();
  for (let index = 0; index < lines.length; index += 1) {
    const clearDiv = document.querySelectorAll('.line');
    clearDiv[index].style.background = rgb;
  }
  for (let j = 0; j < pixelTotal; j += 1) {
    const box = document.querySelectorAll('.pixel');
    box[j].style.background = rgb;
  }
}

function clearQuadro() {
  quadroPixel.style.background = rgb;
  boxClear();
}

function gerandoBotoesCores(number) {
  for (let index = 0; index < number; index += 1) {
    cores[index].addEventListener('click', trocaCor);
  }
}

quadroPixel.addEventListener('click', pintaGrid);

btn.addEventListener('click', clearQuadro);

function gerarCor(opacidade = 1) {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

function gerandoCores(number) {
  cores[0].style.background = 'black';
  cores[0].className = 'color selected';
  for (let index = 1; index < number; index += 1) {
    cores[index].style.background = gerarCor();
  }
}

function removeAllPalet() {
  while (corPalet.lastChild.previousElementSibling) {
    corPalet.removeChild(corPalet.lastChild);
  }
}

function gerandoPaletCore() {
  removeAllPalet();
  gerarPaletCores(qtdPalet - 1);
  gerandoBotoesCores(qtdPalet);
  gerandoCores(qtdPalet);
}

btnGerarPalet.addEventListener('click', () => {
  let numPaletCores = inputGerarPalet.value;
  if (numPaletCores === '') {
    alert('Board inválido!');
  }
  if (numPaletCores < minumumPalet) {
    numPaletCores = minumumPalet;
    inputGerarPalet.value = minumumPalet;
  }
  if (numPaletCores > maximumPalet) {
    numPaletCores = maximumPalet;
    inputGerarPalet.value = maximumPalet;
  }

  qtdPalet = inputGerarPalet.value;
  gerandoPaletCore();
});

gerarPaletCores(qtdPalet - 1);
gerandoBotoesCores(qtdPalet);
gerandoCores(qtdPalet);
