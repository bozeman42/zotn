import angular from 'angular';
import '../sass/app.scss';
import PlayerSelectController from './controllers/controller-player-select';
import Controller404 from './controllers/controller-404';
import PlayerService from './services/service-player';
import '../views/templates/player-select.html';
import routing from './routing';
require('angular-route');

const app = angular.module('app', ['ngRoute']);

app
  .controller('PlayerSelectController',PlayerSelectController)
  .controller('404Controller',Controller404)
  .service('PlayerService',PlayerService);

PlayerService.$inject = ['$http'];
PlayerSelectController.$inject = ['PlayerService'];

app.config(routing);

export default app;