import { GameActionBase } from "./action/gameActionBase";
import { ACTION_TYPE } from "./constants";
/**
 * 触发优先级
 */
export enum TRIGGER_PRIORITY {
	LOW,
	NORMAL,
	HIGH,
}
export type TriggerId = number;
export default class Trigger {
	private _triggerMap: Map <ACTION_TYPE, Set<TriggerId> >;
	private _tid: TriggerId = 0;
	private _tidMap: Map< TriggerId, (args: GameActionBase) => void >;
	constructor () {
		this._tidMap = new Map();
		this._triggerMap = new Map();

	}
	public register (type: ACTION_TYPE, effect: (args: GameActionBase) => void): TriggerId {
		if (!this._triggerMap.has(type)) {
			this._triggerMap.set(type, new Set());
		}
		this._tid++;
		this._triggerMap.get(type).add(this._tid);
		this._tidMap.set(this._tid, effect);
		return this._tid;
	}
	public notify (action: GameActionBase) {
		const type = action.type;
		if (!this._triggerMap.has(type)) { return; }
		const tids = this._triggerMap.get(type);
		if (!tids) { return; }
		for (const tid of tids) {
			if (!this._tidMap.has(tid)) {
				tids.delete(tid);
			} else {
				this._tidMap.get(tid)(action);
			}
		}
	}
	public remove (tid: TriggerId) {
		if (this._tidMap.has(tid)) {
			this._tidMap.delete(tid);
		}
	}
}
