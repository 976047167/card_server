import { BattleObject, BattleObjectId } from "./battle";
export enum TIME_POINT {
    HAND = 0,
    COUNTER,
}
/**
 * 触发优先级
 */
export enum TRRIGER_PRIORITY {
    LOW,
    NORMAL,
    HIGH,
}
export type TrrigerId = number;
export default class Trriger {
    private _trrigerMap: { [bid: number]: { [timePoint: number]: number[] } };
    private _tid: TrrigerId = 0;
    private _tidMap: { [tid: number]: (args: any) => void };
    public register(obj: BattleObject | BattleObjectId, timePoint: TIME_POINT, effect: (args: any) => void): TrrigerId {
        if (typeof (obj) !== "number") {
            obj = obj.bId;
        }
        if (!this._trrigerMap[obj]) {
            this._trrigerMap[obj] = {};
        }
        if (!this._trrigerMap[obj][timePoint]) {
            this._trrigerMap[obj][timePoint] = [];
        }
        this._tid++;
        this._trrigerMap[obj][timePoint].push(this._tid);
        this._tidMap[this._tid] = effect;
        return this._tid;
    }
    public notify(obj: BattleObject | number, timePoint: TIME_POINT, args?) {
        if (typeof (obj) !== "number") {
            obj = obj.bId;
        }
        if (!this._trrigerMap[obj]) { return; }
        const tids = this._trrigerMap[obj][timePoint];
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
    public remove(tid: TrrigerId) {
        if (this._tidMap[tid]) {
            delete (this._tidMap[tid]);
        }
    }
}
