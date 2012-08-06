/*
 *
 * ReadBerry - Read It Later/Pocket Client for BB Playbook
 * By: Krish Verma (http://kverma.tumblr.com)
 *
 *
 */

function MainAppCtlr() {
    this.version = "0.1";
}

MainAppCtlr.prototype.init = function () {
//    this.syncList();
}

// View of the about screen
var AboutScreen = Backbone.View.extend({
    el:"#hk-main",
    template:_.template($("#about-screen").text()),

    initialize:function () {
        this.render();
    },
    render:function () {
        var t = this;
        var el = $(this.el);

        el.fadeOut('fast', function () {
            el.empty();
            el.html(t.template({}));
            el.fadeIn('fast');
        });
    }
});

var controller = new MainAppCtlr();


$(function () {

    var Application = Backbone.Router.extend({
        routes:{
            "":"mainscreen",
            "login":"loginscreen",
            "main":"mainscreen",
            "settings":"settingsscreen",
            "about":"aboutscreen",
            "help":"helpscreen",
        },

        initialize:function (options) {

        },

        start:function () {
            console.log("Tracing start fn...");
            App.navigate("#main", {trigger:true});
        },


        mainscreen:function () {
            console.log("Into the main screen");
            // fetch all articles and save in localdb
            // controller.init();
            /*
             $(document).bind( "touchmove", function (e) { e.preventDefault(); return false; } );

             //adding delay actually makes the app start faster, and enables loading animation to be displayed


             bodyView.view.click( function(event) {
             window.splitViewNavigator.showSidebar();
             });

             //Setup the ViewNavigator
             new SplitViewNavigator( '#main-body', "Select Bookmark", "btn btn-inverse" );
             window.splitViewNavigator.pushSidebarView( articlesView );
             window.splitViewNavigator.pushBodyView( bodyView );
             window.splitViewNavigator.showSidebar();
             */

            new MainScreen();
            setTimeout(function () {
                //$('#main-body').mask("Loading Articles...");
                controller.init();
            }, 100);
        },

    });


    App = new Application();
    Backbone.history.start();
});

