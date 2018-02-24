import angular from 'angular';
import '../sass/app.scss';
import PlayerSelectController from './controllers/controller-player-select';
import PlayerService from './services/service-player';
import '../views/templates/player-select.html';
require('angular-route');

const app = angular.module('app', ['ngRoute']);

app
  .controller('PlayerSelectController',PlayerSelectController)
  .service('PlayerService',PlayerService);

PlayerService.$inject = ['$http'];
PlayerSelectController.$inject = ['PlayerService'];

app.config(function($routeProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: '/views/templates/player-select.html',
    controller: 'PlayerSelectController as psc'
  });
});

export default app;