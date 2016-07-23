function uib_w_22_popup_controller($scope, $ionicPopup) {

    $scope.listar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        // listar dados dos trabalhos
        db.findTrabalhoAll(function (trabalhos) {
            // limpando a lista
            $("#lsttrabalhos").html("");
            for (var i = 0; i < trabalhos.length; i++) {
                // adicionando os itens na lista
                $("#lsttrabalhos").prepend(
                    '<ion-item id="' + trabalhos[i].codtra + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                    '<div class="buttons"> ' +
                    ' <button id="' + trabalhos[i].codtra + '" class="button button-positive" onclick="editTrabalho(this.id)"><i class="icon icon ion-edit"></i>                    </button> ' +
                    ' <button id="' + trabalhos[i].codtra + '" name = "' + i + '" class="button button-assertive" onclick="deletarTrabalho(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                    ' </button>' +
                    ' </div>' +
                    trabalhos[i].codtra + ' - ' + trabalhos[i].nomtra + ' - ' + trabalhos[i].nomcur + '</ion-item>'
                );
            }
        });

        /*global activate_subpage */
        activate_subpage("#sbltrabalhos");
        return false;
    };

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
                        $scope.listar();
                    }
                }
            ]
        });

        $("#txtnometrabalho").val("");
        $("#txtnomealunotrab").val("");

        activate_subpage("#sbltrabalhos");
    };

    $scope.salvar = function () {
        db.insertTrabalho(JSON.stringify({
            "nomtra": $("#txtnometrabalho").val(),
            "nomcur": $("#txtnomealunotrab").val(),
        }), function (status) {
            if (status === true) {
                // capturando os dados do aluno da tela        
                $scope.show();
            }
        });
    };

    $scope.voltar = function () {
        /*global activate_subpage */
        activate_subpage("#sbltrabalhos");
        return false;
    };
}