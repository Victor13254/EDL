function crearMatrizVacia(nodos) {
    const matriz = [];
    nodos.forEach(nodo => {
        matriz[nodo.id] = Array(nodos.length + 1).fill(0);
    });
    return matriz;
}

// Función para agregar los valores de costo a la matriz de adyacencia
function agregarValores(matriz, nodos, aristas) {
    aristas.forEach(arista => {
        const fila = arista.from;
        const columna = arista.to;
        const costo = parseInt(arista.time);
        matriz[fila][columna] = costo;
    });
    return matriz;
}

// Crear la matriz de adyacencia a partir de la entrada
function MatrizA() {
    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const aristas = graph.edges
    const nodos = graph.nodes
    const matrizVacia = crearMatrizVacia(nodos);
    const matrizConValores = agregarValores(matrizVacia, nodos, aristas);

    console.table(matrizConValores);
    addTable(matrizConValores);

}
function addTable(matrizConValores) {
    const matriz = matrizConValores;
    const myTableDiv = document.getElementById("metric_results")
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
    for (i = 1; i < stock.length; i++) {
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

