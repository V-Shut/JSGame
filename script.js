class Game {
  constructor(figures) {
    this.items = figures;
  }

  printMatrix() {
    console.log(this.items.map((row) => row.join(" ")).join("\n"));
  }

  detectGroup(line, index) {
    const rowLength = this.items[0].length;
    const columnLength = this.items.length;

    if (line >= columnLength || line < 0 || index >= rowLength || index < 0) {
      throw new Error("Item does not exist");
    }

    const choosedItem = this.items[line][index];
    if (choosedItem === null) {
      return;
    }

    this.items[line][index] = null;

    const stack = [[line, index]];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();

      directions.forEach(([dRow, dCol]) => {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (
          newRow >= 0 &&
          newRow < columnLength &&
          newCol >= 0 &&
          newCol < rowLength &&
          this.items[newRow][newCol] === choosedItem
        ) {
          this.items[newRow][newCol] = null;
          stack.push([newRow, newCol]);
        }
      });
    }

    this.render();
  }

  render() {
    const table = document.getElementById("game");
    table.innerHTML = "";
    this.items.forEach((data) => {
      const row = document.createElement("tr");

      data.forEach((cellValue, index) => {
        const cell = document.createElement("td");
        cell.textContent = cellValue;
        row.appendChild(cell);
        cell.addEventListener("click", () => {
          this.detectGroup(this.items.indexOf(data), index);
        });
      });

      table.appendChild(row);
    });
  }
}

const game = new Array(7).fill([]).map((_el) => {
  const array = [];
  const spades = String.fromCharCode(0x2660);
  const hearts = String.fromCharCode(0x2665);
  const diamonds = String.fromCharCode(0x2666);
  const clubs = String.fromCharCode(0x2663);

  for (let i = 0; i < 6; i++) {
    array.push(Math.round(Math.random() * 3 + 1));
  }

  return array.map((item) => {
    switch (item) {
      case 1:
        return spades;

      case 2:
        return hearts;

      case 3:
        return diamonds;

      case 4:
        return clubs;

      default:
        return null;
    }
  });
});

const specimen = new Game(game);
console.log(specimen.items);
specimen.render();
