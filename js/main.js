var VM = {
  someVar: "Hello, a binding from main page.",
  templateParams: {},
  actualTemplate: KO("main/index"),
  updateTemplate: false,
  updateAddress: false
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
    if(VM.updateTemplate !== false) {
      VM.updateAddress = false;
      $.address.value(tmpl.replace("/",":"));
    } else {
      VM.updateTemplate = true;
    } 
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
    VM.updateTemplate = true;
    VM.actualTemplate("main/index");
  }).externalChange(function(e){
      if(VM.updateAddress !== false) {
        VM.updateTemplate = false;
        VM.actualTemplate(e.value.replace(/^\//,"").replace(":","/"));
      } else {
        VM.updateAddress = true;
      } 
  });
});

