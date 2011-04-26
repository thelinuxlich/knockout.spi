var AboutVM = {
  someVar: "A binding value from About page."
};

$(function(){
    ko.applyBindings(AboutVM,"about");
});
