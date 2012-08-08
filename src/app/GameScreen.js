// Game Screen View

GameScreen = Backbone.View.extend({
    el: $('#main-body'),
    template:_.template($("#game-screen-tpl").html()),
    playing: false,
    moveCounter: 0,


    events:{
	"click #B1": "back",
	"click #B2": "shuffle",
	"click #B3": "hint",
        "click #B4": "toggleplay",
        "click #B5": "changepic"
   },

    initialize:function () {
        console.log("initing game screen....");

	ctlr = new SliderCtlr(parseInt(this.options.numofrows)+2, 
			      this.options.boardsize);

//	this.playing = false;
//	this.moveCounter = -1;
        this.render();

    },

    render:function () {
	var html = this.template();
	$(this.el).html(html);
    },
    
   
    toggleplay: function (e) {
	e.preventDefault();
	console.log("Play button toggleed...");
	var hiddenInput;
	if(!this.playing)
	{
	    this.$('#B2').attr('disabled', true);
//	    hiddenInput.off('click', 'shuffle');
	    hiddenInput = this.$('#start');	   
	    ctlr.addListeners();
	}
	else
	{
//	    hiddenInput = this.$('#B2');	   
	    this.$('#B2').attr('disabled', false);
//	    hiddenInput.on('click', 'shuffle');
	    hiddenInput = this.$('#stop');	   
	    ctlr.removeListeners();
	}
	hiddenInput.click();
	this.playing = !this.playing;
    },

    shuffle: function (e) {
	e.preventDefault();
	console.log("shuffle button pressd...");
	if(!this.playing)
	{
	    var hiddenInput = this.$('#reset');
	    hiddenInput.click();
	    this.moveCounter = -1;
	    this.playing = false;	    
	    ctlr.shuffleTiles();
	    this.incrMoves(e);
	}
	else
	{
	    console.log("do nothing as we are playing");
	}
    },

    hint: function (e) {
	e.preventDefault();
	console.log("hint button pressd...");
	ctlr.toggleHintDisplay();
    },

    changepic: function (e) {
	e.preventDefault();
	ctlr.changePic();
	this.shuffle(e);
    },

    incrMoves: function () {
//	e.preventDefault();
	var ctr = document.getElementById('movecount');
	ctr.innerText = "Moves "+(++this.moveCounter);
	console.log("incrementing button pressd...");
    },
    
    back:function (e) {
	e.preventDefault();
        console.log("Exiting game and going back to start page");
        //unbind event listeners so that obj gets cleanedup
	ctlr.removeListeners();
        this.$el.off();
        App.navigate("#", {trigger:true});
    }
});
