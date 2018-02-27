// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor(PlayerService) {
    this.data = PlayerService.data;
  }
}