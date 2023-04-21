function find(parent, i) {
    if (parent[i] !== i) {
        parent[i] = find(parent, parent[i]);
    }
    return parent[i];
}

function union(parent, rank, x, y) {
    const rootX = find(parent, x);
    const rootY = find(parent, y);

    if (rootX === rootY) {
        return;
    }

    if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
    } else {
        parent[rootY] = rootX;
        rank[rootX]++;
    }
}

function kruskalMST() {
    const numVertices = data.nodes.length
    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const edges = graph.edges
    const mst = [];
    const parent = [];
    const rank = [];

    for (let i = 0; i < numVertices; i++) {
        parent[i] = i;
        rank[i] = 0;
    }

    edges.sort((a, b) => a.time - b.time);

    for (let i = 0; i < edges.length; i++) {
        const {id,from, to, time } = edges[i];

        if (find(parent, from) !== find(parent, to)) {
            mst.push(edges[i]);
            union(parent, rank, from, to);
        }
    }
    console.log(mst);
    pintar(mst);
}

function pintar(mst){
    const color = "red";
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