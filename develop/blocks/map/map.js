function loadYandexMap(url) {
    return new Promise(function (resolve) {
        if (typeof ymaps !== 'undefined') {
            resolve();
        } else {
            const yandexMapUrl = url;
            // const yandexMapUrl =
            //     'https://api-maps.yandex.ru/2.1/?apikey=6cabbeea-5917-4375-b061-36a551dae260&lang=ru_RU';
            const yandexMapScript = document.createElement('script');
            yandexMapScript.type = 'text/javascript';
            yandexMapScript.src = yandexMapUrl;
            document.body.appendChild(yandexMapScript);

            yandexMapScript.onload = function () {
                resolve();
            };
        }
    });
}

$(window).on('load', function () {
    var mapContainer = $('#map');
    if (mapContainer.length === 0) return;

    var myMap;

    var activeCity = mapSwitching();

    loadYandexMap('https://api-maps.yandex.ru/2.1/?apikey=2efe2353-6e9b-4f4f-8804-395887835361&lang=ru_RU').then(
        function () {
            init();
        }
    );

    var placemarkOptions = {
        iconLayout: 'default#image',
        iconImageHref: 'images/icons/map-icon.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -30],
    };

    var multiRouteOptions = {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        //boundsAutoApply: true
        wayPointIconLayout: 'none',
        routeActivePedestrianSegmentStrokeStyle: 'solid',
        routeActivePedestrianSegmentStrokeColor: '#ff0000',
    };

    var zoom = 17;
    var spbAddress = [59.931524, 30.351719];
    var moscowAddress = [55.78081961083188, 37.60234272023768];

    if ($(window).width() < 480) {
        zoom = 16;
        spbAddress = [59.931641, 30.353813];
        moscowAddress = [55.78059739429505, 37.60061269542307];
    }

    function init() {
        ymaps.ready(function () {
            var center = activeCity === 'moscow' ? moscowAddress : spbAddress;

            myMap = new ymaps.Map('map', {
                center: center,
                zoom: zoom,
                controls: ['zoomControl'],
            });
            var spbPlacemark = new ymaps.Placemark(
                spbAddress,
                {
                    hintContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',
                    balloonContent: 'г. Санкт-Петербург, ст. м. Маяковская, Невский проспект 61 (вход со двора)',
                },
                placemarkOptions
            );

            var moscowPlacemark = new ymaps.Placemark(
                moscowAddress,
                {
                    hintContent:
                        'г. Москва, ст. м. Новослободская, БЦ "Сущевский", ул.Сущёвская, д. 12, стр. 1, 3 подъезд, 2 эт., пом. 5',
                    balloonContent:
                        'г. Москва, ст. м. Новослободская, БЦ "Сущевский", ул.Сущёвская, д. 12, стр. 1, 3 подъезд, 2 эт., пом. 5',
                },
                placemarkOptions
            );

            var spbMultiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: ['Санкт-Петербург, метро Маяковская', spbAddress],
                    params: {
                        //Тип маршрутизации - пешеходная маршрутизация.
                        routingMode: 'pedestrian',
                    },
                },
                multiRouteOptions
            );

            var moscowMultiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: ['Москва, метро Новослободская', moscowAddress],
                    params: {
                        //Тип маршрутизации - пешеходная маршрутизация.
                        routingMode: 'pedestrian',
                    },
                },
                multiRouteOptions
            );

            myMap.geoObjects.add(spbPlacemark);
            myMap.geoObjects.add(moscowPlacemark);
            myMap.geoObjects.add(spbMultiRoute);
            myMap.geoObjects.add(moscowMultiRoute);
            myMap.behaviors.disable('scrollZoom');
        });

        // });
    }

    function mapSwitching() {
        var mapSwitcher = document.querySelector('.map__contacts-switchers');
        if (!mapSwitcher) return;
        var contactsData = Array.from(document.querySelectorAll('.map__contacts-data'));
        var switcher = mapSwitcher.querySelector('.switcher');

        var mapSwitcherWidth = mapSwitcher.getBoundingClientRect().width;
        var activeBtn = mapSwitcher.querySelector('button.active');
        var btnWidth = activeBtn.offsetWidth;
        switcher.style.width = btnWidth + 'px';

        if (activeBtn.dataset.action === 'moscow') {
            switcher.style.left = '2px';
        } else {
            switcher.style.left = mapSwitcherWidth - btnWidth - 2 + 'px';
        }

        mapSwitcher.addEventListener('click', (e) => {
            if (myMap === undefined) return;

            var mapSwitcherWidth = mapSwitcher.getBoundingClientRect().width;
            var target = e.target;
            var action = target.dataset.action;

            var switcherBtns = Array.from(mapSwitcher.children);

            if (target.classList.contains('active')) return;
            switcherBtns.forEach((btn) => btn.classList.remove('active'));

            mapSwitcher.classList.add('disabled');
            var targetWidth = target.offsetWidth;
            target.classList.add('active');
            switcher.style.width = targetWidth + 'px';

            var activeData = contactsData.find((data) => data.classList.contains('active'));
            var relatedData = contactsData.find((data) => data.dataset.city === action);

            if (action === 'moscow') {
                switcher.style.left = '2px';

                myMap.panTo(moscowAddress, {
                    duration: 1000,
                });
            } else {
                myMap.panTo(spbAddress, {
                    duration: 1000,
                });
                switcher.style.left = mapSwitcherWidth - targetWidth - 2 + 'px';
            }

            $(activeData).fadeOut(160, function () {
                activeData.classList.remove('active');
                relatedData.classList.add('active');
                $(relatedData).fadeIn(160, function () {
                    mapSwitcher.classList.remove('disabled');
                });
            });
        });

        return activeBtn.dataset.action;
    }
});
