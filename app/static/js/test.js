        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [57.77, 40.93],
                zoom: 12
            }, {
                    restrictMapArea: [[57.870355, 40.854916],[57.716463, 41.017508]] // область ограничения масштабирования
}
            );

        ymaps.modules.require(['Heatmap'], function (Heatmap) {
    var data = {
              type: 'FeatureCollection',
              features: [{
                  id: 'id1',
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [57.727904, 41.000268]
                  },
                  properties: {
                      weight: 1
                  }
              }, {
                  id: 'id2',
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [57.727496, 40.999190]
                  },
                  properties: {
                      weight: 10
                  }

              }]
          },
        heatmap = new Heatmap(data);
heatmap.options.set('options.intensityOfMidpoint',0.2)
heatmap.options.set('gradient', {
        '0.1': 'lime',
        '0.9': 'red'
    });
heatmap.options.set('dissipating', 'false')
    heatmap.setMap(myMap);



});


}

