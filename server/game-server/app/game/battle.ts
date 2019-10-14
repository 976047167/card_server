import uuid = require("uuid");
import MersenneTwister from "../libs/mersenneTwister";
import Utils from "../libs/utils";
import GameActionManager from "./action/gameActionManager";
import BattleObject, { BattleObjectId } from "./battleObject";
import BattlePlayer, { IArgsUseHandCard, IPlayerInfo } from "./battlePlayer";
import { COMMAND_ID, IUserCommand } from "./gameController";
import Trigger from "./trigger";
export default class Battle {
    public get currentController(): BattlePlayer {
        return this._currentController;
    }
    public readonly id: string;
    public readonly trigger: Trigger;
    public readonly actionManager: GameActionManager;
    private players: BattlePlayer[];
    private random: MersenneTwister;
    private _currentController: BattlePlayer;
    private bidMap: {[bId: number]: BattleObject}; // 场景里所有物体都有对应的bid，用于检索所有对象
    private _bid: BattleObjectId = 0; // 自增用的id
    private _sameStrike = false; // 是否有多个相同先攻权
    constructor(seed: number) {
        this.random = Utils.getRandom(seed);
        this.id = uuid.v1();
        this.bidMap = {};
        this.trigger = new Trigger();
        this.actionManager = new GameActionManager(this);
    }
    public setPlayer(playerInfos: IPlayerInfo[]) {
        const players = playerInfos.map((e) => {
            return new BattlePlayer(this, e);
        });
        this.players = players;
    }
    public start() {
        console.log("game start!", this.id);
        this.newTurn();
    }
    public newTurn() {
        this._currentController = this.calNextController();
        this.currentController.turnBegin();
        // push
    }
    public turnEnd() {
        this.currentController.endStike();
        this.newTurn();
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
    public registerBid(obj: BattleObject) {
        this.bidMap[obj.bId] = obj;
    }
    public getObjectByBId<T extends BattleObject>(bId: BattleObjectId, type?: new (...args: any[]) => T): T {
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
        if (player !== this.currentController) {return; }
        player.useHandCard(args);
    }
    /**
     * 计算先攻顺序队列
     * @return currentController;
     */
    private calNextController() {
        const max_progress = Math.max(...this.players.map((p) => {
            if (!this._sameStrike) {
                p.doStrike();
            }
            return p.strikeProgress;
        }));
        const act_players = this.players.filter((p) => p.strikeProgress === max_progress);
        if (act_players.length !== 1) {
            act_players.sort((a, b) => {
                return  b.attribute.per - a.attribute.per;
            });
            this._sameStrike = true;
        } else {
            this._sameStrike = false;
        }
        this._currentController = act_players[0];
        return this._currentController;
    }

}
