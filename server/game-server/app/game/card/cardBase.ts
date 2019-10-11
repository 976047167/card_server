import CardEffect from "../action/cardEffect";
import UseHandCard from "../action/useHandCard";
import BattleObject from "../battleObject";
import BattlePlayer from "../battlePlayer";
import CardFieldBase, { CARD_FIELD } from "../cardField/cardFieldBase";
import { ACTION_TYPE } from "../constants";
import { ACTION_STATE, GameAction } from "../gameActionManager";

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
export default class CardBase extends BattleObject {
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
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: CardFieldBase;
    protected _controller: BattlePlayer;
    constructor(info: ICardInfo, owner: BattlePlayer, field?: CardFieldBase) {
        super(owner.battle);
        this.owner = owner;
        this._controller = this.owner;
        this.setFiled(field);
        this.initInfo(info);
        this.initEffect();
    }
    public setFiled(field?: CardFieldBase|CARD_FIELD) {
        if (!field) {
            this._field = null;
            return;
        }
        if (field instanceof CardFieldBase) {
            this._field = field;
        } else {
            const f = this.controller.getCardFiled(field);
            this._field = f;
        }
    }
    /**
     * 加载卡片信息
     * @param info 卡片信息，通常只要一个id，通过读表获取其他信息。如果传入其他属性，会覆盖默认属性
     */
    protected initInfo(info: ICardInfo) {
        //
    }
    protected initEffect() {
        this.trigger.register(ACTION_TYPE.USE_HAND_CARD, (action: GameAction) => {
            if (action.state === ACTION_STATE.COMPLETED && action.target === this) {
                this.GAM.pushAction(new CardEffect(this));
            }
        });
        //
    }
    /**
     * 注册效果，在相应时点触发
     * @param timePoint 注册的时点
     * @param effect 卡片的基本效果
     * @param before 触发效果前将卡片送入执行区执行条件进行检查，返回false则不执行效果
     * @param after 卡片触发结束后处理，通常是送入墓地
     */
    protected registerCardEffect(
        effect: (args: any) => any,
        before = this.beforeEffect.bind(this),
        after = this.afterEffect.bind(this),
    ) {
        before = before.bind(this);
        after = after.bind(this);
        effect = effect.bind(this);
        this.trigger.register(ACTION_TYPE.CARD_EFFECT, (action) => {
            const check = before(action);
            let result = null;
            if (check) {
                result = effect(action);
            }
            after(result);
        });
    }
    protected beforeEffect(action) {
        const dealingField = this.controller.getCardFiled(CARD_FIELD.DEALING);
        this.field.moveCardsTo(this, dealingField);
        return true;
    }
    protected afterEffect(action) {
        const grave = this.controller.getCardFiled(CARD_FIELD.GRAVE);
        const dealing = this.controller.getCardFiled(CARD_FIELD.DEALING);
        dealing.moveCardsTo(this, grave);
    }
}
