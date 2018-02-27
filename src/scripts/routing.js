// import any html views used in project
import '../views/templates/player-select.html';
import '../views/templates/kills.html';
import '../views/templates/death.html';
import '../views/templates/404.html';
import '../views/partials/footer.html';

export default function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: '/views/templates/player-select.html',
      controller: 'PlayerSelectController as psc'
    })
    .when('/kills', {
      templateUrl: '/views/templates/kills.html',
      controller: 'KillController as kc'
    })
    .when('/death', {
      templateUrl: '/views/templates/death.html',
      controller: 'DeathController as dc'
    })
    .when('/notfound', {
      templateUrl: '/views/templates/404.html',
      contoroller: '404Controller'
    })
    .otherwise({
      redirectTo: '/notfound',
    });
}