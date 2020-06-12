import Battle from "../battle";
import Trigger from "../trigger";
import { GameActionBase } from "./gameActionBase";
import gameActionPool from "./gameActionPool";
import { ACTION_TYPE } from "../constants";
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
export enum ACTION_STATE {
	UNTRIGGERED, // action还没有触发
	TRIGGERED,
	WORKING,
	REJECTED,
	COMPLETED,
}
export default class GameActionManager {
	private actionsStack: GameActionBase[];
	private doneStack: GameActionBase[];
	private isDealing: boolean = false;
	private battle: Battle;
	private trigger: Trigger;
	constructor (battle: Battle) {
		this.battle = battle;
		this.trigger = battle.trigger;
		this.actionsStack = [];
		this.doneStack = [];
	}
	public pushAction (type: ACTION_TYPE, args?: any) {
		const action = gameActionPool.getAction(this.battle, type, args);
		this.actionsStack.push(action);
		if (!this.isDealing) {
			this.isDealing = true;
			this.dealActions();
		}
	}
	private dealActions () {
		const len = this.actionsStack.length;
		const action = this.actionsStack[len - 1];
		if (action.state === ACTION_STATE.UNTRIGGERED) {
			console.log("action trigger", ACTION_TYPE[action.type]);
			action.doTrigger();
		} else {
			this.actionsStack.pop();
			console.log("action dealing", ACTION_TYPE[action.type]);
			action.doDeal();
			this.doneStack.push(action);
		}
		if (this.actionsStack.length !== 0) {
			this.dealActions();
		} else {
			this.doneAcions();
		}
	}
	private doneAcions () {
		console.log("action done");
		this.isDealing = false;
		this.doneStack.forEach(action => {
			action.clear();
			gameActionPool.recycle(action);
		});
		this.doneStack = [];
	}
}
