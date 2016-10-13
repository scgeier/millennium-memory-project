
var app = angular.module('interviews', ['ngAnimate']);

app.controller('InterviewsController', ['$http', function($http) {

    var sortProperty = null;
    this.interviews = [];

//Use consultant's name as the default sorting category in the table (in alphabetical order)//
    this.sortProperty = "last";
    this.reverseSort = false;
    
//Sort the chosen column on ng-click
    this.sort = function(prop){
                  this.sortProperty = prop;
                  this.reverseSort = !this.reverseSort;
                };
    
    var _this = this;

//Call the JSON data//
    $http.get('js/interviews.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.interviews = data;
            

        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });

            
   this.activeInt = "";
   this.chosenInterviews = [];
   
   this.setActiveInt = function(item){
    this.activeInt = item;
    console.log(item);
    
    this.isVisible = true;
    
    };
    
    this.closeBox = function(){
        this.isVisible = false;
    };
  
}]);

