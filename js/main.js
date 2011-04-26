var VM = {
  someVar: "Hello, a binding from main page.",
  templateParams: {},
  actualTemplate: KO("main/index")
};

VM.templateMode = function() {
    var tmpl = VM.actualTemplate();
    var url = tmpl.split("?");
    if(url[1] !== null && url[1] !== undefined) {
      var params = url[1].split("&");
      for(var i = 0; i < params.length;i++) {
        param = params[i].split("=");
        VM.templateParams[param[0]] = param[1];
      }
    } else {
      VM.templateParams = {};
    }
    $.address.autoUpdate(false);
    $.address.value(tmpl.replace("/",":"));
    $.address.autoUpdate(true);
    return url[0];
};

$(function(){
  ko.externaljQueryTemplateEngine.setOptions({
        templateUrl: "apps/views",
        templatePrefix: "",
        templateSuffix: ".html"
  });
  ko.applyBindings(VM);
  $.address.init(function(e) {
    VM.actualTemplate("main/index");
  }).change(function(e){
      VM.actualTemplate(e.value.replace(/^\//,"").replace(":","/"));
  });
});

