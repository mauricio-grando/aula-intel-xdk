function uib_w_20_popup_controller($scope, $ionicPopup) {

    // A confirm dialog
    $scope.show = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Sair',
            template: 'Você deseja realmente sair?',
            okText: 'Sair',
            cancelText: 'Cancelar'
        });
        confirmPopup.then(function (res) {
            if (res) {
                navigator.app.exitApp();
            } else {
                return false;
            }
        });
    };
}