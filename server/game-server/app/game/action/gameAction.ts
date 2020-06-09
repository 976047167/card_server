import Battle from "../battle";
import BattleObject from "../battleObject";
import { ACTION_TYPE } from "../constants";
import Trigger from "../trigger";
import { ACTION_INDEX } from "./gameActionIndex";
import GameActionManager, { ACTION_STATE } from "./gameActionManager";
export class GameAction {
	public get state (): ACTION_STATE {
		return this._state;
	}
	public get target () {
		return this._target;
	}
	public get creator (): BattleObject {
		return this._creator;
	}
	public get trigger (): Trigger {
		return this._trigger;
	}
	public get type (): ACTION_TYPE {
		return this._type;
	}
	public get GAM (): GameActionManager {
		return this._GAM;
	}
	public get battle (): Battle {
		return this._battle;
	}
	public extraData: any;
	private _battle: Battle;
	private _type: ACTION_TYPE;
	private _GAM: GameActionManager;
	private _creator: BattleObject;
	private _trigger: Trigger;
	private _state: ACTION_STATE = ACTION_STATE.UNTRIGGERED;
	protected _target: BattleObject;
	constructor () {
		const typeList = Object.values(ACTION_INDEX);
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < typeList.length; i++) {
			if (this instanceof typeList[i]) {
				this._type = i;
				return;
			}
		}
	}
	/**
	 * 做一些默认的初始化操作，之后交由子类自己完成
	 * @param battle action所属的battle
	 * @param args 传给子类的arg
	 */
	public initialize (battle: Battle, args) {
		this._creator = args.creator || battle;
		this._target = this.creator;
		this._battle = battle;
		this._trigger = this.battle.trigger;
		this._GAM = this.battle.actionManager;
		this.extraData = args;
		if (args && args.target) {
			this._target = args.target;
		}
		this.onCreator(args);
	}
	protected onCreator (args) {

	}
	public setState (foo: ACTION_STATE) {
		this._state = foo;
		this.trigger.notify(this);
	}
	public doTrigger () {
		this.setState(ACTION_STATE.TRIGGERED);
	}
	public doDeal () {
		if (this.state === ACTION_STATE.REJECTED) {
			return;
		}
		this.setState(ACTION_STATE.WORKING);
		this.deal();
		this.done();
		this.setState(ACTION_STATE.COMPLETED);
	}
	protected deal () {
		//
	}
	/**
     * 主要用来生成log,用于客户端表现。
     * 需要注意深拷贝数据,防止引用
     */
	protected done () {
		//
	}

	/**
	 * 删除数据引用，返回池中
	 */
	public clear () {
		this._creator = null;
		this._target = null;
		this._battle = null;
		this._trigger = null;
		this._GAM = null;
		this.extraData = null;
		this.onDestory();
	}
	protected onDestory () {

	}
}
