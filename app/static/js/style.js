ymaps.ready(['Heatmap']).then(function init() {
    var obj = json;

    var myMap = new ymaps.Map('map', {
        center: [55.733835, 37.588227],
        zoom: 11,
        controls: []
    });

    var data = [];
    for (var i = 0; i < obj.length; i++) {
        var weight = obj[i].Cells.weight;
        var coordinates = [obj[i].Cells.geoData.coordinates[1], obj[i].Cells.geoData.coordinates[0]];

        // Добавляем данные в массив
        data.push(coordinates.concat(weight));

        // Если текущая точка имеет "global_id": 61213463, то устанавливаем ей красный цвет
        if (obj[i].Cells.global_id === 61213463) {
            var heatmapGradient = {
                1.0: 'rgba(255, 0, 0, 1)'
            }
            // Отдельно устанавливаем градиент для точки с "global_id": 61213463
            var heatmap = new ymaps.Heatmap([coordinates.concat(weight)], {
                radius: 20,
                innerRadius: 30,
                dissipating: false,
                opacity: 0.8,
                intensityOfMidpoint: 0.2,
                gradient: heatmapGradient
            });

            heatmap.setMap(myMap);
        }else{
         var heatmap = new ymaps.Heatmap(data, {
                // Радиус влияния.
                radius: 20,
                innerRadius: 30,
                // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
                dissipating: false,
                // Прозрачность тепловой карты.
                opacity: 0.8,
                // Прозрачность у медианной по весу точки.
                intensityOfMidpoint: 0.2,
                // JSON описание градиента.
                gradient: {
                    0.1: 'rgba(128, 255, 0, 0.7)',
                    0.2: 'rgba(255, 255, 0, 0.8)',
                    0.7: 'rgba(234, 72, 58, 0.9)',
                    1.0: 'rgba(255, 0, 0, 1)'
                }
            });
            heatmap.setMap(myMap);
        }
    }

    // Если точек с "global_id": 61213463 несколько, то градиент может быть установлен только для последней точки
    // Для точной настройки градиента для каждой точки с "global_id": 61213463, нужно предоставить
    // более детальные требования или дополнительные данные.
});
