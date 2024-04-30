ymaps.ready(['Heatmap']).then(function init() {
    var myMap = new ymaps.Map("map", {
        center: [57.77, 40.93],
        zoom: 12
    }, {
        restrictMapArea: [[57.643834, 40.531073],[57.942011, 41.241367]]
    });
/*
var fullscreenControl = myMap.controls.get('fullscreenControl');

    // Удаляем элемент управления с карты
    myMap.controls.remove(fullscreenControl);
*/
    var heatMapData = []; // Массив для хранения данных тепловых точек
    var heatMapObjects = []; // Массив для хранения объектов тепловых точек
    var colors = [
    'rgba(0, 255, 0, 1)',        // Чистый зелёный
    'rgba(25, 230, 0, 1)',       // Зелёный с небольшим оттенком жёлтого
    'rgba(51, 204, 0, 1)',       // Зелёно-жёлтый
    'rgba(76, 179, 0, 1)',       // Тёмный зелёно-жёлто-зелёный
    'rgba(102, 153, 0, 1)',      // Тёмный зелёно-жёлтый
    'rgba(128, 128, 0, 1)',      // Тёмный жёлто-коричневый
    'rgba(153, 102, 0, 1)',      // Красно-жёлтый
    'rgba(179, 76, 0, 1)',       // Красно-коричневый
    'rgba(190, 78, 36, 1)',      // Темный красно-оранжевый
    'rgba(237, 118, 14, 1)',     // Красный с небольшим оттенком оранжевого
    'rgba(255, 0, 0, 1)'         // Чистый красный
];
    // Функция для добавления тепловых точек
    function addHeatmap(group) {
        removeHeatmap(); // Удаляем все текущие тепловые точки
        var data;
            if (group === 'Парковка') {
                data = json; // Используем данные для группы "Парковка"
            } else if (group === 'Медицина') {
                data = json1; // Используем данные для группы "Медицина"
            } else {
            return; // Если группа не определена, просто выходим из функции
         }

         for (var i = 0; i < data.length; i++) {
            var weight = data[i].x_scaled;
            var coordinates = [parseFloat(data[i].coord_Y), parseFloat(data[i].coord_X)];
            heatMapData.push(coordinates.concat(weight));
        }

        for (var j = 0; j < heatMapData.length; j++) {
            var heatmapGradient;
            var weight = heatMapData[j][2];

            if (weight >= 10) {
                heatmapGradient = {
                    0.1: colors[0]
                };
            } else if (weight >= 9) {
                heatmapGradient = {
                    0.1: colors[1]
                };
            } else if (weight >= 8) {
                heatmapGradient = {
                    0.1: colors[2]
                };
            } else if (weight >= 7) {
                heatmapGradient = {
                    0.1: colors[3]
                };
            } else if (weight >= 6) {
                heatmapGradient = {
                    0.1: colors[4]
                };
            } else if (weight >= 5) {
                heatmapGradient = {
                    0.1: colors[5]
                };
            } else if (weight >= 4) {
                heatmapGradient = {
                    0.1: colors[6]
                };
            } else if (weight >= 3) {
                heatmapGradient = {
                    0.1: colors[7]
                };
            }else if (weight >= 2) {
                heatmapGradient = {
                    0.1: colors[8]
                };
            }else if (weight >= 1) {
                heatmapGradient = {
                    0.1: colors[9]
                };
            } else {
                heatmapGradient = {
                    0.1: colors[10]
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

            myMap.options.set('fullscreenZIndex', 1);
            heatmap.setMap(myMap);
            heatMapObjects.push(heatmap);
        }
    }

function removeHeatmap() {
        for (var i = 0; i < heatMapObjects.length; i++) {
            heatMapObjects[i].setMap(null);
        }
        heatMapData = [];
        heatMapObjects = [];
    }

var createModal = function(title) {
    var modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'bs-modal';
    modal.tabIndex = '-1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('data-backdrop', 'static');
    //modal.style.zIndex = '20000'; // Устанавливаем z-index для модального окна

    modal.innerHTML = '<div class="modal-dialog" role="document">' +
                          '<div class="modal-content">' +
                              '<div class="modal-header">' +
                                  '<h5 class="modal-title">' + title + '</h5>' +
                                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                      '<span aria-hidden="true">&times;</span>' +
                                  '</button>' +
                              '</div>' +
                              '<div class="modal-body"></div>' +
                              '<div class="modal-footer">' +
                                  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>' +
                              '</div>' +
                          '</div>' +
                      '</div>';
    document.body.appendChild(modal);
    return modal;
};

function handleHeatmapClick(e, group) {
    var coords = e.get('coords');
    var weight;
    var title;

    var epsilon = 0.00001; // Значение для допуска

    // Функция для сравнения координат с использованием допуска
    function compareCoordinates(coord1, coord2) {
        return Math.abs(coord1 - coord2) < epsilon;
    }

    for (var i = 0; i < heatMapData.length; i++) {
        var point = heatMapData[i];
        var distance = getDistance(coords, [point[0], point[1]]);
        if (distance < 0.5) {
            weight = point[2];
            var titleFromParkovka;
            var titleFromMedisina;

            // Поиск названия в файле "Парковка"
            for (var j = 0; j < json.length; j++) {
                if (
                    compareCoordinates(json[j].coord_X, point[1]) &&
                    compareCoordinates(json[j].coord_Y, point[0])
                ) {
                    titleFromParkovka = json[j].title;
                    break;
                }
            }

            // Поиск названия в файле "Медицина"
            for (var k = 0; k < json1.length; k++) {
                if (
                    compareCoordinates(json1[k].coord_X, point[1]) &&
                    compareCoordinates(json1[k].coord_Y, point[0])
                ) {
                    titleFromMedisina = json1[k].title;
                    break;
                }
            }
            // Определение конечного названия в зависимости от выбранной группы и наличия совпадений
            if (group === 'Парковка' && titleFromParkovka) {
                title = titleFromParkovka;
            } else if (group === 'Медицина' && titleFromMedisina) {
                title = titleFromMedisina;
            } else {
                // Если название не найдено в соответствующем файле или не выбрана группа, используем первое найденное название
                title = titleFromParkovka || titleFromMedisina;
            }

            break;
        }
    }

    if (weight >= 0) {
        var modal = createModal(title);
        var modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = '<p>Вес: ' + weight + '</p>';
        var modalFooter = modal.querySelector('.modal-footer');
        $(modal).modal('show');
    }
}

// Вычисляем расстояние между двумя точками
function getDistance(coords1, coords2) {
    var dx = coords2[0] - coords1[0];
    var dy = coords2[1] - coords1[1];
    return Math.sqrt(dx * dx + dy * dy)*500;
}

// Добавляем обработчик кликов по тепловой карте
myMap.events.add('click', handleHeatmapClick);
myMap.options.set('fullscreenZIndex', 1);


    // Создаем элемент ListBox с чекбоксом
    var listBoxWithCheckbox = new ymaps.control.ListBox({
        data: { content: 'Выбрать слой' },
        items: [
            new ymaps.control.ListBoxItem({
                data: { content: 'Парковка' },
            }),
            new ymaps.control.ListBoxItem({
                data: { content: 'Медицина' },
            })
        ]
    });

   listBoxWithCheckbox.events.add('click', function (event) {
        var target = event.get('target');
        var group = target.data.get('content'); // Получаем выбранную группу
        if (group === 'Парковка' || group === 'Медицина') {
            var isChecked = target.isSelected();
            if (!isChecked) {
                addHeatmap(group); // Передаем группу в функцию добавления тепловых точек
            } else {
                removeHeatmap();
            }
        }
    });
    // Добавляем элемент управления на карту
    myMap.controls.add(listBoxWithCheckbox, { float: 'none', position: { right: 10, top: 45 } });



/*
 myMap.events.add('click', function (e) {
    var activeItems = listBoxWithCheckbox.state.get('activeItems');
    if (activeItems && activeItems.length > 0) {
        var group = activeItems[0].data.get('content');
        handleHeatmapClick(e, group); // Передаем выбранную группу в функцию
    } else {
    }
});*/


// Создаем кнопку
var layerButton = new ymaps.control.Button({
    data: { content: 'Диаграмма' }
});
myMap.controls.add(layerButton, { float: 'none', position: { top: 80, right: 10 } });
layerButton.options.set('maxWidth', 200); // Устанавливаем максимальную ширину кнопки в пикселях
layerButton.options.set('minWidth', 150); // Устанавливаем минимальную ширину кнопки в пикселях
myMap.options.set('fullscreenZIndex', 1);


function countHeatmapPoints() {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]; // Инициализируем массив для подсчета количества точек каждого цвета
    var totalPoints = heatMapData.length; // Общее количество точек

    // Проходим по всем точкам на карте и увеличиваем счетчик для соответствующего цвета
    for (var j = 0; j < totalPoints; j++) {
        var weight = heatMapData[j][2];
        if (weight >= 10) {
            counts[0]++;
        } else if (weight >= 9) {
            counts[1]++;
        } else if (weight >= 8) {
            counts[2]++;
        } else if (weight >= 7) {
            counts[3]++;
        } else if (weight >= 6) {
            counts[4]++;
        } else if (weight >= 5) {
            counts[5]++;
        } else if (weight >= 4) {
            counts[6]++;
        } else if (weight >= 3) {
            counts[7]++;
        } else if (weight >= 2) {
            counts[8]++;
        } else if (weight >= 1) {
            counts[9]++;
        }   else {
            counts[10]++;
        }
    }

    return { counts: counts, totalPoints: totalPoints };
}


// Обработчик события для кнопки "Диаграмма"
layerButton.events.add('click', function (event) {
    var modal_color = document.createElement('div');
    modal_color.className = 'modal fade';
    modal_color.id = 'bs-modal';
    modal_color.tabIndex = '1';
    modal_color.setAttribute('role', 'dialog');
    modal_color.setAttribute('data-backdrop', 'static');
    modal_color.innerHTML = '<div class="modal-dialog" role="document">' +
                          '<div class="modal-content">' +
                              '<div class="modal-header">' +
                                  '<h5 class="modal-title">Диаграмма цветов</h5>' +
                                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                      '<span aria-hidden="true">&times;</span>' +
                                  '</button>' +
                              '</div>' +
                               '<div class="modal-body" style="height: 400px;">'+ // Увеличил высоту для графика
                                '<canvas id="chart"></canvas>' +
                               '</div>' +
                          '</div>' +
                      '</div>';
    document.body.appendChild(modal_color);

    // Получаем ссылку на canvas для графика
    var canvas = modal_color.querySelector('#chart');

    // Уничтожаем предыдущий экземпляр Chart, если он есть
    if (canvas.chartInstance) {
        canvas.chartInstance.destroy();
    }

    // Рисуем график
    drawChart(canvas);

    // Показываем модальное окно
    $(modal_color).modal('show');
});

// Функция для отображения графика
function drawChart(canvas) {
    var data = countHeatmapPoints(); // Получаем количество точек каждого цвета и общее количество точек
    var counts = data.counts;
    var totalPoints = data.totalPoints;

    // Настройки графика
    var ctx = canvas.getContext('2d');
    canvas.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1','0'], // Веса точек
            datasets: [{
                label: 'Количество всего', // Убрал отображение числа в подписи
                data: counts, // Количество точек каждого цвета
                backgroundColor: [colors[0], colors[1], colors[2], colors[3],colors[4], colors[5], colors[6], colors[7],colors[8], colors[9], colors[10]],
                borderColor: [colors[0], colors[1], colors[2], colors[3],colors[4], colors[5], colors[6], colors[7],colors[8], colors[9], colors[10]],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Количество районов по цвету'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Степень привлекательности'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        generateLabels: function(chart) {
                            return [{
                                text: '', // Пустая строка для скрытия подписи в легенде
                                datasetIndex: 0
                            }];
                        }
                    },
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Количество всего районов: ' + totalPoints // Используем заголовок для отображения общего количества районов
                },
                legend: {
                    labels: {
                        filter: function(item) {
                            return !item.text.includes('Количество всего');
                        }
                    }
                }
            }
        }
    });
}



});
