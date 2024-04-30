self.onmessage = function(e) {
    var data = e.data;

    var result = processData(data);

    self.postMessage(result);
};

function processData(data) {
    var processedData = [];
    var heatMapData = [];
    for (var i = 0; i < data.length; i++) {
        var weight = data[i].x_scaled;
        var coordinates = [parseFloat(data[i].coord_Y), parseFloat(data[i].coord_X)];
        processedData.push(coordinates.concat(weight));
    }

        var colors = [
            'rgba(1, 50, 32, 1)',        // Темно-зеленый
            'rgba(0, 128, 0, 1)',        // Зеленый
            'rgba(173, 255, 47, 1)',     // Желто-зеленый
            'rgba(255, 255, 0, 1)',      // Желтый
            'rgba(237, 118, 14, 1)',     // Оранжево-желтый
            'rgba(255, 165, 0, 1)',      // Оранжевый
            'rgba(190, 78, 36, 1)',      // Красно-оранжевый
            'rgba(255, 0, 0, 1)',        // Красный
            'rgba(200, 0, 0, 1)'         // Темно-красный
        ];

        for (var j = 0; j < heatMapData.length; j++) {
            var heatmapGradient;
            var weight = heatMapData[j][2];

            if (weight >= 9) {
                heatmapGradient = {
                    0.1: colors[0]
                };
            } else if (weight >= 8) {
                heatmapGradient = {
                    0.1: colors[1]
                };
            } else if (weight >= 7) {
                heatmapGradient = {
                    0.1: colors[2]
                };
            } else if (weight >= 6) {
                heatmapGradient = {
                    0.1: colors[3]
                };
            } else if (weight >= 5) {
                heatmapGradient = {
                    0.1: colors[4]
                };
            } else if (weight >= 4) {
                heatmapGradient = {
                    0.1: colors[5]
                };
            } else if (weight >= 3) {
                heatmapGradient = {
                    0.1: colors[6]
                };
            } else if (weight >= 2) {
                heatmapGradient = {
                    0.1: colors[7]
                };
            } else {
                heatmapGradient = {
                    0.1: colors[8]
                };
            }

            var heatmap = new ymaps.Heatmap([heatMapData[j]], {
                radius: 40,
                innerRadius: 30,
                dissipating: false,
                opacity: 0.8,
                intensityOfMidpoint: 0.2,
                gradient: heatmapGradient
            });
        }
    return processedData;
}

