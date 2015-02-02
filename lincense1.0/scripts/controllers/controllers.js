/**
 * Created by jiuyuehe on 2015/1/27.
 */
'use strict'
var app = angular.module('license', ['license.directives', 'license.services', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        // controller: 'WelCtrl',
        // resolve:{},
        templateUrl: '/views/wel.html'
    }).when('/login', {
        controller: 'LoginCtrl',
        templateUrl: '/views/login.html'
    }).when('/list',
        {   controller: 'ListCtrl',
            templateUrl: '/views/list.html'
        }
    ).when('/newLic',
        {
            templateUrl: '/views/newLic.html'
        }
    ).when(
        '/licInfo/:licId',
        {
            controller: 'LicInfoCtrl',
            templateUrl: '/views/licInfo.html'
        }
    ).otherwise({redirectTo: '/'});
}]);

//app.controller('WelCtrl', []);

app.controller('LoginCtrl', [
    '$scope',
    '$http',
    '$location',
    loginCtrl]);

app.controller('ListCtrl', ['$scope', '$location', 'LicensesLoader', listCtrl]);

app.controller('NewLicCtrl', ['$scope', '$location', 'LicensesLoader', newLicCtrl]);

app.controller('LicInfoCtrl', ['$scope', '$location', '$routeParams', 'LicensesLoader', licInfoCtrl]);

function licInfoCtrl($scope, $location, $routeParams, LicensesLoader) {
    $scope.params = $routeParams;
    $scope.curLic = {};
    console.log($routeParams);
    //console.log(LicensesLoader.newLic); 需要优化
    LicensesLoader.getLic({id: $routeParams.licId}).then(
        function (result) {
            $scope.curLic = result;
            console.log(result);
        }
    ).catch(function (error) {
            console.log(error);
        });

}

function newLicCtrl($scope, $location, LicensesLoader) {
    //  $scope.params = $routeParams;
    $scope.lic = {};
    $scope.saveLic = function () {
        LicensesLoader.saveLic($scope.lic).then(function (result) {
            $location.path('/licInfo/' + result.id);
        }).catch(function (error) {
            console.log(error);
        });
    };
}

function listCtrl($scope, $location, LicensesLoader) {
    LicensesLoader.getLics(0, 10).then(function (result) {
        $scope.licPages = result.content;
        $scope.newLic = function () {
            $location.path('/newLic/2');
        };
    }).catch(function (error) {
        console.error(error);
    });
}

function loginCtrl($scope, $http, $location) {
    $scope.user = {};
    $scope.login = function () {
        var postDate = {};
        postDate.email = $scope.user.email;
        postDate.password = $scope.user.password;
        $http.post('/api/login', postDate).success(
            function (data, status, headers, config) {
                //成功之后
                console.log(status);
                console.log(data);
                $location.path('/list');
                //if (data == "ok") {
                // $location.path('/list');
                //} else {
                // console.log("he")
                // $location.path('/#/list');
                // }
            }).error(function (data, status, headers, config) {
                //处理错误
                console.log(data);
            });
    }
}