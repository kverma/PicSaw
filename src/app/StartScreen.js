// Start Screen View to start with

var StartScreen = Backbone.View.extend({
    el:"#main-body",
    template:_.template($("#start-screen-tpl").text()),

    initialize:function () {
        console.log("initing start screen....");
        this.render();
    },

    render:function () {
        var t = this;
        var el = $(this.el);

//        el.fadeOut('fast', function () {
            el.empty();
            el.html(t.template({}));
  //          el.fadeIn('fast');
    //    });
    },

    events:{
        "click #L1": "startGameLevel1",
	"click #L2": "startGameLevel2",
	"click #L3": "startGameLevel3",
    },

    startGameLevel1 :function () {
	this.routeToGameLevel(1);
    },
    
    startGameLevel2 :function () {
	this.routeToGameLevel(2);
    },
    
    startGameLevel3 :function () {
	this.routeToGameLevel(3);
    },
    
    routeToGameLevel:function(level) {
	this.$el.off();
	//route to the main page
        App.navigate("#game/"+level, {trigger:true});
    },
});
