import { ACTION_TYPE } from "../constants";
import { GameActionBase } from "./gameActionBase";
import { ACTION_INDEX } from "./gameActionIndex";
class GameActionPool {
	public static getInstance () {
		if (!this._instance) { this._instance = new this(); }
		return this._instance;
	}
	private static _instance: GameActionPool;
	private actionPools: { [type: number]: GameActionBase[] }=[];
	public getAction (battle, type: ACTION_TYPE, args?: any): GameActionBase {
		const pool = this.actionPools[type];
		let action: GameActionBase;
		if (pool && pool.length > 0) {
			action = pool.pop();
		} else {
			action = this.createAction(type);
		}
		action.initialize(battle, args);
		return action;
	}
	public recycle (action: GameActionBase) {
		const type = action.type;
		if (!this.actionPools[type]) {
			this.actionPools[type] = [];
		}
		this.actionPools[type].push(action);
	}

	private createAction (actionType: ACTION_TYPE): GameActionBase {
		const actionClass = ACTION_INDEX[actionType];
		if (!actionClass) {
			console.warn("create action failed! illgal type: " + actionType);
			return;
		}
		return new actionClass();
	}
}

export default GameActionPool.getInstance();
