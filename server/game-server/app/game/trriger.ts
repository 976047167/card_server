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
    private _trrigerMap: { [bid: number]: {[timePoint: number]: Array<(args: any) => void>}};
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
        this._trrigerMap[obj][timePoint].push(effect);
    }
    public notify(obj: BattleObject|number, timePoint: TIME_POINT, args?) {
        if (typeof(obj) !== "number") {
            obj = obj.bId;
        }
        if (!this._trrigerMap[obj]) { return; }
        const effects = this._trrigerMap[obj][timePoint];
        effects.forEach((e) => {
            e(args);
        });
    }
}
