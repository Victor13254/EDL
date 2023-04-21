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
}
