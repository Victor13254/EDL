function dijkstra() {
    const graph = {};
    var start = parseInt(document.getElementById("nodoI").value);
    var end = parseInt(document.getElementById("nodoF").value);
    // Convertir la entrada en un grafo válido
    const entrada = { nodes: data.nodes.get(), edges: data.edges.get() };
    entrada.nodes.forEach(node => {
        graph[node.id] = {};
    });
    entrada.edges.forEach(edge => {
        graph[edge.from][edge.to] = Number(edge.time);
        graph[edge.to][edge.from] = Number(edge.time);
    });

    // Aplicar el algoritmo de Dijkstra
    const distances = {}; // Distancias desde el nodo inicial a cada nodo
    const visited = {}; // Nodos visitados
    const previous = {}; // Nodo anterior en el camino más corto
    const heap = new PriorityQueue(); // Cola de prioridad para elegir el siguiente nodo a visitar

    // Inicialización de las distancias, visitados y previos
    for (let vertex in graph) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
        previous[vertex] = null;
    }

    // La distancia al nodo inicial es 0
    distances[start] = 0;

    // Agregar el nodo inicial a la cola de prioridad
    heap.enqueue(start, 0);

    // Recorrido del grafo
    while (!heap.isEmpty()) {
        // Sacar el nodo con la menor distancia desde la cola de prioridad
        const currentVertex = heap.dequeue().val;

        // Si ya visitamos este nodo, continuar con el siguiente
        if (visited[currentVertex]) continue;

        // Marcar el nodo como visitado
        visited[currentVertex] = true;

        // Obtener las distancias desde el nodo actual a cada uno de sus vecinos
        for (let neighbor in graph[currentVertex]) {
            // Calcular la distancia desde el nodo actual hasta el vecino
            const distance = distances[currentVertex] + graph[currentVertex][neighbor];

            // Si la distancia es menor que la actual, actualizarla
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentVertex;

                // Agregar el vecino a la cola de prioridad
                heap.enqueue(neighbor, distance);
            }
        }
    }

    // Construir el camino más corto
    const path = [];
    let currentVertex = end;
    while (currentVertex !== null) {
        path.unshift(currentVertex);
        currentVertex = previous[currentVertex];
    }

    // Devolver el resultado como un objeto
    let Dj ={
        distance: distances[end],
            path: path
    };

    document.querySelector('#Label1').innerText = 'La distancia es:'+ Dj.distance + ' La ruta es: '+ Dj.path;

    pintaris(path);
    console.log(Dj);
    return Dj;

}


function pintaris(mst){
    const color = "red";
    var i = 0;
    const ids=[];
    const nodos = data.nodes.get();

    nodos.forEach((ip)=>{
        ids.push(parseInt(mst[i]));
        i++;
    });

    nodos.forEach((nodo) => {
        if (ids.includes(nodo.id)) {
            nodo.color = color;
            data.nodes.update(nodo);
        }
    });
}

// Definición de la clase PriorityQueue
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}
