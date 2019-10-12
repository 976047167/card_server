import CardEffect from "../action/archives/cardEffect";
import SendCardToField from "../action/archives/sendCardToField";
import { ACTION_STATE, GameAction } from "../action/gameActionManager";
import BattleObject from "../battleObject";
import BattlePlayer from "../battlePlayer";
import CardFieldBase, { CARD_FIELD} from "../cardField/cardFieldBase";
import { ACTION_TYPE } from "../constants";

export enum CARD_TYPE {
    NORMAL,
    COUNTER, // 反击卡
    EQUIP, // 装备卡
    PROFESSION, // 法术专业卡
}
export interface ICardData {
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
    constructor(data: ICardData, owner: BattlePlayer, field?: CardFieldBase) {
        super(owner.battle);
        this.owner = owner;
        this._controller = this.owner;
        this.setFiled(field);
        this.initData(data);
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
    protected initEffect() {

    }
    /**
     * 注册效果，在卡牌效果确定发动时执行
     * @param actionType 触发卡片效果的行为
     * @param effect 卡片的基本效果
     * @param before 卡牌发动条件检查
     * @param after 卡牌发动完毕后处理，通常是送入墓地
     */
    protected registerCardEffect(
        actionType: ACTION_TYPE,
        args: {
            effect: (args: GameAction) => any,
            beffore?: (action: GameAction) => boolean,
            after?: (GameAction) => void,
        }) {
        const effect = args.effect.bind(this);
        if (args.beffore) {
            args.beffore = args.beffore.bind(this);
        }
        if (args.after) {
            args.after = args.after.bind(this);
        }
        this.trigger.register(actionType, (action: GameAction) => {
            if (action.state === ACTION_STATE.COMPLETED && action.target === this && !args.beffore ||
                args.beffore(action)) {
                const cardEffect = new CardEffect(this, action.extraData);
                this.GAM.pushAction(cardEffect);
                let result;
                if (cardEffect.state === ACTION_STATE.COMPLETED) {
                   result = effect(action);
                }
                if (args.after) {
                    args.after(result);
                } else {
                    this.GAM.pushAction(new SendCardToField(this, {target: CARD_FIELD.GRAVE}));
                }
            }
        });
    }
    /**
     * 加载卡片信息
     * @param info 卡片信息，通常只要一个id，通过读表获取其他信息。如果传入其他属性，会覆盖默认属性
     */
    private initData(info: ICardData) {
        //
    }
}

