/*ymaps.ready(['Heatmap']).then(function init() {
    var obj = json;

    var myMap = new ymaps.Map('map', {
        center: [57.77, 40.93],
        zoom: 12,
    }, {
        // Зададим ограниченную область прямоугольником,
        // примерно описывающим Rj.
        restrictMapArea: [
            [57.870355, 40.854916],
            [57.716463, 41.017508]
        ]
    });

    var data = [];
    for (var i = 0; i < obj.length; i++) {
        var coordinates = [parseFloat(obj[i].coord_Y), parseFloat(obj[i].coord_X)];
        var weight = obj[i].x_scaled; // Используем x_scaled как вес точки

        // Определяем цвет в зависимости от веса
        var color = weight > 5 ? '#00FF00' : '#FF0000'; // Зеленый если вес > 5, иначе красный

        // Добавляем точку в массив данных
        data.push({
            coordinates: coordinates,
            weight: weight
        });
    }

    var heatmap = new ymaps.Heatmap(data, {
        // Радиус влияния.
        radius: 15,
        // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
        dissipating: false,
        // Прозрачность тепловой карты.
        opacity: 0.8,
        // Прозрачность у медианной по весу точки.
        intensityOfMidpoint: 0.2,
    });

    myMap.geoObjects.add(heatmap);
});


ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [57.77, 40.93],
        zoom: 12
    }, {
        restrictMapArea: [[57.870355, 40.854916],[57.716463, 41.017508]] // область ограничения масштабирования
    });

    ymaps.modules.require(['Heatmap'], function (Heatmap) {
        var data = {
            type: 'FeatureCollection',
            features: [
                {
                    id: 'id1',
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [57.749645, 40.999886]
                    },
                    properties: {
                        weight: 1
                    }
                },
                {
                    id: 'id2',
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [57.79884, 40.95623]
                    },
                    properties: {
                        weight: 10
                    }
                },
                {
                    id: 'id3',
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [57.748051, 41.016048]
                    },
                    properties: {
                        weight: 5
                    }
                }
            ]
        };

        var heatmap = new Heatmap(data, {
                innerRadius: 30,
                // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
                dissipating: false,
                // Прозрачность тепловой карты.
                opacity: 0.8,
        });

        heatmap.options.set('options.intensityOfMidpoint', 0.2);
        heatmap.options.set('dissipating', 'false');
        heatmap.setMap(myMap);
    });
}
*/

ymaps.ready(['Heatmap']).then(function init() {
    var obj = json;
    var myMap = new ymaps.Map("map", {
        center: [57.77, 40.93],
        zoom: 12
    }, {
        restrictMapArea: [[57.870355, 40.854916],[57.716463, 41.017508]]
    });

    var heatMapData = []; // Массив для хранения данных тепловых точек
    var heatMapObjects = []; // Массив для хранения объектов тепловых точек

    // Функция для добавления тепловых точек
    function addHeatmap() {
        removeHeatmap(); // Удаляем все текущие тепловые точки

        for (var i = 0; i < obj.length; i++) {
            var weight = obj[i].x_scaled;
            var coordinates = [parseFloat(obj[i].coord_Y), parseFloat(obj[i].coord_X)];

            heatMapData.push(coordinates.concat(weight));
        }

        // Добавляем тепловые точки на карту
        for (var j = 0; j < heatMapData.length; j++) {
            var heatmapGradient;
            var weight = heatMapData[j][2];

            if (weight >= 6) {
                heatmapGradient = {
                    0.1: 'rgba(0, 255, 0, 0.7)' // Зеленый цвет
                };
            } else if (weight >= 3 && weight <= 5) {
                heatmapGradient = {
                    0.5: 'rgba(255, 165, 0, 0.7)' // Оранжевый цвет
                };
            } else {
                heatmapGradient = {
                    1.0: 'rgba(255, 0, 0, 1)' // Красный цвет
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

            heatmap.setMap(myMap);
            heatMapObjects.push(heatmap);
        }
    }

    // Функция для удаления тепловых точек с карты
    function removeHeatmap() {
        for (var i = 0; i < heatMapObjects.length; i++) {
            heatMapObjects[i].setMap(null);
        }
        heatMapData = [];
        heatMapObjects = [];
    }

       // Создаем элемент ListBox с чекбоксом
    var listBoxWithCheckbox = new ymaps.control.ListBox({
        data: { content: 'Выбрать слой' },
        items: [
            new ymaps.control.ListBoxItem({
                data: { content: 'Парковка' },
            }),
            new ymaps.control.ListBoxItem({
                data: { content: 'Рекомендую' },
            })
        ]
    });

    // Добавляем обработчик события для чекбокса
     listBoxWithCheckbox.events.add('click', function (event) {
        var target = event.get('target');
        if (target.data.get('content') === 'Парковка') {
            var isChecked = target.isSelected();
            if (!isChecked) {
                addHeatmap();
            } else {
                removeHeatmap();
            }
        }
    });

    // Добавляем элемент управления на карту
    myMap.controls.add(listBoxWithCheckbox, { float: 'none', position: { right: 10, top: 45 } });
});



