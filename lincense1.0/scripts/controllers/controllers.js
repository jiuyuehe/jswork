/**
 * Created by jiuyuehe on 2015/1/27.
 */

'use strict'

var app = angular.module('license', ['license.directives', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        // controller: 'WelCtrl',
        // resolve:{},
        templateUrl: '/views/wel.html'
    }).when('/login', {
        controller: 'LoginCtrl',
        templateUrl: '/views/login.html'
    }).otherwise({redirectTo: '/'});
}]);


//app.controller('WelCtrl', []);

app.controller('LoginCtrl', ['$scope', '$http', function ($scope, $http, $location) {
    $scope.user = {};
    $scope.login = function () {
        var postDate = {};
        postDate.email = $scope.user.email;
        postDate.password = $scope.user.password;
        $http.post('/api/login', postDate).success(
            function (data, status, headers, config) {
                //成功之后
                console.log(status);
                //console.log(data);
                if (data == "ok") {
                    $location.path('/list');
                } else {
                    $location.path('/');
                }
            }).error(function (data, status, headers, config) {
                //处理错误
                console.log(data);
            });
    }
}]);
