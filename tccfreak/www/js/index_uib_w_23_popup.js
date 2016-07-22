function uib_w_23_popup_controller($scope, $ionicPopup) {

    $scope.show = function () {
        // capturando os dados do aluno da tela        
        var nomeCurso = $("#txtnomecurso").val();
        var nomeAluno = $("#txtnomealuno").val();

        var confirmPopup = $ionicPopup.alert({
            title: 'Informações do aluno',
            template: 'Nome: ' + nomeAluno + '<br/>' +
                'Curso: ' + nomeCurso,
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

}