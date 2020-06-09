import { ACTION_TYPE } from "../constants";
import { GameAction } from "./gameAction";
import { ACTION_INDEX } from "./gameActionIndex";
class GameActionPool {
	public static getInstance () {
		if (!this._instance) { this._instance = new this(); }
		return this._instance;
	}
	private static _instance: GameActionPool;
	private actionPools: { [type: number]: GameAction[] };
	public getAction (battle, type: ACTION_TYPE, args?: any): GameAction {
		const pool = this.actionPools[type];
		let action: GameAction;
		if (pool && pool.length > 0) {
			action = pool.pop();
		} else {
			action = this.createAction(type);
		}
		action.initialize(battle, args);
		return action;
	}
	public recycle (action: GameAction) {
		const type = action.type;
		if (!this.actionPools[type]) {
			this.actionPools[type] = [];
		}
		this.actionPools[type].push(action);
	}

	private createAction (actionType: ACTION_TYPE): GameAction {
		const actionClass = ACTION_INDEX[actionType];
		if (!actionClass) {
			console.warn("create action failed! illgal type: " + actionType);
			return;
		}
		return new actionClass();
	}
}

export default GameActionPool.getInstance();
