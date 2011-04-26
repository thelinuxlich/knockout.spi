var CarsVM = {
  someVar: "A binding value from Cars page."
};

$(function(){
    ko.applyBindings(CarsVM,"cars");
});

