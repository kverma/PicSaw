/*
 *
 * ReadBerry - Read It Later/Pocket Client for BB Playbook
 * By: Krish Verma (http://kverma.tumblr.com)
 *
 *
 */


var ctlr = null;


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
           
        },

	gamescreen: function(level) {
	    console.log("Into the Game Level screen "+level);
	    var gs = new GameScreen({
		id: level,
		numofrows: level,
		boardsize: 480,
	    });
	    
	    setTimeout(function () {
                ctlr.init();
            }, 100);
	},

    });

    App = new Application();
    Backbone.history.start();
});

