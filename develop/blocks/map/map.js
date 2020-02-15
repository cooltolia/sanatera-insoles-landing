
$(window).on('load', function () {
    var mapContainer = $('#map');
    if (mapContainer.length === 0) return;
    
    var zoom = 17;
    var adress;
    var center;
    adress = [59.931524, 30.351719];
    center = adress;
    if ($(window).width() < 480) {
        zoom = 16;
        center = [59.931641, 30.353813];
    }

    var $mapFallback = $('.map__fallback');

    /** popup */

    var $header = $('.map__info-header'),
        $body = $('.map__info-body');

    if ($(window).width() <= '767') {
        $header.on('click', function () {

            if ($header.hasClass('js-expanded')) {
                $body.slideUp();
                $header.removeClass('js-expanded');
            } else {
                $header.addClass('js-expanded');
                $body.slideDown();
            }
        })
    }

    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки)
    var check_if_load = false;
    var TRY = 1

    function init() {
        if (ymaps.geocode === undefined) {
            // console.log('Попытка номер ' + TRY);
            TRY++
            return ymap();
        }

        ymaps.ready(function () {
            var myMap;
            var pointA = "Санкт-Петербург, метро Маяковская",
                pointB = adress,
                multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        pointA,
                        pointB
                    ],
                    params: {
                        //Тип маршрутизации - пешеходная маршрутизация.
                        routingMode: 'pedestrian',
                    },
                }, {
                    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                    //boundsAutoApply: true
                    wayPointIconLayout: "none",
                    routeActivePedestrianSegmentStrokeStyle: "solid",
                    routeActivePedestrianSegmentStrokeColor: "#ff0000"
                });
            // ymaps.geocode(adress).then(function (res) {
            //     console.log(res.geoObjects.get(0).geometry.getCoordinates());
                
                myMap = new ymaps.Map('map', {
                    center: center,
                    zoom: zoom
                });
                var myPlacemark = new ymaps.Placemark(adress, {
                    hintContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',
                    balloonContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'images/icons/map-icon.png',
                    // Размеры метки.
                    iconImageSize: [30, 30],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-15, -30]
                });

                var layer = myMap.layers.get(0).get(0);
                // Отслеживаем событие окончания отрисовки тайлов.
                waitForTilesLoad(layer).then(function () {
                    console.log('Карта загружена');
                });


                myMap.geoObjects.add(myPlacemark);
                myMap.geoObjects.add(multiRoute);
                myMap.behaviors.disable('scrollZoom');
            });

        // });


    }

    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer),
                readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function () {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
                    layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback) {
        var script = document.createElement("script");

        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { // Другие браузеры
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
    var ymap = function () {

        loadScript("https://api-maps.yandex.ru/2.1/?apikey=2efe2353-6e9b-4f4f-8804-395887835361&lang=ru_RU&load=Map&loadByRequire=1", function () {
            ymaps.load(init);
        });
    }

    $(function () {
        ymap();

    });
})
