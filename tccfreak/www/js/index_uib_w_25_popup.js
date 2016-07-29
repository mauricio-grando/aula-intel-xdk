function uib_w_25_popup_controller($scope, $ionicPopup) {

    var padAssinatura;

    $scope.listar = function () {
        uib_sb.close_sidebar($("#sbmenu"));
        activate_subpage("#sbassinatura");

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

        //var canvas = document.getElementById("canvasAssinatura");
        //padAssinatura = new SignaturePad(canvas);
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight - ((window.innerHeight * 25) / 100);

        return false;
    };

    $scope.salvar = function () {

        db.insertFrequencia(JSON.stringify({
            "codtra": $("#seltrabalhos").val(),
            "datfrq": $("#datafrequencia").val()

        }), function (status) {
            alert(status);
            if (status === true) {
                db.insertFrequenciaAluno(JSON.stringify({
                    "codalu": $("#selalunos").val(),
                    "codfrq": $("#datafrequencia").val(),
                    "sitalu": 'P',
                    "assalu": $("#canvas").html(padAssinatura.toDataURL())

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
                                        $scope.listar();
                                    }
                                }]
                        });
                    }
                });
            }
        });

        activate_subpage("#page_55_16");
        return false;
    };

    $scope.limpar = function () {
        padAssinatura.clear();
    };

}