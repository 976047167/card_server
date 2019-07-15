import Battle from "../battle";
import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import FieldBase, { CARD_FIELD } from "../field/fieldBase";

export enum CARD_TYPE {

}
export interface ICardInfo {
    cardId: string;
    exp: number;
    level: number;
    arg?: any;
}
export enum TIME_POINT {
    HAND = 0,
    COUNTER,
}
export default class CardBase {
    public get name(): string {
        return this._name;
    }
    public get type(): CARD_TYPE {
        return this._type;
    }
    public get value(): number {
        return this._type;
    }
    public get field() {
        return this._field;
    }
    public get controller() {
        return this._controller;
    }
    public readonly owner: BattlePlayer;
    public readonly battle: Battle;
    public readonly bId: number;
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: FieldBase;
    protected _controller: BattlePlayer;
    private _effectMap: {[tiempoint: number]: any};
    constructor(info: ICardInfo, owner: BattlePlayer, field: FieldBase) {
        this.owner = owner;
        this.battle = owner.battle;
        this._controller = this.owner;
        this.bId = this.battle.registerBid(this);
        this._field = field;
        this.initInfo(info);
    }
    public setFiled(field?: FieldBase) {
        this._field = field;
    }
    public trrigerEffect(timePoint: TIME_POINT, args?) {
        const effect = this._effectMap[timePoint];
        if (!effect) { return; }
        effect(args);
    }

    protected initInfo(info: ICardInfo) {
        //
    }
    /**
     * 注册效果，在相应时点触发
     * @param timePoint 注册的时点
     * @param effect 卡片的基本效果
     * @param before 触发效果前将卡片送入执行区执行条件进行检查，返回false则不执行效果
     * @param after 卡片触发结束后处理，通常是送入墓地
     */
    protected registerEffect(timePoint: TIME_POINT, effect, before= this.beforeEffect, after= this.afterEffect) {
        this._effectMap[timePoint] = (args) => {
            const check = before(args);
            if (check) {
                effect(args);
            }
            after(args);
        };
    }
    protected beforeEffect(args) {
        const dealingField = this.controller.getCardFileds(CARD_FIELD.DEALING)[0];
        this.field.moveCardsTo([this], dealingField);
        return true;
    }
    protected afterEffect(args) {
        const grave = this.controller.getCardFileds(CARD_FIELD.GRAVE)[0];
        this.field.moveCardsTo([this], grave);
    }
}
