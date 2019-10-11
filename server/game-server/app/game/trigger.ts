import { ACTION_TYPE } from "./constants";
import { GameAction } from "./gameActionManager";
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
    public register(type: ACTION_TYPE , effect: (args: GameAction) => void): TriggerId {
        if (!this._triggerMap[type]) {
            this._triggerMap[type] = [];
        }
        this._tid++;
        this._triggerMap[type].push(this._tid);
        this._tidMap[this._tid] = effect;
        return this._tid;
    }
    public notify(action: GameAction) {
        const type =  action.type;
        if (!this._triggerMap[type]) { return; }
        const tids = this._triggerMap[type];
        if (!tids) { return; }
        for (const key in tids) {
            if (tids.hasOwnProperty(key)) {
                const tid = tids[key];
                if (!this._tidMap[tid]) {
                    delete (tids[key]);
                } else {
                    this._tidMap[tid](action);
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
