function uib_w_19_popup_controller($scope, $ionicPopup) {

    // A confirm dialog
    $scope.show = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Informações do dispositivo',
            template: 'Cordova: ' + window.device.cordova + '<br/>' +
                'Modelo: ' + window.device.model + '<br/>' +
                'Plataforma: ' + window.device.platform + '<br/>' +
                'Versão: ' + window.device.version + '<br/>' +
                'Fabricante: ' + window.device.manufacturer
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('Info OK');
            } else {
                console.log('Info Cancel');
            }
        });
    };

};