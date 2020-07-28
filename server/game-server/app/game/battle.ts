import uuid = require("uuid");
import MersenneTwister from "../libs/mersenneTwister";
import Utils from "../libs/utils";
import GameActionManager from "./action/gameActionManager";
import BattleObject, { BattleObjectId } from "./battleObject";
import BattlePlayer, { IArgsUseHandCard, IPlayerInfo } from "./battlePlayer";
import { COMMAND_ID, BATTLE_STATE } from "./constants";
import { IUserCommand } from "./gameController";
import Trigger from "./trigger";
export default class Battle {
	public get currentController (): BattlePlayer {
		return this._currentController;
	}
	public readonly id: string;
	public readonly trigger: Trigger;
	public readonly actionManager: GameActionManager;
	private players:Map<string, BattlePlayer>;
	private random: MersenneTwister;
	private _currentController: BattlePlayer;
	private bidMap:Map<number, BattleObject >; // 场景里所有物体都有对应的bid，用于检索所有对象
	private _bid:BattleObjectId=0;
	private strikeGenerator:Generator;
	private gamState:BATTLE_STATE;
	constructor (seed: number) {
		this.random = Utils.getRandom(seed);
		this.id = uuid.v1();
		this.bidMap = new Map<number, BattleObject>();
		this.trigger = new Trigger();
		this.actionManager = new GameActionManager(this);
	}
	public setPlayers (playerInfos: IPlayerInfo[]) {
		this.players = new Map<string, BattlePlayer>();
		playerInfos.forEach((e) => {
			this.players.set(e.uid, new BattlePlayer(this, e));
		});
	}
	public start () {
		console.log("game start!", this.id);
		this.gamState = BATTLE_STATE.GAMING;
		for (const player of this.players.values()) {
			player.gameStart();
		}
		this.strikeGenerator = this.generatorStriker();
		this.newTurn();
	}
	/**
     * 获取随机数，采用伪随机算法，确保还原日志。范围为[min,max)
     * @param min 下限
     * @param max 上限
     * @param integer 是否为整数，如果为true的话,范围为[min,max]
     */
	public getRandom (min = 0, max = 1, integer?:boolean) {
		const r = this.random.rnd();
		if (!integer) {
			return min + (max - min) * r;
		} else {
			return Math.floor(min + (max + 1 - min) * r);
		}
	}
	/**
     * 根据uid获取player对象
     * @param uid
     */
	public getPlayer (uid: string): BattlePlayer {
		return this.players.get(uid);
	}
	public registerBOJ (obj: BattleObject) {
		this.bidMap.set(++this._bid, obj);
		return this._bid;
	}
	public getObjectByBId<T extends BattleObject> (bId: BattleObjectId, type?: new (...args: any[]) => T): T {
		const obj = this.bidMap.get(bId);
		if (!type) { return obj as T; }
		if (obj instanceof type) {
			return obj;
		}
	}
	public command (cmd: IUserCommand) {
		switch (cmd.commandId) {
			case COMMAND_ID.USE_HAND_CARD:
				this.useHandCard(cmd);
				break;
			case COMMAND_ID.TURN_END:
				this.turnEnd(cmd);
				break;
			default:
				break;
		}
	}

	/**
	* 获取当前场上信息，重连时会用到
	*/
	public getSituation () {
		const reslut = {
			currentController: this.currentController.uid,
			players: [],
		};
		for (const p of this.players.values()) {
			reslut.players.push({
				uid: p.uid,
				bid: p.bId,
				info: p.getSituation(),
			});
		}
		return reslut;
	}
	private newTurn () {
		this._currentController = this.strikeGenerator.next().value;
		this.currentController.turnBegin();
		// push
	}
	private turnEnd (cmd: IUserCommand) {
		const player = this.getPlayer(cmd.uid);
		if (player !== this.currentController) { return; }
		this.currentController.turnEnd();
		this.newTurn();
	}
	private useHandCard (cmd: IUserCommand) {
		const args = cmd.args as IArgsUseHandCard;
		if (!args) { return; }
		const player = this.getPlayer(cmd.uid);
		if (player !== this.currentController) { return; }
		player.useHandCard(args);
	}
	/**
	* 计算先攻顺序队列
	* @return currentController;
	*/
	private *generatorStriker ():Generator<BattlePlayer> {
		let actPlayers:BattlePlayer[] = [];
		while (this.gamState) {
			if (actPlayers.length > 0) {
				yield actPlayers.pop();
				continue;
			}
			actPlayers = Array.from(this.players.values());
			actPlayers.sort((a, b)=>{
				//先攻相等比感知
				return a.attribute.derive.initiative - b.attribute.derive.initiative ||
						a.attribute.per - b.attribute.per;
			});
		}
	}
}
