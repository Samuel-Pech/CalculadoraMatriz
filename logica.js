function createMatrixInput(matrixId, rows, cols) {
    const matrixElement = document.getElementById(matrixId);

    matrixElement.innerHTML = ""; 

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.value = "0";
            input.addEventListener("click", function () {
                if (this.value === "0") {
                    this.value = "";
                }
            });
            cell.appendChild(input);
            row.appendChild(cell);
        }

        matrixElement.appendChild(row);
    }
}

function getMatrixValues(matrixId) {
    const matrixElement = document.getElementById(matrixId);
    const rows = matrixElement.rows;
    const matrix = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const row = [];

        for (let j = 0; j < cells.length; j++) {
            const value = parseFloat(cells[j].querySelector("input").value);
            row.push(isNaN(value) ? 0 : value);
        }

        matrix.push(row);
    }

    return matrix;
}

function displayMatrix(matrixId, matrix) {
    const matrixElement = document.getElementById(matrixId);
    matrixElement.innerHTML = "";

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }

        matrixElement.appendChild(row);
    }
}

function displaySteps(stepsId, steps) {
    const stepsElement = document.getElementById(stepsId);
    stepsElement.innerHTML = "";

    steps.forEach((step, index) => {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = `Paso ${index + 1}: ${step.operation} = ${step.elements.join(" + ")} = ${step.result}`;
        row.appendChild(cell);
        stepsElement.appendChild(row);
    });
}

function displayError(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
}

function updateMatrix(matrixId) {
    const structure = document.getElementById(`structure${matrixId.charAt(matrixId.length - 1)}`).value.split("x");
    const rows = parseInt(structure[0]);
    const cols = parseInt(structure[1]);

    createMatrixInput(matrixId, rows, cols);
}

function performOperation() {
    const matrixA = getMatrixValues("matrixA");
    const matrixB = getMatrixValues("matrixB");

    if (!isMultiplicationCompatible(matrixA, matrixB)) {
        displayError("No se puede resolver esta ecuación. Las matrices no son compatibles para la multiplicación.");
        return;
    }

    const resultMatrix = multiplyMatrices(matrixA, matrixB);
    displayMatrix("result", resultMatrix);
    displaySteps("steps", multiplySteps(matrixA, matrixB));
    displayError("");
}

function isMultiplicationCompatible(matrixA, matrixB) {
    return matrixA[0].length === matrixB.length;
}

function multiplyMatrices(matrixA, matrixB) {
    const resultMatrix = new Array(matrixA.length).fill(null).map(() => new Array(matrixB[0].length).fill(0));

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
            for (let k = 0; k < matrixA[0].length; k++) {
                resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return resultMatrix;
}

function multiplySteps(matrixA, matrixB) {
    const steps = [];

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
            const step = {
                operation: `Celda [${i + 1}, ${j + 1}]`,
                elements: [],
                result: 0
            };

            for (let k = 0; k < matrixA[0].length; k++) {
                step.elements.push(`(${matrixA[i][k]} * ${matrixB[k][j]})`);
                step.result += matrixA[i][k] * matrixB[k][j];
            }

            steps.push(step);
        }
    }

    return steps;
}
function resetPage() {
    location.reload(); // Recargar la página
}

createMatrixInput("matrixA", 2, 2);
createMatrixInput("matrixB", 2, 2);