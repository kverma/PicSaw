
var APP_CACHE_DIR_ROOT = null;

function getAppCacheRoot() {
    if (isWebworksEnv() && !APP_CACHE_DIR_ROOT) {
        APP_CACHE_DIR_ROOT = blackberry.io.dir.appDirs.app.storage.path + '/appdata/_cache/';
        if (!blackberry.io.dir.exists(APP_CACHE_DIR_ROOT)) {
            console.log("Creating offline Cache directory " + APP_CACHE_DIR_ROOT);
            blackberry.io.dir.createNewDir(APP_CACHE_DIR_ROOT);
        }
    }
    return APP_CACHE_DIR_ROOT;
}


function invokeurl(url) {
    console.log("Invoking Browser with Url " + url);
    if (isWebworksEnv()) {
        var args = new blackberry.invoke.BrowserArguments(url);
        blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
    }
    else {
        window.open(url);
    }
}

function isWebworksEnv() {
    return !(typeof blackberry === "undefined")
}

Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
}

function getElem(selector, $root, $collection) {
    if (!$root) $root = $(document);
    if (!$collection) $collection = $();
    // Select all elements matching the selector under the root
    $collection = $collection.add($root.find(selector)); console.log($collection);
    // Loop through all frames
    $root.find('iframe,frame').each(function() {
        // Recursively call the function, setting "$root" to the frame's document
        $collection = $collection.add(getElem(selector, $(this).contents(), $collection));
    });console.log('*');console.log($collection);
    return $collection;
}


$link.each(function() { 
    console.log('URL = '+this.href);  
    $(this).click(function(e) {
       e.preventDefault(); console.log("clicked a google add");
     });
  });

