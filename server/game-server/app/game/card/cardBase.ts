import Battle from "../battle";
import BattlePlayer from "../battlePlayer";
import FieldBase, { CARD_FIELD } from "../field/fieldBase";
import Trriger, { TIME_POINT } from "../trriger";

export enum CARD_TYPE {
    NORMAL,
    COUNTER,
    EQUIP,
    PROFESSION,
}
export interface ICardInfo {
    cardId: number;
    exp?: number;
    level?: number;
    arg?: any;
}
export default class CardBase {
    public get name(): string {
        return this._name;
    }
    public get type(): CARD_TYPE {
        return this._type;
    }
    public get value(): number {
        return this._value;
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
    protected readonly trriger: Trriger;
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: FieldBase;
    protected _controller: BattlePlayer;
    constructor(info: ICardInfo, owner: BattlePlayer, field?: FieldBase) {
        this.owner = owner;
        this.battle = owner.battle;
        this.trriger = this.battle.trriger;
        this._controller = this.owner;
        this.bId = this.battle.registerBid(this);
        this.setFiled(field);
        this.initInfo(info);
        this.initEffect();
    }
    public setFiled(field?: FieldBase) {
        this._field = field;
    }
    /**
     * 加载卡片信息
     * @param info 卡片信息，通常只要一个id，通过读表获取其他信息。如果传入其他属性，会覆盖默认属性
     */
    protected initInfo(info: ICardInfo) {
        //
    }
    protected initEffect() {
        //
    }
    /**
     * 注册效果，在相应时点触发
     * @param timePoint 注册的时点
     * @param effect 卡片的基本效果
     * @param before 触发效果前将卡片送入执行区执行条件进行检查，返回false则不执行效果
     * @param after 卡片触发结束后处理，通常是送入墓地
     */
    protected registerCardEffect(timePoint: TIME_POINT, effect, before= this.beforeEffect, after= this.afterEffect) {
        this.trriger.register(this, timePoint, (args) => {
            const check = before(args);
            if (check) {
                effect(args);
            }
            after(args);
        });
    }
    protected beforeEffect(args) {
        const dealingField = this.controller.getCardFileds(CARD_FIELD.DEALING)[0];
        this.field.moveCardsTo(this, dealingField);
        return true;
    }
    protected afterEffect(args) {
        const grave = this.controller.getCardFileds(CARD_FIELD.GRAVE)[0];
        const dealing = this.controller.getCardFileds(CARD_FIELD.DEALING)[0];
        dealing.moveCardsTo(this, grave);
    }
}
