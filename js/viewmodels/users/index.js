var UsersVM = {
  someVar: "A binding value from Users page."
};

$(function(){
    ko.applyBindings(UsersVM,"users");
});

