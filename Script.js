

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
$scope.init = function()
    {
        $scope.size = 20
        $scope.tick = 0;
        $scope.score=0;
    
        $scope.vec=[1,0];
        $scope.record = [[2,3]];
    
       
        $scope.createMap();
    
        $scope.newfood();
    
        $scope.time = $interval(function()
        {
            $scope.tick++;
            $scope.step($scope.vec[0],$scope.vec[1]);
            console.log($scope.vec);
        }, 150);
    
    
    };
 
    
    $scope.createMap = function(){
        $scope.line = new Array($scope.size);
    
        $scope.line[0] = $scope.border();
        for(i =1; i<$scope.size-1;i++)
        {
               $scope.line[i] = $scope.printme();
        }
        $scope.line[$scope.size-1] = $scope.border();
    }
    
    
    $scope.printme = function()
    {
        return "|"+" ".repeat($scope.size-2)+"|";
    };
    
    $scope.border=function()
    {
        return "-".repeat($scope.size);
    }
    
    $scope.newfood = function(){
        
        do{
        $scope.food = [Math.round((Math.random() * ($scope.size-2) +1)), Math.round((Math.random() *( $scope.size-2) +1 ))]
        }
        while($scope.line[$scope.food[0]].charAt($scope.food[1])!=" ".charAt(0));
        $scope.editline($scope.food, '*');
    }
    
    
    $scope.edit = function(str, pos, newchr){
        return str.substr(0,pos) +newchr +str.substr(pos+1);
    }
    
    $scope.editline = function(pos, char){
        $scope.line[pos[0]] = $scope.edit($scope.line[pos[0]], pos[1], char);
    }
    
    $scope.step = function(x,y){
        var before = [$scope.record[0][0], $scope.record[0][1]]
        var add = [before[0]+y,before[1]+x];
        
        if(add[0] >=$scope.size-1 || add[0] <= 0 || add[1]>=$scope.size-1 || add[1] <= 0 || $scope.line[add[0]].charAt(add[1]) == "x".charAt(0))
        {
            $scope.gameOver();
        }
        $scope.record.unshift(add);
        
        
        
        $scope.editline(add, 'o');
        $scope.editline(before, 'x');
        if(add[0] == $scope.food[0] && add[1] == $scope.food[1])
        {
            $scope.score++;
            $scope.newfood();
        }
        else{
            var temp = $scope.record.pop();
            $scope.editline(temp, ' ');
        }
    }
    
    
    $scope.gameOver = function(){
        $interval.cancel($scope.time);
          document.getElementById("game").innerHTML="GAME OVER!";
    }
    
    $scope.turn = function(x,y)
    {
        if(Math.abs(x-$scope.vec[0]) < 2 && Math.abs(y-$scope.vec[1]) < 2)
            $scope.vec=[x,y];
    }
    
    $scope.key = function($event){
        console.log($event.keyCode);
        if ($event.keyCode == 38)
            $scope.turn(0,-1);
        else if ($event.keyCode == 39)
            $scope.turn(1,0);
        else if ($event.keyCode == 40)
            $scope.turn(0,1);
        else if ($event.keyCode == 37)
            $scope.turn(-1,0);
}
    
    
});  
