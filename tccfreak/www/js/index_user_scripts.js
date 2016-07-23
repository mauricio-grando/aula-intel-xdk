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

        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            uib_sb.toggle_sidebar($("#sbmenu"));
            // listar dados dos trabalhos
            db.findAlunoAll(function (alunos) {
                // limpando a lista
                $("#lstalunos").html("");
                for (var i = 0; i < alunos.length; i++) {
                    // adicionando os itens na lista
                    $("#lstalunos").prepend(
                        '<ion-item id="' + alunos[i].codalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + alunos[i].codalu + '" class="button button-positive"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive" onclick="deleteAluno(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        '<img src="' + alunos[i].fotalu + '" height="32" width="32"> ' +
                        alunos[i].nomalu + ' - ' + alunos[i].nomcur + '</ion-item>'
                    );
                }
            });

            /*global activate_subpage */
            //document.getElementById("addaluno").style.display = "block";
            //document.getElementById("addaluno").style.visibility = "visible";
            activate_subpage("#sblalunos");
            return false;
        });


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

        /* button  #btnalunos */


        /* button  #btnvoltaraluno */
        $(document).on("click", "#btnvoltaraluno", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
            return false;
        });

        /* button  #btntrabalhos */
        $(document).on("click", "#btntrabalhos", function (evt) {
            /*global activate_subpage */
            activate_subpage("#sbtrabalhos");
            uib_sb.toggle_sidebar($("#sbmenu"));
            return false;
        });

        /* button #btnvoltartrabalhos */
        $(document).on("click", "#btnvoltartrabalhos", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
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

        /* button  #btnalunos */


        /* button  #btnalunos */


        /* button  #btnalunos */


        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            /*global activate_subpage */
            activate_subpage("#sbalunos");
            return false;
        });

        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            /*global activate_subpage */
            activate_subpage("#sblalunos");
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();

function addAluno() {
    activate_subpage("#sbalunos");
}

function onErrorFoto(erroFoto) {
    alert("Erro na captura da foto!" + erroFoto);
}

function onSuccessFoto(foto) {
    // exibindo a foto
    $("#imgaluno").attr("src", "data:image/jpeg;base64," + foto);
}