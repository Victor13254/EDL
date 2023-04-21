
var nodos = new vis.DataSet();
var edges = new vis.DataSet();
var container = document.getElementById("mynetwork");
var data = {
    nodes: nodos,
    edges: edges,
};
/*var options = {};*/
var options = {
    edges:{
        scaling: {
            customScalingFunction: function (min,max,total,value) {
                return value/total;
            },
            min:1,
            max:200
        },arrows: {
            to: {enabled: true, scaleFactor: 1, type: "arrow"}
        },
        color: {
            //color:'#848484',
            highlight:'#848484',
            hover: '#d3d2cd',
            inherit: false,
            opacity:1.0
        }},
    manipulation: {
        enabled: true,
        addNode: function(nodeData, callback) {
            nodeData.label = prompt("Nombre:");
            nodeData.duration = parseInt(prompt("Duración:"));
            nodeData.cost = parseInt(prompt("Costo:"));
            callback(nodeData);
        }
    }
};

var network = new vis.Network(container, data, options);

network.on("click", function (params) {
    var enlaceId = params.edges[0];
    if (enlaceId) {
        document.getElementById("enlaces").value = enlaceId;
        actualizarCamposEnlace();
    }
});
nodos.on("remove", function(event, properties, senderId) {
    actualizarSelect();
});

function agregarNodo() {
    var nombre = document.getElementById("nombreNodo").value;
    var duracion = document.getElementById("duracionNodo").value;
    var costo = document.getElementById("costoNodo").value;
    var id = nodos.length + 1;
    nodos.add({ id: id, label: nombre, duracion: duracion, costo: costo, title: "Costo: " + costo + "\nDuración: " + duracion});
    actualizarSelect();
}

function eliminarNodo() {
    var nodosSeleccionados = network.getSelection().nodes;
    // hay nodos seleccionados, eliminarlos
    if (nodosSeleccionados.length > 0) {
        nodos.remove(nodosSeleccionados);

    }
}

function agregarEnlace() {
    var origenId = parseInt(document.getElementById("nodoOrigen").value);
    var destinoId = parseInt(document.getElementById("nodoDestino").value);
    var tiempo = document.getElementById("nodoTiempo").value;
    if (origenId && destinoId) {
        var id = edges.length + 1;
        edges.add({ id: id, from: origenId, to: destinoId,time:tiempo, title: "Tiempo: " + tiempo});
        actualizarSelectEnlaces();
    }
}

function actualizarSelect() {
    var selectOrigen = document.getElementById("nodoOrigen");
    var selectDestino = document.getElementById("nodoDestino");
    selectOrigen.innerHTML = "";
    selectDestino.innerHTML = "";
    for (var i = 0; i < nodos.length; i++) {
        var option = document.createElement("option");
        option.value = nodos.get(i + 1).id;
        option.text = nodos.get(i + 1).label;
        selectOrigen.appendChild(option);
        var option2 = document.createElement("option");
        option2.value = nodos.get(i + 1).id;
        option2.text = nodos.get(i + 1).label;
        selectDestino.appendChild(option2);
    }
}

function actualizarSelectEnlaces() {
    var select = document.getElementById("enlaces");
    select.innerHTML = "<option value=''>Seleccione un enlace</option>";
    for (var i = 0; i < edges.length; i++) {
        var edge = edges.get(i + 1);
        var option = document.createElement("option");
        option.value = edge.id;
        var origen = nodos.get(edge.from).label;
        var destino = nodos.get(edge.to).label;
        option.text = origen + " -> " + destino;
        select.appendChild(option);
    }
}

function actualizarCamposEnlace() {
    var enlaceId = parseInt(document.getElementById("enlaces").value);
    if (enlaceId) {
        var enlace = edges.get(enlaceId);
        var origen = nodos.get(enlace.from);
        var destino = nodos.get(enlace.to);
        document.getElementById("nodoOrigen").value = origen.id;
        document.getElementById("nodoDestino").value = destino.id;
    }
}

function eliminarEnlace() {
    var enlaceId = parseInt(document.getElementById("enlaces").value);
    if (enlaceId) {
        edges.remove({ id: enlaceId });
        actualizarSelectEnlaces();
        actualizarCamposEnlace();
    }
}
