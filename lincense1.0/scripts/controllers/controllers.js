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
        '/newLic/:licId', {
            // controller: 'editLicCtrl',
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

app.controller('NewLicCtrl', ['$scope', '$location', '$routeParams', 'LicensesLoader', newLicCtrl]);

app.controller('LicInfoCtrl', ['$scope', '$location', '$routeParams', 'LicensesLoader', licInfoCtrl]);

app.controller('EditLicCtrl', ['$scope', '$location', '$routeParams', 'LicensesLoader', editLicCtrl]);

function licInfoCtrl($scope, $location, $routeParams, LicensesLoader) {
    $scope.params = $routeParams;
    $scope.curLic = {};

    $scope.editLic = function () {
        $location.path("/editLic/" + $routeParams.licId);
    }

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

function editLicCtrl($scope, $location, $routeParams, LicensesLoader) {
    $scope.params = $routeParams;
    $scope.lic = {};
    console.log($routeParams)
    LicensesLoader.getLic({id: $routeParams.licId}).then(
        function (result) {
            //  console.log("edit result:" + result);
            $scope.lic = result;
        }
    ).catch(function (error) {
            console.log(error);
        });
}

function newLicCtrl($scope, $location, $routeParams, LicensesLoader) {
    var lic = $scope.lic = {};

    if ($routeParams.licId) {
        $scope.key = false;
        $scope.mac = true;
        LicensesLoader.getLic({id: $routeParams.licId}).then(
            function (result) {
                $scope.lic = result;
            }
        ).catch(function (error) {
                console.log(error);
            });
    }
    $scope.saveLic = function () {

        if ($scope.lic.id) {
            LicensesLoader.updateLic($scope.lic, $scope.lic.licId).then(
                function (result) {
                    console.log(result);
                    $location.path('/licInfo/' + result.id);
                }
            ).catch(
                function (error) {
                    console.log(error);
                }
            );
        } else {
            LicensesLoader.saveLic($scope.lic).then(function (result) {
                $location.path('/licInfo/' + result.id);
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
}

function listCtrl($scope, $location, LicensesLoader) {

    $scope.currentPage = 0;

    $scope.totalPage = 0;

    $scope.licPages = {};

    $scope.first;
    $scope.last;

    $scope.firsts;
    $scope.lasts;

    LicensesLoader.getLics($scope.currentPage, 10).then(function (result) {
        $scope.licPages = result.content;
        $scope.totalPage = result.totalPages;
        $scope.totalElements = result.totalElements;
        $scope.curpage = result.number;
        $scope.first = result.first;
        $scope.last = result.last
        $scope.firsts = result.first == true ? "disabled" : "";
        $scope.lasts = result.last == true ? "disabled" : ""
    });

    $scope.loadPage = function () {
        LicensesLoader.getLics($scope.currentPage, 10).then(function (result) {
            $scope.licPages = result.content;
            $scope.curpage = result.number;
            $scope.totalPage = result.totalPages;
            $scope.totalElements = result.totalElements;
            $scope.first = result.first;
            $scope.last = result.last
            $scope.firsts = result.first == true ? "disabled" : "";
            $scope.lasts = result.last == true ? "disabled" : ""
        });
    }

    $scope.newLic = function () {
        $location.path('/newLic/2');
    };


    $scope.next = function () {
        console.log("print is :+ nextPage");
        if (!$scope.last) {
            $scope.currentPage++;
            $scope.loadPage();
        }
    }
    $scope.pre = function () {
        console.log("print is :+ pre");
        if (!$scope.first) {
            $scope.currentPage--;
            $scope.loadPage();
        }
    }

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