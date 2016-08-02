function uib_w_25_popup_controller($scope, $ionicPopup) {

    $scope.padAssinatura = padAssinatura;

    $scope.criarData = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        return dd + "/" + mm + "/" + yyyy;
    };

    $scope.montar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        console.log('data: ' + $scope.criarData());
        //$("#datafrequencia").val($scope.criarData()); NÃO DEU CERTO =/

        // busca os alunos e monta um select box
        db.findAlunoAll(function (alunos) {
            for (var i = 0; i < alunos.length; i++) {
                // adicionando os itens na lista
                $("#selalunos").append(
                    '<option value=' + alunos[i].codalu + '>' + alunos[i].nomalu + '</option>');

            }
            $("#assAlunos").show();
        });

        db.findTrabalhoAll(function (trabalhos) {
            for (var i = 0; i < trabalhos.length; i++) {
                $("#seltrabalhos").append(
                    '<option value=' + trabalhos[i].codtra + '>' + trabalhos[i].nomtra + '</option>');
            }
            $("#selalunos").show();
        });

        var canvas = document.getElementById("canvasAssinatura");
        padAssinatura = new SignaturePad(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - ((window.innerHeight * 25) / 100);

        activate_subpage("#sbassinatura");
        return false;
    };

    $scope.salvar = function () {

        if ($("#datafrequencia").val() === "") {
            var confirmPopup = $ionicPopup.alert({
                title: 'Alerta',
                template: 'Por favor preencha a data.',
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-positivo',
                        onTap: function (e) {
                            $scope.close;
                        }
                        }]
            });

        } else if (padAssinatura.isEmpty()) {
            var confirmPopup = $ionicPopup.alert({
                title: 'Alerta',
                template: 'Por favor preencha a assinatura.',
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-positivo',
                        onTap: function (e) {
                            $scope.close;
                        }
                        }]
            });
        } else {

            db.insertFrequencia(JSON.stringify({
                "codtra": $("#seltrabalhos").val(),
                "datfrq": $("#datafrequencia").val(),

            }), function (result) {

                var status = result.rowsAffected === 1 ? true : false;
                if (status === true) {
                    // pega o id inserido da frequência
                    var codFrq = result.insertId;

                    db.insertFrequenciaAluno(JSON.stringify({
                        "codalu": $("#selalunos").val(),
                        "codfrq": codFrq,
                        "sitalu": 'P',
                        "assalu": padAssinatura.toDataURL(),

                    }), function (status) {
                        if (status === true) {

                            var confirmPopup = $ionicPopup.alert({
                                title: 'Frequência',
                                template: 'Cadastro realizado com sucesso.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        type: 'button-positivo',
                                        onTap: function (e) {
                                            $scope.limpar();
                                            $scope.listar();
                                        }
                                }]
                            });
                        }
                    });
                }
            });
            activate_subpage("#page_55_16");
        }

        return false;
    };

    $scope.limpar = function () {
        padAssinatura.clear();
        $("#datafrequencia").val("");
        $("#selalunos").val($("#selalunos option:first").val());
        $("#seltrabalhos").val($("#seltrabalhos option:first").val());
    };

    $scope.listar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        db.findAllFreqAluno(function (frequenciaAlunos) {
            // limpando a lista
            $("#lstassinaturas").html("");
            for (var i = 0; i < frequenciaAlunos.length; i++) {
                // adicionando os itens na lista
                $("#lstassinaturas").prepend(
                    '<ion-item id="' + frequenciaAlunos[i].codfrqalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                    '<div class="buttons"> ' +
                    ' <button id="' + frequenciaAlunos[i].codfrqalu + '" name = "' + i + '" class="button button-assertive" onclick="deletarFreqAluno(this.id, ' +
                    frequenciaAlunos[i].codfrq + ')"><i class="icon icon ion-trash-b"></i> ' +
                    ' </button>' +
                    ' </div>' +
                    '<img src="' + frequenciaAlunos[i].assalu + '" height="80" width="80"> ' +
                    frequenciaAlunos[i].nomalu + ' - ' + frequenciaAlunos[i].nomtra + '<br/>' +
                    'Data da assinatura: ' + frequenciaAlunos[i].datfrq + '</ion-item>'
                );
            }
        });
        activate_subpage("#sblassinaturas");
        return false;
    };

}