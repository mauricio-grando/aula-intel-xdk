function uib_w_25_popup_controller($scope, $ionicPopup) {

    var padAssinatura;

    $scope.criarData = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();

        return dd + "/" + mm + "/" + yyyy;
    };

    $scope.montar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        //$("#datafrequencia").attr("value", $scope.criarData());

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

        } else if (document.getElementById("canvasAssinatura") === null) {
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

            }), function (status) {
                if (status === true) {
                    db.insertFrequenciaAluno(JSON.stringify({
                        "codalu": $("#selalunos").val(),
                        "codfrq": $("#datafrequencia").val(),
                        "sitalu": 'P',
                        "assalu": document.getElementById("canvasAssinatura").toDataURL(),

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
    };

}