// Game Screen View

var GameScreen = Backbone.View.extend({
    el:"#main-body",
    template:_.template($("#game-screen-tpl").text()),

    initialize:function () {
        console.log("initing game screen....");
	ctlr = new SliderCtlr(parseInt(this.options.numofrows)+2, this.options.boardsize);
        this.render();

    },

    render:function () {
        var t = this;
        var el = $(this.el);

//        el.fadeOut('fast', function() {
            el.empty();
            el.html(t.template({}));
  //          el.fadeIn('fast');
   //     });
        return this;
    },
    
   
    events:{
//	"ready": "addCanvasListeners",
//	"mousemove #puzzle": "handleMouseMove",
//	"click #puzzle": "handleClick",
//	"click #B1": "play",
//	"click #B2": "pause",
//	"click #B3": "stop",
  //      "click #B4": "shuffle",
    //    "click #B4": "hint",
        "click #B5":"exit"
    },


    exit:function () {
        console.log("Exiting game and going back to start page");
        //unbind event listeners so that obj gets cleanedup
        this.$el.off();
        App.navigate("#", {trigger:true});
    }
});
