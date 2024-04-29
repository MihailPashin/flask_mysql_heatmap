// heatmapWorker.js
onmessage = function(e) {
    var heatMapData = e.data.heatMapData;
    var colors = e.data.colors;
    var gradients = [];

    for (var j = 0; j < heatMapData.length; j++) {
        var weight = heatMapData[j][2];
        var heatmapGradient;

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

        gradients.push(heatmapGradient);
    }

    postMessage({ gradients: gradients });
}
