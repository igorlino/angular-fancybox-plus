angular.module('fancyboxdemo', [
    'fancyboxdemo.controllers',
    'fancyboxplus',
    'ezplus',
    'ui.router'
])

.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)

.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/main");
    //
    // Now set up the states
    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "main.html",
            controller: DemoCtrl
        })
        .state('api', {
            url: "/api",
            templateUrl: "api.html",
            controller: CueCtrl
        })
        .state('blog', {
            url: "/blog",
            templateUrl: "blog.html",
            controller: BlogCtrl
        })
        .state('faq', {
            url: "/faq",
            templateUrl: "faq.html",
            controller: CueCtrl
        })
        .state('support', {
            url: "/support",
            templateUrl: "support.html",
            controller: CueCtrl
        })
        .state('howto', {
            url: "/howto",
            templateUrl: "howto.html",
            controller: CueCtrl
        });

        function CueCtrl($timeout) {
            $timeout(function() {
                Cufon.replace('h1', {color: '#4682B4'});
            }, 0);
        }

        function BlogCtrl($timeout, $scope, fancyboxService) {
            CueCtrl($timeout);
            /*
             *   Tips & Tricks
             */

            $scope.tip3={
                'transitionIn'	: 'none',
                'transitionOut'	: 'none',
                'titlePosition'	: 'over',
                'onComplete'	: function() {
                    $("#fbplus-wrap").hover(function() {
                        $("#fbplus-title").show();
                    }, function() {
                        $("#fbplus-title").hide();
                    });
                }
            };

            $scope.tip4={
                'padding'		: 0,
                'autoScale'		: false,
                'transitionIn'	: 'none',
                'transitionOut'	: 'none',
                'title'			: this.title,
                'width'			: 680,
                'height'		: 495,
                'href'			: this.href ? this.href.replace(new RegExp("watch\\?v=", "i"), 'v/') : 'inexistent',
                'type'			: 'swf',
                'swf'			: {
                    'wmode'				: 'transparent',
                    'allowfullscreen'	: 'true'
                }
            };
            /*$("#tip4").click(function() {
             $.fancyboxPlus( $scope.tip4);

             return false;
             });*/

            $scope.tip5={
                'scrolling' : 'no',
                'titleShow'	: false,
                'onClosed'	: function() {
                    $("#login_error").hide();
                }
            };

            /*
             $("#login_form").bind("submit", function() {

             if ($("#login_name").val().length < 1 || $("#login_pass").val().length < 1) {
             $("#login_error").show();
             $.fancybox.resize();
             return false;
             }

             $.fancybox.showActivity();

             $.ajax({
             type	: "POST",
             cache	: false,
             url		: "/data/login.php",
             data	: $(this).serializeArray(),
             success: function(data) {
             $.fancyboxPlus(data);
             }
             });

             return false;
             });*/

            $scope.tip6={
                'transitionIn'		: 'none',
                'transitionOut'		: 'none',
                'autoScale'     	: false,
                'type'				: 'iframe',
                'width'				: 500,
                'height'			: 500,
                'scrolling'   		: 'no'
            };

            function formatTitle(title, currentArray, currentIndex, currentOpts) {
                return '<div id="tip7-title"><span><a href="javascript:;" onclick="$.fancybox.close();"><img src="images/closelabel.gif" /></a></span>' + (title && title.length ? '<b>' + title + '</b>' : '' ) + 'Image ' + (currentIndex + 1) + ' of ' + currentArray.length + '</div>';
            }

            $scope.tip7={
                'showCloseButton'   : false,
                'titlePosition' 	: 'inside',
                'titleFormat'		: formatTitle
            };
        }

        function DemoCtrl($timeout, $scope, fancyboxService) {
            CueCtrl($timeout);

            $scope.example1={
                'titleShow'     : false
            };

            $scope.example2={
                'titleShow'     : false,
                'transitionIn'	: 'elastic',
                'transitionOut'	: 'elastic',
                'easingIn'      : 'easeOutBack',
                'easingOut'     : 'easeInBack'
            };

            $scope.example3={
                'titleShow'     : false,
                'transitionIn'	: 'none',
                'transitionOut'	: 'none'
            };

            $scope.example4={};

            $scope.example5={
                'titlePosition'  : 'inside'
            };

            $scope.example6={
                'titlePosition'  : 'over'
            };

            $scope.examplegroup={
                'transitionIn'		: 'none',
                'transitionOut'		: 'none',
                'titlePosition' 	: 'over',
                'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
                    return '<span id="fbplus-title-over">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '</span>';
                }
            };

            /*
             *   Examples - various
             */

            $scope.various={
                'transitionIn'	: 'none',
                'transitionOut'	: 'none'
            };

            $scope.various1={
                'titlePosition'		: 'inside',
                'transitionIn'		: 'none',
                'transitionOut'		: 'none'
            };

            $scope.various2={
                'modal' : true
            };

            $scope.various3={
                ajax : {
                    type	: "POST",
                    data	: 'mydata=test'
                }
            };

            $scope.various4={
                ajax : {
                    type	: "POST"
                }
            };

            $scope.various5={
                'width'				: '75%',
                'height'			: '75%',
                'autoScale'     	: false,
                'transitionIn'		: 'none',
                'transitionOut'		: 'none',
                'type'				: 'iframe'
            };

            $scope.various6={
                'padding'           : 0,
                'autoScale'     	: false,
                'transitionIn'		: 'none',
                'transitionOut'		: 'none'
            };

            $scope.various7={
                onStart		:	function() {
                    return window.confirm('Continue?');
                },
                onCancel	:	function() {
                    alert('Canceled!');
                },
                onComplete	:	function() {
                    alert('Completed!');
                },
                onCleanup	:	function() {
                    return window.confirm('Close?');
                },
                onClosed	:	function() {
                    alert('Closed!');
                }
            };

            $scope.various8 = {};
            $scope.various9 = {};

            /*
             *   Examples - manual call
             */

            $scope.manual1 = {
                //'orig'			: $(this),
                'padding'		: 0,
                'href'			: 'http://farm9.staticflickr.com/8568/16388772452_f4d77a92c7_b.jpg',
                'title'   		: 'Lorem ipsum dolor sit amet',
                'transitionIn'	: 'elastic',
                'transitionOut'	: 'elastic'
            };
            $scope.openManual1 = function(){
                fancyboxService.fancyboxPlus()($scope.manual1);
            }

            $scope.manual2={
                'padding'			: 0,
                'transitionIn'		: 'none',
                'transitionOut'		: 'none',
                'type'              : 'image',
                'changeFade'        : 0
            };
            $scope.manual2gallery=[
                'http://farm8.staticflickr.com/7308/15783866983_27160395b9_b.jpg',
                'http://farm3.staticflickr.com/2880/10346743894_0cfda8ff7a_b.jpg',
                {
                    'href'	: 'http://farm6.staticflickr.com/5612/15344856989_449794889d_b.jpg',
                    'title'	: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                }
            ];
            $scope.openManual2 = function(){
                fancyboxService.fancyboxPlus()($scope.manual2gallery, $scope.manual2);
            }

        }

});
