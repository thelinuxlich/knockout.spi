function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var VM = {
  actualTemplate: KO("main#index"),
  someVar: "Hello, a binding from main page.",
  templateMode: function() {
   var route = VM.actualTemplate().split("#");
   return route[0]+"/views/"+route[1];
  },
  bindingsApplied: {}
};

// This would be defined on a separate file
var routes = {
    "users": {
        "index": {
            file: "apps/users/viewmodels/index.js",
        }
    },
    "main": {
        "index": {
            file: "apps/users/viewmodels/index.js",
        }
    },
    "cars": {
        "index": {
            file: "apps/cars/viewmodels/index.js",
        }
    },
    "about": {
        "index": {
            file: "apps/about/viewmodels/index.js",
        }
    },
    "admin": {
        "index": {
            file: "apps/admin/viewmodels/index.js",
        }
    },
};

VM.loadScript = function(route,file,object,namespace) {
    if(route in VM.bindingsApplied === false) {
      $.getScript(file, function(){
        VM.bindingsApplied[route] = true;
        setTimeout(function() {
            ko.applyBindings(window[object],namespace);
        },0);
      });
    } else {
      setTimeout(function() {
          ko.applyBindings(window[object],namespace);
      },0);
    }
};

VM.actualTemplate.subscribe(function(value){
    var route = value.split("#");
    VM.loadScript(value,routes[route[0]][route[1]]["file"], capitaliseFirstLetter(route[0])+"VM",route[0]);
});

$(function(){
  ko.externaljQueryTemplateEngine.setOptions({
        templateUrl: "apps",
        templatePrefix: "",
        templateSuffix: ".html"
  });
  ko.applyBindings(VM);
});

