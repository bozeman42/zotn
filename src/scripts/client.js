import angular from 'angular';
import '../sass/app.scss';
import PlayerSelectController from './controllers/controller-player-select';
import Controller404 from './controllers/controller-404';
import PlayerService from './services/service-player';
import ScannerService from './services/service-scanner';
import FactionService from './services/service-faction';
import AssetService from './services/service-asset';
import KillController from './controllers/controller-kills';
import DeathController from './controllers/controller-death';
import ShopController from './controllers/controller-shop';
import RegisterController from './controllers/controller-register';
import RegisterAssetController from './controllers/controller-register-asset';
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
  .service('ScannerService',ScannerService)
  .service('FactionService',FactionService)
  .service('AssetService',AssetService)
  .config(routing);

export default app;