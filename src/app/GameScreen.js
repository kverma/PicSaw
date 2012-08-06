// Game Screen View

var GameScreen = Backbone.View.extend({
    el:"#main-body",
    template:_.template($("#game-screen-tpl").text()),

    initialize:function () {
        console.log("initing game screen....");
        this.render();
    },

    render:function () {
        var t = this;
        var el = $(this.el);

        el.fadeOut('fast', function() {
            el.empty();
            el.html(t.template({}));
            el.fadeIn('fast');
        });
        return this;
    },
    
    events:{
//        "click  #B1":"logoutUser",
  //      "click  #B2":"logoutUser",
        "click  #B5":"exit"
    },

    exit:function () {
        console.log("Exiting game and going back to start page");
        //unbind event listeners so that obj gets cleanedup
        this.$el.off();
        App.navigate("#", {trigger:true});
    }

});
