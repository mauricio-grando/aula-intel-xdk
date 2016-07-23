function uib_w_23_popup_controller($scope, $ionicPopup) {

    $scope.listar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        db.findAlunoAll(function (alunos) {
            // limpando a lista
            $("#lstalunos").html("");
            for (var i = 0; i < alunos.length; i++) {
                // adicionando os itens na lista
                $("#lstalunos").prepend(
                    '<ion-item id="' + alunos[i].codalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                    '<div class="buttons"> ' +
                    ' <button id="' + alunos[i].codalu + '" class="button button-positive"><i class="icon icon ion-edit"></i>                    </button> ' +
                    ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive" onclick="deletarAluno(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                    ' </button>' +
                    ' </div>' +
                    '<img src="' + alunos[i].fotalu + '" height="32" width="32"> ' +
                    alunos[i].nomalu + ' - ' + alunos[i].nomcur + '</ion-item>'
                );
            }
        });
        activate_subpage("#sblalunos");
        return false;
    };

    $scope.show = function () {
        // capturando os dados do aluno da tela        
        var nomeCurso = $("#txtnomecurso").val();
        var nomeAluno = $("#txtnomealuno").val();

        var confirmPopup = $ionicPopup.alert({
            title: 'Informações do aluno',
            template: 'Aluno cadastrado com sucesso ! <br/>Nome: ' + nomeAluno + '<br/> Curso: ' + nomeCurso,
            buttons: [
                {
                    text: 'OK',
                    type: 'button-positivo',
                    onTap: function (e) {
                        $scope.listar();
                    }
                }
            ]
        });
        $("#txtnomealuno").val("");
        $("#txtnomecurso").val("");
    };

    $scope.salvar = function () {
        db.insertAluno(JSON.stringify({
            "nomalu": $("#txtnomealuno").val(),
            "nomcur": $("#txtnomecurso").val(),
            "fotalu": $("#imgaluno").attr('src')
        }), function (status) {
            if (status === true) {
                // capturando os dados do aluno da tela        
                $scope.show();
            }
        });
    };

    $scope.voltar = function () {
        activate_subpage("#sblalunos");
        return false;
    };

}