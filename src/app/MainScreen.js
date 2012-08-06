// Login Screen View to start with

var MainScreen = Backbone.View.extend({
    el:"#main-body",
    template:_.template($("#main-screen-tpl").text()),

    initialize:function () {
        console.log("initing start screen....");
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
    },

    events:{
        "submit #login-form":"loginUser"
    },

    loginUser:function () {
        console.log("Entering form submit handler");
        // TODO - check whether any input was given or not.
        var logincred = {
            username:this.$("#username-field").val(),
            password:this.$("#password-field").val(),
            apikey:POCKET_CONSTANTS.apikey
        };

        if (!logincred.username || !logincred.password) {
            console.log("Login Details not avail:" + JSON.stringify(logincred));
            return false;
        }
        console.log("Login Details:" + JSON.stringify(logincred));
        this.$el.mask("Loging In...");
        // set the username/password etc into local storage
        controller.appSettings.set({username:logincred.username,
            password:logincred.password,
            isloggedin:false,
            isauthchecked:false});
        controller.appSettings.save();

        var request = $.ajax({
            url:POCKET_CONSTANTS.authurl,
            data:logincred,
            context:this,
            success:loginSuccessfull, // (logincred.username, logincred.password),
            error:loginError, //(xhr, textStatus, errorThrown),
            complete:loginCallComplete
        });


        function loginCallComplete() {
            this.$el.unmask();
        }

        function loginSuccessfull(uname, passwd) {
            this.$el.unmask();
            console.log("Login successfull ..... yaya");

            // username/password already stored.
            controller.appSettings.set({isloggedin:true,
                isauthchecked:true});
            controller.appSettings.save();

            //unbind event listeners so that obj gets cleanedup
            this.$el.off();

            //route to the main page
            App.navigate("#main", {trigger:true});
        }

        function loginError(xhr, textStatus, errorThrown) {
            controller.appSettings.set({isloggedin:false});
            controller.appSettings.save();

            // Get the error message from RIL server response
            var serverMsg = xhr.getResponseHeader('x-error');

            console.log("Login failed :-( with error: " + textStatus + " error msg : " + errorThrown + " serverMsg " + serverMsg);

            // Get the template for showing login errors
            var errorMsgView = _.template($("#error-screen-tpl").text(), {title:'Login Failed', msg:serverMsg});

            // Inject the tempalte for the modal dialog in the placeholder
            this.$('#error-holder-div').replaceWith(errorMsgView);

            // Hide the mask
            this.$el.unmask();

            // show the modal dlg with the entire panel as the backdrop.
            this.$('#error-pane').modal({backdrop:this.$('#login-screen')});
        }

        return false;

    },
});
