// Game Screen View

var GameScreen = Backbone.View.extend({
    el:"#main-body",
    template:_.template($("#game-screen-tpl").text()),
    playing: false,
    moveCounter: 0,

    initialize:function () {
        console.log("initing game screen....");
	ctlr = new SliderCtlr(parseInt(this.options.numofrows)+2, this.options.boardsize);
	this.playing = false;
	this.moveCounter = -1;
        this.render();

    },

    render:function () {
        var t = this;
        var el = $(this.el);

      //  el.fadeOut('fast', function() {
            el.empty();
            el.html(t.template({}));
       // el.fadeIn('fast');
      // });
        //return this;
    },
    
   
    events:{
	"click #B1": "back",
	"click #B2": "shuffle",
	"click #B3": "hint",
        "click #B4": "toggleplay",
        "click #B5": "changepic"
    },

    toggleplay: function () {
	console.log("Play button toggleed...");
	var hiddenInput;
	if(!this.playing)
	{
	    hiddenInput = this.$('#start');
	    this.playing = true;
	    ctlr.addListeners();
	}
	else
	{
	    hiddenInput = this.$('#stop');
	    this.playing = false;
	    ctlr.removeListeners();
	}
	hiddenInput.click();
    },

    shuffle: function () {
	console.log("shuffle button pressd...");

	var hiddenInput = this.$('#reset');
	hiddenInput.click();
	this.moveCounter = 0;
	this.playing = false;
	ctlr.shuffleTiles();
    },

    hint: function () {
	console.log("hint button pressd...");
	ctlr.toggleHintDisplay();
//	this.incrMoves();
    },

    changepic: function () {
	ctlr.changePic();
	this.shuffle();
    },

    incrMoves: function () {
	var ctr = document.getElementById('movecount');
	this
	ctr.innerText = "Moves "+(this.moveCounter+1);
	console.log("hint button pressd...");
    },
    
    back:function () {
        console.log("Exiting game and going back to start page");
        //unbind event listeners so that obj gets cleanedup
	ctlr.removeListeners();
        this.$el.off();
        App.navigate("#", {trigger:true});
    }
});
