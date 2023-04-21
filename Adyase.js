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
    console.log(matrizConValores);
    return matrizConValores;

}


