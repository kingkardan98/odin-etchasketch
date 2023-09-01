document.addEventListener('DOMContentLoaded', () => {
    // Declaring maximum dimensions for canvas.
    const MAX_COLUMNS = 50;
    const MAX_ROWS = 50;

    function createCanvas(rows, columns) {
        // Define the canvas where the rows will be appended.
        let canvas = document.querySelector('#canvas');

        // If it has children, this deletes them.
        canvas.innerHTML = '';

        // Define cell dimensions.
        let cellHeight = `height: calc(500px/${rows});`;
        let cellWidth = `width: calc(800px/${columns});`;

        for (let i = 0; i < rows; i++){
            // First, we iterate through the rows.
            let row = document.createElement('div');

            // This forces rows to touch vertically, since it sets the height of the row exactly as the height of the cell.
            row.style.cssText =  cellHeight;

            // No CSS on row class, just a nice distinguishing characteristic when inspecting the page.
            row.classList.add('row');

            // For every row, we add columns. We style them accordingly.
            for (let j = 0; j < columns; j++) {
                let cell = document.createElement('div');

                // Apply CSS class cell.
                cell.classList.add('cell');

                // Set dimensions.
                cell.style.cssText = cellWidth + ' ' + cellHeight;

                // It's much easier to create a listener right when we create the canvas, instead of doing it later.
                cell.addEventListener('mouseover', () => {
                    if (cell.style.backgroundColor === '') {
                        cell.style.backgroundColor = color;
                    }
                })
                // First, append every cell to the row.
                row.appendChild(cell);
            }
            // Append row.
            canvas.appendChild(row);

            // Rinse and repeat, brother.
        }
    }

    function newCanvas() {
        // When the newCanvas button is clicked, we prompt the user for the new number of rows and columns of the canvas.
        // We must get integer values, so we check for that.
        let rows = parseInt(prompt('Insert new number of rows'));
        while (Number.isNaN(rows) || rows > MAX_ROWS) {
            rows = parseInt(prompt('The number of rows must be an integer less than ' + MAX_ROWS + '. Insert new number of rows'));
        }

        let columns = parseInt(prompt('Insert new number of columns'));
        while (Number.isNaN(columns) || columns > MAX_COLUMNS) {
            columns = parseInt(prompt('The number of columns must be an integer less than ' + MAX_COLUMNS + '. Insert new number of rows'));
        }

        // Alright, now we know the values are integers. Cool, let's create a new canvas.
        createCanvas(rows, columns);
    }

    function eraseCanvas() {
        // Setting the color of all the cells to empty functionally erases contents.
        let allCells = document.querySelectorAll('.cell');
        allCells.forEach(element => {
            element.style.backgroundColor = '';
        });
    }

    function changeColor() {
        let colorSelect = document.querySelector('#colors')

        // Acts upon global variable.
        color = colorSelect.value;
    }

    // These are the only global variables. Pretty proud of myself.
    let newCanvasButton = document.querySelector('#new');
    let eraseButton = document.querySelector('#erase');

    // Variable that stores which color to insert in a cell.
    let colorSelect = document.querySelector('#colors')
    let color = colorSelect.value;
    colorSelect.addEventListener('change', () => {changeColor()});

    newCanvasButton.addEventListener('click', () => {newCanvas()});
    eraseButton.addEventListener('click', () => {eraseCanvas()});

    // Initial canvas. Removed global variables, so I don't risk shadowing.
    createCanvas(4, 4);
})