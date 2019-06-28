import MersenneTwister from "../libs/mersenneTwister";
import Utils from "../libs/utils";
import BattlePlayer from "./battlePlayer";

export default class Battle {
    private players: BattlePlayer[];
    private random: MersenneTwister;
    private _currentController: BattlePlayer;
    constructor(seed: number) {
        this.random = Utils.getRandom(seed);
    }
    public start() {

    }
    public get currentController(): BattlePlayer {
        return this._currentController;
    }

    public getRandom(min= 0, max = 1, integer = true) {
        const r = this.random.rnd();
    }

}
