var AdminVM = {
  someVar: "A binding value from Admin page."
};

$(function(){
    ko.applyBindings(AdminVM,"admin");
});
