
let Layer = function (layers) {
    this.layers = layers.length
    this.layersOutput = layers
    this.nodesArray = []
    this.nodesArrayNames = []
    this.edges = []
}


Layer.prototype.CreatingLayer = function (outputNum, layerNum) {

    // init nodesNameArray for using it at edges Connections
    // this.prototype = Layer.prototype
    this.nodesArrayNames[layerNum] = []

    for (let index = 0; index < outputNum; index++) {

        let object = {
            id: this.nodeName(layerNum, index + 1),
            label: 'Node-x',
            x: 1 + layerNum / 20,
            y: 1 + index / 20,
            size: 0.5,
            color: '#666'
        }

        this.nodesArray.push(object)
        this.nodesArrayNames[layerNum].push(object.id)

    }

}




Layer.prototype.FullyConnectedLayers = function (pervNodesName, NextNodesName, layerNum) {


    if (pervNodesName != undefined && NextNodesName != undefined) {


        pervNodesName.map((n1, index1) => {
            NextNodesName.map((n2, index2) => {

                let object = {
                    id: 'n' + (index1 + 1) + '-n' + (index2 + 1) + '-out-' + layerNum,
                    source: n1,
                    target: n2,
                    size: 0.3,
                    color: '#ccc',
                    hover_color: '#000'
                }

                this.edges.push(object)
            })
        })

    }



}

Layer.prototype.nodeName = function (layerNum, nodeNum) {
    return `l${layerNum}-n${nodeNum}`
};




Layer.prototype.NNVisualize = function () {


    let NN = new Layer(this.layersOutput)

    NN.layersOutput.map((nodesNumber, Layerindex) => {
        NN.CreatingLayer(nodesNumber, Layerindex)
    })




    for (let LayerIndex = 0; LayerIndex < NN.nodesArrayNames.length; LayerIndex += 1) {
        if (LayerIndex <= NN.nodesArrayNames.length) {


            let LayerPlugin = NN.nodesArrayNames.slice(LayerIndex, LayerIndex + 2)


            NN.FullyConnectedLayers(LayerPlugin[0], LayerPlugin[1], LayerIndex)

        }

    }


    return NN

}


