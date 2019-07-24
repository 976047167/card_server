import { BattleObject } from "./battle";
export enum TIME_POINT {
    HAND = 0,
    COUNTER,
}
export enum TRRIGER_PRIORITY {
    LOW,
    NORMAL,
    HIGH,
}
export default class Trriger {
    private _trrigerMap: { [bid: number]: {[timePoint: number]: number[]}};
    private _tid: number = 0;
    private _tidMap: {[tid: number]: (args: any) => void};
    public register(obj: BattleObject|number, timePoint: TIME_POINT, effect: (args: any) => void) {
        if (typeof(obj) !== "number") {
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
    public notify(obj: BattleObject|number, timePoint: TIME_POINT, args?) {
        if (typeof(obj) !== "number") {
            obj = obj.bId;
        }
        if (!this._trrigerMap[obj]) { return; }
        const tids = this._trrigerMap[obj][timePoint];
        if (!tids) {return; }
        for (const key in tids) {
            if (tids.hasOwnProperty(key)) {
                const tid = tids[key];
                if (!this._tidMap[tid]) {
                    delete(tids[key]);
                } else {
                    this._tidMap[tid](args);
                }
            }
        }
    }
    public remove(tid: number) {
        if (this._tidMap[tid]) {
            delete (this._tidMap[tid]);
        }
    }
}
