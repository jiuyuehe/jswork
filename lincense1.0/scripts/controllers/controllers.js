/**
 * Created by jiuyuehe on 2015/1/27.
 */

'use strict'

var app = angular.module('license', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'WelCtrl',
        // resolve:{},
        templateUrl: '/views/wel.html'
    }).when('/login', {
        controller: 'LoginCtrl',
        templateUrl: '/views/login.html'
    })
}]);
