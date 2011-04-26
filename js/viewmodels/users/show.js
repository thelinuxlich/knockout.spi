var UsersVM = {
  name: KO("")
};

$(function(){
  setTimeout(function(){
    ko.applyBindings(UsersVM,"users");
    if(VM.templateParams["id"] === "1") {
      UsersVM.name("Alisson");
    } else {
      UsersVM.name("Freakazoid");
    }
  },0);
});

