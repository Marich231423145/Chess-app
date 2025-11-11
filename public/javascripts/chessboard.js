document.addEventListener('DOMContentLoaded', () => {
  const piecesUnicode = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
  };

  function renderChessboard(fen, pov) {
    const container = document.getElementById('chessboard-container');
    container.innerHTML = '';

    const ranks = ['1','2','3','4','5','6','7','8'];
    const files = ['A','B','C','D','E','F','G','H'];

    const rowOrder = (pov === 'white') ? [...ranks].reverse() : [...ranks];
    const colOrder = (pov === 'white') ? files : [...files].reverse();

    const rowsFEN = fen.split('/');

    for (let rIndex = 0; rIndex < rowOrder.length; rIndex++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';

      let fenRow = rowsFEN[rIndex];
      let fIndex = 0;

      for (let ch of fenRow) {
        if (!isNaN(ch)) {
          let emptySquares = parseInt(ch);
          for (let i = 0; i < emptySquares; i++) {
            const square = document.createElement('span');

            const rowIdx = (pov === 'white') ? rIndex : 7 - rIndex;
            const colIdx = (pov === 'white') ? fIndex : 7 - fIndex;
            const isWhite = (rowIdx + colIdx) % 2 === 0;

            square.className = isWhite ? 'white-cell' : 'black-cell';
            square.style.position = 'relative';

            // добавляем координату в угол
            const coord = document.createElement('div');
            coord.textContent = colOrder[fIndex] + rowOrder[rIndex];
            coord.style.position = 'absolute';
            coord.style.top = '2px';
            coord.style.left = '2px';
            coord.style.fontSize = '0.7em';
            coord.style.color = isWhite ? 'black' : 'white';
            square.appendChild(coord);

            rowDiv.appendChild(square);
            fIndex++;
          }
        } else {
          const square = document.createElement('span');

          const rowIdx = (pov === 'white') ? rIndex : 7 - rIndex;
          const colIdx = (pov === 'white') ? fIndex : 7 - fIndex;
          const isWhite = (rowIdx + colIdx) % 2 === 0;

          square.className = isWhite ? 'white-cell' : 'black-cell';
          square.style.position = 'relative';
          square.textContent = piecesUnicode[ch];

          // добавляем координату в угол
          const coord = document.createElement('div');
          coord.textContent = colOrder[fIndex] + rowOrder[rIndex];
          coord.style.position = 'absolute';
          coord.style.top = '2px';
          coord.style.left = '2px';
          coord.style.fontSize = '0.7em';
          coord.style.color = isWhite ? 'black' : 'white';
          square.appendChild(coord);

          rowDiv.appendChild(square);
          fIndex++;
        }
      }

      container.appendChild(rowDiv);
    }
  }

  const startFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  const povSelect = document.getElementById('pov-select');

  renderChessboard(startFEN, povSelect.value);

  povSelect.addEventListener('change', () => {
    renderChessboard(startFEN, povSelect.value);
  });
});
