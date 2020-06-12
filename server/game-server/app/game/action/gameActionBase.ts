import Battle from "../battle";
import BattleObject from "../battleObject";
import { ACTION_TYPE } from "../constants";
import Trigger from "../trigger";
import { ACTION_INDEX } from "./gameActionIndex";
import GameActionManager, { ACTION_STATE } from "./gameActionManager";
/**
 *  GameAction 游戏行为（以后统称GA）
 *  GA通常由一个BO直接调用或设置后由时点触发。
 *  GA会产生游戏动画，但不是所有GA都产生游戏动画
 *  一个GA会导致触发另一个或多个GA。
 *  一个GA有宣告处理，和处理完成两个时点
 *  GA每次状态发生改变后，会周知Trigger
 *  GA处理之前会宣告时点，此时若响应其他GA，那么优先处理响应的那些GA
 *  宣告处理多条GA时，按序触发并处理，若处理完后原GA被否决，则不再继续触发
 *  如果GA处理被否决，不会触发处理完成时点
 */
export class GameActionBase {
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
		const typeList = Object.keys(ACTION_INDEX);
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < typeList.length; i++) {
			if (this instanceof ACTION_INDEX[typeList[i]]) {
				this._type = parseInt(typeList[i]);
				return;
			}
		}
	}
	/**
	 * 做一些默认的初始化操作，之后交由子类自己完成
	 * @param battle action所属的battle
	 * @param args 传给子类的arg
	 */
	public initialize (battle: Battle, args?) {
		this._creator = (args && args.creator) || battle;
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
