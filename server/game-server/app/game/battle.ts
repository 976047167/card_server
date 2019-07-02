import MersenneTwister from "../libs/mersenneTwister";
import Utils from "../libs/utils";
import BattlePlayer, { IPlayerInfo } from "./battlePlayer";
import CardBase from "./cardBase";

export default class Battle {
    public get currentController(): BattlePlayer {
        return this._currentController;
    }
    public readonly id: string;
    private players: BattlePlayer[];
    private random: MersenneTwister;
    private _currentController: BattlePlayer;
    private cardMap: {[bId: string]: CardBase}; // 一个card的bid对应map，方便检索卡片
    private _bid: number = 0; // 自增用的id
    constructor(seed: number) {
        this.random = Utils.getRandom(seed);
    }
    public setPlayer(playerInfos: IPlayerInfo[]) {
        const players = playerInfos.map((e) => {
            return new BattlePlayer(this, e);
        });
        this.players = players;
    }
    public start() {
        //
    }

    public getRandom(min= 0, max = 1, integer = true) {
        const r = this.random.rnd();
        if (!integer) {
            return min + (max - min) * r;
        } else {
            return Math.floor(min + (max + 1 - min) * r);
        }
    }
    public getPlayer(uid: string) {
        let player: BattlePlayer;
        for (const p of this.players) {
            if (p.uid === uid) {
                player = p;
            }
        }
        return player;
    }
    public registerCard(card: CardBase) {
        this._bid++;
        this.cardMap[this._bid] = card;
        return this._bid;
    }

}
