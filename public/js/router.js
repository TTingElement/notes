'use strict';
app
    .run(
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
)
    .config(
    function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');
        $stateProvider

            .state('admin', {
                abstract: true,
                url: '/admin',
                templateUrl: 'partials/admin.html',
            })

            .state('admin.list', {
                url: '/list',
                views: {
                    "main":{
                        templateUrl: 'partials/note/list.html',
                        controller: 'NoteListController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load([
                                        'js/note/list.js'
                                        ]);
                                }]
                        }
                    }
                }
            })

            .state('edit', {
                url: '/edit/{id:int}',
                views: {
                    "":{
                        templateUrl: 'partials/note/edit.html',
                        controller: 'editController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load([
                                        'js/note/edit.js'
                                        ]);
                                }]
                        }
                    }
                }
            })

            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'partials/app.html',
            })

            .state('app.preview', {
                url: '/preview/{id:int}',
                views: {
                    "main":{
                        templateUrl: 'partials/note/preview.html',
                        controller: 'previewController',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load([
                                        'js/note/preview.js'
                                        ]);
                                }]
                        }
                    }
                }
            })
    
});
