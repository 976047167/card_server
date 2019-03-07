import Utils, { Random } from "../libs/utils";
import BattlePlayer from "./battlePlayer";

export default class Battle {
    private players: BattlePlayer[];
    private random: Random;
    private _currentController: BattlePlayer;
    constructor(seed: number) {
        this.random = Utils.getRandom(seed);
    }
    public start() {

    }
    public get currentController(): BattlePlayer {
        return this._currentController;
    }
    public getRandom(min= 0, max = 1, integer) {
        return this.random.random(max, min, integer);
    }

}
