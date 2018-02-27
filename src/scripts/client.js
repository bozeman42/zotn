import angular from 'angular';
import '../sass/app.scss';
import PlayerSelectController from './controllers/controller-player-select';
import Controller404 from './controllers/controller-404';
import PlayerService from './services/service-player';
import routing from './routing';
require('angular-route');

const app = angular.module('app', ['ngRoute']);

// attach controllers, services and config
app
  .controller('PlayerSelectController',PlayerSelectController)
  .controller('404Controller',Controller404)
  .service('PlayerService',PlayerService)
  .config(routing);

// inject dependencies here ['dependency','dependency2',etc]
PlayerService.$inject = ['$http'];
PlayerSelectController.$inject = ['PlayerService'];


export default app;