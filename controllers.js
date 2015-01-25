/**
 * Created by 植物 on 2015/1/25.
 */

var aMailServices = angular.module('AMail',[]);

function emailRouteConfig($routeProvider){
    $routeProvider.when('/',{controller:ListController,templaterUrl:'list.html'}).
        when('/view/:id',{
            controller:DetailController,
            templateUrl:'detail.html'
        }).otherwise({
            redirectTo:'/'
        });
}

aMailServices.config(emailRouteConfig);

messages = [
    {id:0,sender:'jean@qycloud.com',subject:"hi give me some money!",date:'2014-12-05',recipients:['xiao@qycloud.com'],
    message:'sorry , I forget the wall , please give me 80 '},
    {id:1,sender:'jobs@qycloud.com',subject:"hi give me some money!",date:'2014-11-05',recipients:['xiao@qycloud.com'],
        message:'sorry , I forget the wall , please give me 80 '},
    {id:2,sender:'bill gess@qycloud.com',subject:"hi give me some money!",date:'2014-10-05',recipients:['xiao@qycloud.com'],
        message:'sorry , I forget the wall , please give me 80 '}
   ];

function ListController($scope){
    $scope.messages = messages;
}

function DetailController($scope,$routParams){
    $scope.message = messages[$routParams.id];
}

