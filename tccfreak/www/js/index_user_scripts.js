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

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();