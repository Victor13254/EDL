// función para encontrar la ruta crítica
function Ruta() {

    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const edges = graph.edges
    const nodes = graph.nodes
    // crear un objeto vacío para almacenar los nodos
    const nodos = {};

    // agregar cada nodo al objeto nodos
    nodes.forEach(node => {
        nodos[node.id] = {
            id: node.id,
            label: node.label,
            duracion: parseInt(node.duracion),
            costo: parseInt(node.costo),
            tiempoInicio: 0,
            tiempoFinal: 0,
            sucesores: [],
            predecesores: [],
            edge:[]
        };
    });

    // agregar los sucesores y predecesores de cada nodo
    edges.forEach(edge => {
        const fromNode = nodos[edge.from];
        const toNode = nodos[edge.to];
        fromNode.sucesores.push(toNode);

        toNode.edge.push(edge.id);
        toNode.predecesores.push(fromNode);
    });

    // encontrar el tiempo de inicio más temprano para cada nodo
    Object.values(nodos).forEach(node => {
        if (node.predecesores.length === 0) {
            node.tiempoInicio = 0;
        } else {
            node.tiempoInicio = Math.max(...node.predecesores.map(p => p.tiempoFinal));
        }
        node.tiempoFinal = node.tiempoInicio + node.duracion;
    });

    // encontrar el tiempo final más temprano del último nodo
    const tiempoFinal = Math.max(...Object.values(nodos).map(node => node.tiempoFinal));
    var actual = 0;
    var final;
    // encontrar la ruta crítica
    const rutaCritica = [];
    Object.values(nodos).forEach(node => {
        var temp = actual
        if (node.tiempoFinal > temp) {
            actual = temp;
            final = node;
        }
    });
    rutaCritica.push(final);


    const lista = recorrido(nodos,rutaCritica.id);

    console.log(tiempoFinal);
    console.log(rutaCritica);
   pintares(rutaCritica);
}
function recorrido(nodos,rutaCritica){


    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const edges = graph.edges
    const nodes = graph.nodes

    const list = [];

    nodes.forEach(node => {
        if(nodos[rutaCritica].predecesores != []){
            list.push(recorrido(nodos,nodos[rutaCritica].predecesores.id))
        }else{
            return nodos[rutaCritica].edge;
        }


    });
    return list;
}
function pintares(mst){
    const color = "green";
    var i = 0;
    const ids=[];
    const edges = data.edges.get();

    mst.forEach((ip)=>{
        ids.push(mst[i].id);
        i++;
    });

    edges.forEach((edge) => {
        if (ids.includes(edge.id)) {
            edge.color = color;
            data.edges.update(edge);
        }
    });
}