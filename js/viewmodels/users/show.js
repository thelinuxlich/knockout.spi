var UsersVM = { 
  name: KO("")
};

UsersVM.name.subscribe(function(value){
  console.log("Name set to "+value);
});

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
