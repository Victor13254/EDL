
// Save button event listener
function save(){
    const graph = { nodes: data.nodes.get(), edges: data.edges.get() };
    const filename = 'datos.json';
    const json = JSON.stringify(graph);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function cargar() {
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            // Eliminar nodos y enlaces existentes en caso de que haya
            network.body.data.nodes.clear();
            network.body.data.edges.clear();

            // Añadir nodos al network
            data.nodes.forEach(node => {
                network.body.data.nodes.add(node);
            });

            // Añadir enlaces al network
            data.edges.forEach(edge => {
                network.body.data.edges.add(edge);
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}