import angular from 'angular';
import '../sass/app.scss';
import PlayerSelectController from './controllers/controller-player-select';
import Controller404 from './controllers/controller-404';
import PlayerService from './services/service-player';
import KillController from './controllers/controller-kills';
import DeathController from './controllers/controller-death';
import ShopController from './controllers/controller-shop';
import RegisterController from './controllers/controller-register';
import FooterController from './controllers/controller-footer';
import routing from './routing';
import 'angular-route';

const app = angular.module('app', ['ngRoute']);

// attach controllers, services and config
app
  .controller('PlayerSelectController',PlayerSelectController)
  .controller('404Controller',Controller404)
  .controller('KillController',KillController)
  .controller('DeathController',DeathController)
  .controller('FooterController',FooterController)
  .controller('ShopController',ShopController)
  .controller('RegisterController',RegisterController)
  .service('PlayerService',PlayerService)
  .config(routing);

// inject dependencies here ['dependency','dependency2',etc]
PlayerService.$inject = ['$http'];
PlayerSelectController.$inject = ['$location','$scope','PlayerService'];
KillController.$inject = ['$location','PlayerService'];
DeathController.$inject = ['$location','PlayerService'];
ShopController.$inject = ['$location','PlayerService'];
RegisterController.$inject = ['$location','$http','$scope','PlayerService'];
FooterController.$inject = ['$location'];


export default app;