export default function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: '/views/templates/player-select.html',
      controller: 'PlayerSelectController as psc'
    })
    .when('/notfound', {
      templateUrl: '/views/templates/404.html',
      contoroller: '404Controller'
    })
    .otherwise({
      redirectTo: '/notfound',
    });
}