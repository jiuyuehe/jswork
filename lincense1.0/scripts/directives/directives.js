/**
 * Created by jiuyuehe on 2015/1/28.
 */
'use strict'
angular.module('license.directives', []);
angular.module('license.directives').directive('focus',
    function () {
        return {
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        };
    });
