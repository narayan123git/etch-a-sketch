const grid = document.getElementById('grid');
const resizeBtn = document.getElementById('resize');
const clearBtn = document.getElementById('clear');
const blackBtn = document.getElementById('black');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let currentMode = 'black';
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('mouseover', changeColor);
    cell.addEventListener('mousedown', changeColor);
    grid.appendChild(cell);
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;

  const size = parseInt(brushSize.value, 10);
  const cell = e.target;
  const cells = Array.from(grid.children);
  const gridSize = Math.sqrt(cells.length);
  const index = cells.indexOf(cell);
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  // Color a square of cells based on brush size
  for (let dr = -Math.floor(size / 2); dr <= Math.floor(size / 2); dr++) {
    for (let dc = -Math.floor(size / 2); dc <= Math.floor(size / 2); dc++) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        const idx = r * gridSize + c;
        const targetCell = cells[idx];
        if (currentMode === 'black') {
          targetCell.style.backgroundColor = '#000';
        } else if (currentMode === 'rainbow') {
          const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
          targetCell.style.backgroundColor = randomColor;
        } else if (currentMode === 'eraser') {
          targetCell.style.backgroundColor = '#fff';
        } else if (currentMode === 'color') {
          targetCell.style.backgroundColor = colorPicker.value;
        }
      }
    }
  }
}

resizeBtn.addEventListener('click', () => {
  const newSize = prompt('Enter new grid size (e.g., 16):');
  if (newSize) createGrid(newSize);
});

clearBtn.addEventListener('click', () => {
  const cells = grid.querySelectorAll('div');
  cells.forEach(cell => (cell.style.backgroundColor = '#fff'));
});

blackBtn.addEventListener('click', () => (currentMode = 'black'));
rainbowBtn.addEventListener('click', () => (currentMode = 'rainbow'));
eraserBtn.addEventListener('click', () => (currentMode = 'eraser'));
colorPicker.addEventListener('input', () => (currentMode = 'color'));

createGrid(16);
