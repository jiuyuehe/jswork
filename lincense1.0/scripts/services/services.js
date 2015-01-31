/**
 * Created by jiuyuehe on 2015/1/28.
 */

'use strict'
var services = angular.module('license.services', ['ngResource']);

services.factory('Licenses', ['$resource',
    function ($resource) {
        return $resource('/api/lics/:id', {id: '@id', page: '@page', size: '@size'});
    }]);

services.factory('LicensesLoader', ['Licenses', '$q', function (Licenses, $q) {
    return function () {
        return {
            getLics: function (page, size) {
                var delay = $q.defer();
                Licenses.get({page: page, size: size}, function (result) {
                    console.log('result: ', result);
                    delay.resolve(result);
                }, function (err) {
                    console.log('err: ', err)
                    delay.reject(err || 'error');
                });
                return delay.promise;
            },

            getLic: function (id) {
                var delay = $q.defer();
                Licenses.get({id: id}, function (result) {
                    delay.resolve(result)
                }, function (err) {
                    delay.reject(err);
                });
                return delay.promise;
            },
            saveLic : function (lic) {
                var delay = $q.defer();
                Licenses.save(lic, function (result) {
                    delay.resolve(result);
                }, function (err) {
                    delay.reject(err || 'error');
                });
                return delay.promise;
            }
        }
    }
}]);


services.factory("UserLicences", [
    '$resource',
    function ($resource) {
        var userLicencesRes = $resource("/users/:userId/lics/:licId", {
            userid: '@userId',
            licId: '@licId',
            page: '@page',
            size: '@size'});
        return  {
            getAll: function (page, size) {
                var delay = $q.defer();
                return userLicencesRes.query({page: page, size: size});
            },

            getUserLics: function (userId, page, size) {
                return userLicencesRes.query({userId: userId, page: page, size: size});
            },

            getUserLic: function (userId, licId, page, size) {
                return userLicencesRes.query({userId: userId, licId: licId, page: page, size: size});
            }
        }
    }
]);
