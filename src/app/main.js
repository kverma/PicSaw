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
            "":"startscreen",
            "start":"startscreen",
	    "game/:level": "gamescreen", 
            "settings":"settingsscreen",
            "about":"aboutscreen",
            "help":"helpscreen",
        },

        initialize:function (options) {

        },

        startscreen:function () {
            console.log("Into the start screen");
            new StartScreen();
            setTimeout(function () {
                controller.init();
            }, 100);
        },

	gamescreen: function(level) {
	    console.log("Into the Game Level screen "+level);
	    new GameScreen({
		id: level
	    });
	},

    });

    App = new Application();
    Backbone.history.start();
});

