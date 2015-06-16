(function () {
    'use strict';

    angular.module('fancyboxplus', [])
        .service('fancyboxplusService', fancyboxService)
        .directive('fancyboxPlus', fancyboxPlusDirective);

    function fancyboxService() {

        //Fancybox JavaScript API reference:
        // fancybox.net/api

        var service = {
            fancyboxplus: fancyboxplus, //returns the fancyboxplus jquery plugin

            showActivity: showActivity,//Shows loading animation
        hideActivity: hideActivity,//Hides loading animation
        next: next,//Displays the next gallery item
        prev: prev,//Displays the previous gallery item
        pos: pos,//Displays item by index from gallery
        cancel: cancel,//Cancels loading content
        close: close,//Hides FancyBox. Within an iframe use - parent.close();
        resize: resize,//Auto-resizes FancyBox height to match height of content
        center: center//Centers FancyBox in viewport
        };
        return service;

        ////////////


        function fancyboxplus() {
            return $.fancyboxplus;
        }

        function showActivity() {
            fancyboxplus().showActivity();
        }

        function hideActivity() {
            fancyboxplus().hideActivity();
        }

        function pos() {
            fancyboxplus().pos();
        }

        function cancel() {
            fancyboxplus().cancel();
        }

        function center() {
            fancyboxplus().center();
        }

        function next() {
            fancyboxplus().next();
        }

        function prev() {
            fancyboxplus().prev();
        }

        function close() {
            fancyboxplus().close();
        }

        function resize() {
            fancyboxplus().resize();
        }
    }

    fancyboxPlusDirective.$inject = ['$compile', '$rootScope', '$http', '$parse', '$timeout', 'fancyboxService'];
    function fancyboxPlusDirective($compile, $rootScope, $http, $parse, $timeout, fancyboxService) {
        var service = {
            restrict: 'E',
            scope: {
                open: '=',
                options: '=',
                templateUrl: '&',

                onStart: '&', //Will be called right before attempting to load the content
                onCancel: '&', //Will be called after loading is canceled
                onComplete: '&', //Will be called once the content is displayed
                onCleanup: '&', //Will be called just before closing
                onClosed: '&' //Will be called once FancyBox is closed

            },
            require: 'fancyboxplus',
            link: link,
            controller: controller,
            controllerAs: 'vm'
        };
        return service;

        ////////////////////////////

        controller.$inject = ['$scope'];
        function controller($scope) {

        }

        link.$inject = ['$scope', '$element', '$attributes'];
        function link($scope, $element, $attributes, controller) {
            var cb = null;

            $scope.$watch('open', function (newValue, oldValue) {
                //console.log("watch $scope.open(" + $scope.open + ") " + oldValue + "->" + newValue);
                if (oldValue !== newValue) {
                    updateOpen(newValue);
                }
            });

            $scope.$on('$destroy', function () {
                $element.remove();
            });

            init();

            function updateOpen(newValue) {
                if (newValue) {
                    init(newValue);
                } else {
                    fancyboxService.close();
                }
            }

            function init(open) {
                var options = {
                    href: $attributes.src,
                    boxFor: $attributes.boxFor,
                    onOpen: function () {
                        if ($scope.onOpen && $scope.onOpen()) {
                            $scope.onOpen()();
                        }
                    },
                    onCancel: function () {
                        if ($scope.onCancel && $scope.onCancel()) {
                            $scope.onCancel()();
                        }
                    },
                    onComplete: function () {
                        onComplete();
                        if ($scope.onComplete && $scope.onComplete()) {
                            $scope.onComplete()();
                        }
                    },
                    onCleanup: function () {
                        if ($scope.onCleanup && $scope.onCleanup()) {
                            $scope.onCleanup()();
                        }
                    },
                    onClosed: function () {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                        if ($scope.onClosed && $scope.onClosed()) {
                            $scope.onClosed()();
                        }
                    }
                };

                //generic way that sets all (non-function) parameters of colorbox.
                if ($scope.options) {
                    angular.extend(options, $scope.options);
                }

                //clean undefined
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        if (typeof(options[key]) === 'undefined') {
                            delete options[key];
                        }
                    }
                }

                if (typeof(open) !== 'undefined') {
                    options.open = open;
                }

                //wait for the DOM view to be ready
                $timeout(function () {
                    if (options.boxFor) {
                        //opens the element by id boxFor
                        cb = $(options.boxFor).fancyboxplus(options);
                    } else if (options.href) {
                        //opens the colorbox using an href.
                        cb = $.colorbox(options);
                    }
                }, 0);
            }

            function onComplete() {
                /*$rootScope.$apply(function () {
                    var content = $('#cboxLoadedContent');
                    $compile(content)($rootScope);
                });*/
            }
        }
    }

})
();



(function(angular, $) {
    'use strict';

    var module = angular.module('ngx.ui.lightbox', ['ngx.config', 'ngx.loader']);

    /**
     * Lightbox directive
     */
    module.directive('ngxLightbox', ['ngxConfig', 'ngxLoader', function(ngxConfig, ngxLoader) {
        var deps = [
            ngxConfig.libsPath + 'jquery.fancybox/jquery.fancybox.js',
            ngxConfig.libsPath + 'jquery.fancybox/css/fancybox.css'
        ];

        return {
            link: function(scope, element, attrs) {
                // group tag
                if (attrs.ngxLightbox) {
                    element.attr('rel', attrs.ngxLightbox);
                }

                ngxLoader(deps, function() {
                    $(element).fancybox({
                        onStart: function(items, index, options) {
                            var arrowStyle = {
                                height: '100%',
                                bottom: 0
                            };

                            angular.extend(options, {
                                href: (attrs.href || attrs.src),
                                title: attrs.title,
                                titlePosition: 'inside',
                                speedIn: 150,
                                speedOut: 150
                            });

                            // autoset options by attributes
                            if (options.href.match(/youtube\.com/)) {
                                // youtube video
                                angular.extend(options, {
                                    type: 'swf',
                                    href: attrs.href + '?autoplay=1&fs=1',        // AS3 + autoplay + fullscreen
                                    width: 661,
                                    height: 481,
                                    swf: {
                                        wmode: 'transparent',
                                        allowfullscreen: true
                                    }
                                });
                                angular.extend(arrowStyle, {
                                    height: '40%',
                                    bottom: '30%'
                                });

                            } else if (options.href.match(/(jpg|png|gif|bmp)$/) || options.href.match(/^data:image\//)) {
                                // image
                                options.type = 'image';

                            } else {
                                // iframe
                                angular.extend(options, {
                                    type: 'iframe',
                                    width: '90%',
                                    height: '95%'
                                });
                            }

                            // override default options from attributes
                            angular.forEach(['width', 'height', 'title', 'type'], function(attr) {
                                if (attrs[attr]) {
                                    options[attr] = attrs[attr];
                                }
                            });

                            $('#fancybox-left').css(arrowStyle);
                            $('#fancybox-right').css(arrowStyle);

                            return options;
                        }
                    });
                });
            }
        };
    }]);

})(window.angular, window.jQuery);
