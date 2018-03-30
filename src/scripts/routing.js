// import any html views used in project
import '../views/templates/player-select.html';
import '../views/templates/kills.html';
import '../views/templates/death.html';
import '../views/templates/shop.html';
import '../views/templates/register.html';
import '../views/templates/register-asset.html';
import '../views/templates/404.html';
import '../views/partials/footer.html';
import '../views/partials/header.html';

export default function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: '/views/templates/player-select.html',
      controller: 'PlayerSelectController as psc'
    })
    .when('/kills/:id', {
      templateUrl: '/views/templates/kills.html',
      controller: 'KillController as kc'
    })
    .when('/death/:id', {
      templateUrl: '/views/templates/death.html',
      controller: 'DeathController as dc'
    })
    .when('/shop:id', {
      templateUrl: '/views/templates/shop.html',
      controller: 'ShopController as dc'
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'RegisterController as rc'
    })
    .when('/register-asset', {
      templateUrl: '/views/templates/register-asset.html',
      controller: 'RegisterAssetController as arc'
    })
    .when('/notfound', {
      templateUrl: '/views/templates/404.html',
      contoroller: '404Controller'
    })
    .otherwise({
      redirectTo: '/notfound',
    });
}


