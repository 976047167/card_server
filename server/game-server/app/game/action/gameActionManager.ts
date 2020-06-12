import Battle from "../battle";
import Trigger from "../trigger";
import { GameActionBase } from "./gameActionBase";
import gameActionPool from "./gameActionPool";
import { ACTION_TYPE } from "../constants";

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
