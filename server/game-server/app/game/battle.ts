import MersenneTwister from "../libs/mersenneTwister";
import Utils from "../libs/utils";
import BattlePlayer, { IArgsUseHandCard, IPlayerInfo } from "./battlePlayer";
import BuffBase from "./buffBase";
import CardBase from "./card/cardBase";
import FieldBase from "./field/fieldBase";
import { COMMAND_ID, IUserCommand } from "./gameController";
export type BattleObject = CardBase|BattlePlayer|FieldBase|BuffBase;
export default class Battle {
    public get currentController(): BattlePlayer {
        return this._currentController;
    }
    public readonly id: string;
    private players: BattlePlayer[];
    private random: MersenneTwister;
    private _currentController: BattlePlayer;
    private bidMap: {[bId: string]: BattleObject}; // 场景里所有物体都有对应的bid，用于检索所有对象
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
    public registerBid(card: BattleObject) {
        this._bid++;
        this.bidMap[this._bid] = card;
        return this._bid;
    }
    public getObjectByBId<T extends BattleObject>(bId: number, type?: new (...args: any[]) => T): T {
        const obj =  this.bidMap[bId] ;
        if (!type) { return obj as T; }
        if (obj instanceof type) {
            return obj;
        }
    }
    public command(cmd: IUserCommand) {
        switch (cmd.commandId) {
            case COMMAND_ID.USE_HAND_CARD:
                this.useHandCard(cmd);
                break;
            default:
                break;
        }
    }
    private useHandCard(cmd: IUserCommand) {
        const args = cmd.args as IArgsUseHandCard;
        if (!args) {return; }
        const player = this.getPlayer(cmd.uid);
        player.useHandCard(args);
    }

}
