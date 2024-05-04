ymaps.ready(init);

const groups_list=[]
const getting_curent_select = []
const estate_objects = []

var promise = $.ajax({type: "GET",url: "/getting_layers"});

promise.done(function(data) {
$.each(data, function(index, value) {groups_list.push(value);});});

console.log(groups_list)
function init() {
    var myMap = new ymaps.Map('map', {
            center: [57.77, 40.93],
            zoom: 10,
            controls: []}),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 64,
            // Макет метки кластера pieChart.
            clusterIconLayout: "default#pieChart"
        });
    myMap.geoObjects.add(objectManager);

    // Создадим 7 пунктов выпадающего списка.
        let items_ = groups_list.map(function(title) {
            return new ymaps.control.ListBoxItem({
                data: {content: title},
                state: {selected: false}
            })
        }),
        // Теперь создадим список, содержащий 7 пунктов.
        listBoxControl = new ymaps.control.ListBox({
            data: {
                content: 'Выберите слой',
                title: 'Выберите слой'
            },
            items: items_,
            state: {
          expanded: true,
          filters: items_.reduce(function(filters, filter) {
            filters[filter.data.get('content')] = filter.isSelected();
            return filters;
          }, {})
        }
      });
    myMap.controls.add(listBoxControl);
    
    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select','deselect'], function(e) {
        var listBoxItem = e.get('target');
        var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
        listBoxControl.state.set('filters', filters);
        
        Getting_Curent_Select(filters)
    });
    var filterMonitor = new ymaps.Monitor(listBoxControl.state);



  

    /*
    function getFilterFunction(categories){
        return function(obj){
            var content = obj.properties.balloonContent;
            return categories[content]
        }
    }
*/

}


    /*
    $.ajax({
        url: "https://sandbox.api.maps.yandex.net/examples/ru/2.1/object_manager_filter/data.json"
    }).done(function (data) {
        objectManager.add(data);
        listBoxControl.get(4).select();
    });
    */


