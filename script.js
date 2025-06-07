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



//for smooth drawing
// const canvas = document.getElementById('etchCanvas');
// const ctx = canvas.getContext('2d');
// const resizeBtn = document.getElementById('resize');
// const clearBtn = document.getElementById('clear');
// const blackBtn = document.getElementById('black');
// const rainbowBtn = document.getElementById('rainbow');
// const eraserBtn = document.getElementById('eraser');
// const colorPicker = document.getElementById('colorPicker');
// const brushSize = document.getElementById('brushSize');

// let currentMode = 'black';
// let drawing = false;
// let lastX = 0;
// let lastY = 0;

// canvas.addEventListener('mousedown', (e) => {
//   drawing = true;
//   [lastX, lastY] = getCanvasCoords(e);
//   drawCircle(lastX, lastY);
// });
// canvas.addEventListener('mouseup', () => drawing = false);
// canvas.addEventListener('mouseleave', () => drawing = false);
// canvas.addEventListener('mousemove', (e) => {
//   if (!drawing) return;
//   const [x, y] = getCanvasCoords(e);
//   drawLine(lastX, lastY, x, y);
//   [lastX, lastY] = [x, y];
// });

// function getCanvasCoords(e) {
//   const rect = canvas.getBoundingClientRect();
//   return [
//     e.clientX - rect.left,
//     e.clientY - rect.top
//   ];
// }

// function drawCircle(x, y) {
//   ctx.beginPath();
//   ctx.arc(x, y, brushSize.value / 2, 0, Math.PI * 2);
//   ctx.fillStyle = getBrushColor();
//   ctx.globalCompositeOperation = (currentMode === 'eraser') ? 'destination-out' : 'source-over';
//   ctx.fill();
// }

// function drawLine(x1, y1, x2, y2) {
//   ctx.save();
//   ctx.lineCap = 'round';
//   ctx.lineJoin = 'round';
//   ctx.strokeStyle = getBrushColor();
//   ctx.globalCompositeOperation = (currentMode === 'eraser') ? 'destination-out' : 'source-over';
//   ctx.lineWidth = brushSize.value;
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();
//   ctx.restore();
// }

// function getBrushColor() {
//   if (currentMode === 'black') return '#000';
//   if (currentMode === 'rainbow') return `hsl(${Math.random() * 360}, 100%, 50%)`;
//   if (currentMode === 'eraser') return '#fff';
//   if (currentMode === 'color') return colorPicker.value;
//   return '#000';
// }

// resizeBtn.addEventListener('click', () => {
//   const newSize = prompt('Enter new canvas size in px (e.g., 600):');
//   if (newSize) {
//     canvas.width = canvas.height = parseInt(newSize, 10);
//     clearCanvas();
//   }
// });

// clearBtn.addEventListener('click', clearCanvas);

// function clearCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = '#fff';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// blackBtn.addEventListener('click', () => currentMode = 'black');
// rainbowBtn.addEventListener('click', () => currentMode = 'rainbow');
// eraserBtn.addEventListener('click', () => currentMode = 'eraser');
// colorPicker.addEventListener('input', () => currentMode = 'color');

// // Initialize canvas with white background
// clearCanvas();
