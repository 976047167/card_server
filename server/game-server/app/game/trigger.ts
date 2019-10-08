import { ACTION_TYPE } from "./constants";
import { GameAction } from "./gameActionController";
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
    private _triggerMap: { [action: number]: number[]  };
    private _tid: TriggerId = 0;
    private _tidMap: { [tid: number]: (args: any) => void };
    public register(action: GameAction |ACTION_TYPE , effect: (args: any) => void): TriggerId {
        if (typeof (action) !== "number") {
            action = action.type;
        }
        if (!this._triggerMap[action]) {
            this._triggerMap[action] = [];
        }
        this._tid++;
        this._triggerMap[action].push(this._tid);
        this._tidMap[this._tid] = effect;
        return this._tid;
    }
    public notify(action: GameAction | ACTION_TYPE, args?) {
        if (typeof (action) !== "number") {
            action = action.type;
        }
        if (!this._triggerMap[action]) { return; }
        const tids = this._triggerMap[action];
        if (!tids) { return; }
        for (const key in tids) {
            if (tids.hasOwnProperty(key)) {
                const tid = tids[key];
                if (!this._tidMap[tid]) {
                    delete (tids[key]);
                } else {
                    this._tidMap[tid](args);
                }
            }
        }
    }
    public remove(tid: TriggerId) {
        if (this._tidMap[tid]) {
            delete (this._tidMap[tid]);
        }
    }
}
