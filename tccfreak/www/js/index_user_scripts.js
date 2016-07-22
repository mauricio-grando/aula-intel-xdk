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

        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            /*global activate_subpage */
            activate_subpage("#sbalunos");
            uib_sb.toggle_sidebar($("#sbmenu"));
            return false;
        });

        /* button  #btnvoltaraluno */
        $(document).on("click", "#btnvoltaraluno", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
            return false;
        });

        /* button  #btnsalvaraluno */
        $(document).on("click", "#btnsalvaraluno", function (evt) {
            // capturando os dados do aluno da tela        
            navigator.notification.alert(
                "Dados do aluno: " +
                $("#txtnomealuno").val() + " - " +
                $("#txtnomecurso").val()
            );
            return false;
        });

        /* button  #btnsair 
        $(document).on("click", "#btnsair", function (evt) {
            var r = confirm("Você deseja realmente sair?");
            if (r === true) {
                navigator.app.exitApp();
            } else {
                return false;
            }
        }); */

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

        /* button  #btnsalvaraluno */
        $(document).on("click", "#btnsalvartrabalho", function (evt) {
            // capturando os dados do aluno da tela        
            navigator.notification.alert("Dados do trabalho: " +
                $("#txtnometrabalho").val() + " - " +
                $("#txtnomealuno").val()
            );
            return false;
        });

        /* button  #btninformacoes
        $(document).on("click", "#btninformacoes", function (evt) {
            navigator.notification.alert("Unknown error occured while connecting to server", "Error", "OK");
            navigator.notification.alert('TCC Freak<br/> Autor: Grando <br/> Cordova version: ' + cordova.version + '<br/>' + 'Plataforma: ' + device.platform + '<br/>' + 'Modelo: ' + device.model.name);
        }); */

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();