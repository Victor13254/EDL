function MatrizI() {
    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const nodes = graph.nodes;
    const edges = graph.edges;

    // Obtener el número de nodos y de aristas
    const numNodes = nodes.length;
    const numEdges = edges.length;

    // Crear la matriz de incidencia
    const incidenceMatrix = [];

    // Para cada nodo, crear una fila en la matriz de incidencia
    for (let i = 0; i < numNodes; i++) {
        incidenceMatrix[i] = [];

        // Para cada arista, verificar si el nodo actual es el origen o el destino
        for (let j = 0; j < numEdges; j++) {
            const edge = edges[j];

            if (edge.from === nodes[i].id) {
                // Si el nodo es el origen, poner un -1 en la columna correspondiente
                incidenceMatrix[i][j] = -1;
            } else if (edge.to === nodes[i].id) {
                // Si el nodo es el destino, poner un 1 en la columna correspondiente
                incidenceMatrix[i][j] = 1;
            } else {
                // Si el nodo no está involucrado en la arista, poner un 0 en la columna correspondiente
                incidenceMatrix[i][j] = 0;
            }
        }
    }

    console.table(incidenceMatrix);
    addTables(incidenceMatrix);
}
function addTables(incidenceMatrix) {
    const matriz = incidenceMatrix;
    const myTableDiv = document.getElementById("matric_results")
    const table = document.createElement('TABLE')
    const tableBody = document.createElement('TBODY')

    table.border = '1'
    table.appendChild(tableBody);

    let heading = new Array();
    let stock = new Array();

    for (x=0;x<matriz.length;x++) {
        heading.push(x);
    }
    for (x=0;x<matriz.length;x++) {
        for (y=0;y<matriz.length;y++) {
            stock[y] = new Array(matriz[x]);
        }
    }
//COLUMNAS DE LA TABLA
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

//FILAS DE LA TABLA
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        console.log(i,stock);
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table)
}

