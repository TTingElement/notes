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
            .otherwise('/app');
        $stateProvider

            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'partials/app.html',
            })

            .state('app.list', {
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
    
});
