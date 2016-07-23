var db = new WebSqlDB(sucesso, erro);

function sucesso() {
    console.log("sucesso DB");
}

function erro(error) {
    console.log("Erro de DB: " + error);
}

/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {

        /* button  #btnmenu */
        $(document).on("click", "#btnmenu", function (evt) {
            /*global uib_sb */
            /* Other possible functions are: 
              uib_sb.open_sidebar($sb)
              uib_sb.close_sidebar($sb)
              uib_sb.toggle_sidebar($sb)
               uib_sb.close_all_sidebars()
             See js/sidebar.js for the full sidebar API */

            uib_sb.toggle_sidebar($("#sbmenu"));
            return false;
        });

        $(document).on("click", "#imgaluno", function (evt) {
            navigator.camera.getPicture(
                onSuccessFoto,
                onErrorFoto, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                }
            );
        });

        $(document).on("click", "#btnsincronizar", function (evt) {
            $.ajax({
                async: true,
                type: 'GET',
                // adaptar para sincronização
                url: 'http://rasystems.esy.es/index.php/trabalhos',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                beforeSend: function () {
                    //$('#loading').show();
                },
                complete: function () {
                    //$("#loading").hide();
                },
                success: function (response) {
                    alert(JSON.stringify(response));
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

        var $loading = $("#loading").hide();
        $(document)
            .ajaxStart(function () {
                alert('aaa');
                $loading.show();
                setInterval(function () {}, 10000);
            })
            .ajaxStop(function () {
                $loading.hide();
            });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();

function addAluno() {
    activate_subpage("#sbalunos");
}

function addTrabalho() {
    activate_subpage("#sbtrabalhos");
}

function onErrorFoto(erroFoto) {
    alert("Erro na captura da foto!" + erroFoto);
}

function onSuccessFoto(foto) {
    // exibindo a foto
    $("#imgaluno").attr("src", "data:image/jpeg;base64," + foto);
}

function deletarTrabalho(codtra) {
    navigator.notification.confirm(
        "Deseja excluir este trabalho?",
        function (idx) {
            if (idx === 1) {
                db.deleteTrabalho(JSON.stringify({
                    "codtra": codtra
                }), function (status) {
                    if (status === true) {
                        navigator.notification.alert(
                            'Trabalho removido com sucesso.',
                            function (idx) {},
                            'Alerta',
                            'OK'
                        );
                        // removendo elementos
                        var item = document.getElementById(codtra);
                        item.parentNode.removeChild(item);
                    }
                });
            } else {
                return false;
            }
        },
        "Alerta", ['OK', 'Cancelar']
    );
}

function deletarAluno(codalu) {
    navigator.notification.confirm(
        "Deseja excluir este aluno?",
        function (idx) {
            if (idx === 1) {
                db.deleteAluno(JSON.stringify({
                    "codalu": codalu
                }), function (status) {
                    if (status === true) {
                        navigator.notification.alert(
                            'Aluno removido com sucesso.', // message
                            function (idx) {},
                            'Alerta',
                            'OK'
                        );

                        var item = document.getElementById(codalu);
                        item.parentNode.removeChild(item);
                    }
                });
            } else {
                return false;
            }
        },
        "Alerta", ['OK', 'Cancelar']
    );
}