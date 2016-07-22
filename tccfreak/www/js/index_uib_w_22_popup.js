function uib_w_22_popup_controller($scope, $ionicPopup) {

    $scope.show = function () {
        // capturando os dados do aluno da tela        
        var nomeTrab = $("#txtnometrabalho").val();
        var nomeAluno = $("#txtnomealunotrab").val();
        var confirmPopup = $ionicPopup.alert({
            title: 'Informações do trabalho',
            template: 'Trabalho: ' + nomeTrab + '<br/>' +
                'Aluno: ' + nomeAluno,
            buttons: [
                {
                    text: 'OK',
                    type: 'button-positivo',
                    onTap: function (e) {
                        $scope.close;
                    }
                }
            ]
        });
    };

};