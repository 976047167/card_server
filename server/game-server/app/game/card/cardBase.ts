import Battle, { BattleObjectId } from "../battle";
import BattlePlayer from "../battlePlayer";
import CardFieldBase, { CARD_FIELD } from "../cardField/cardFieldBase";
import { TIME_POINT } from "../constants";
import Trriger from "../trriger";

export enum CARD_TYPE {
    NORMAL,
    COUNTER, // 反击卡
    EQUIP, // 装备卡
    PROFESSION, // 法术专业卡
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
    public readonly bId: BattleObjectId;
    protected readonly trriger: Trriger;
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: CardFieldBase;
    protected _controller: BattlePlayer;
    constructor(info: ICardInfo, owner: BattlePlayer, field?: CardFieldBase) {
        this.owner = owner;
        this.battle = owner.battle;
        this.trriger = this.battle.trriger;
        this._controller = this.owner;
        this.bId = this.battle.registerBid(this);
        this.setFiled(field);
        this.initInfo(info);
        this.initEffect();
    }
    public setFiled(field?: CardFieldBase) {
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
    protected registerCardEffect(timePoint: TIME_POINT,
                                 effect: (args: any) => any,
                                 before= this.beforeEffect.bind(this),
                                 after= this.afterEffect.bind(this)) {
        before = before.bind(this);
        after = after.bind(this);
        effect = effect.bind(this);
        this.trriger.register(this, timePoint, (args) => {
            const check = before(args);
            let result = null;
            if (check) {
                result = effect(args);
            }
            after(result);
        });
    }
    protected beforeEffect(args) {
        const dealingField = this.controller.getCardFiled(CARD_FIELD.DEALING);
        this.field.moveCardsTo(this, dealingField);
        return true;
    }
    protected afterEffect(args) {
        const grave = this.controller.getCardFiled(CARD_FIELD.GRAVE);
        const dealing = this.controller.getCardFiled(CARD_FIELD.DEALING);
        dealing.moveCardsTo(this, grave);
    }
}
