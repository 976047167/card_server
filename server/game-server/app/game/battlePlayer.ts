import UseHandCard from "./action/useHandCard";
import AttributeManager from "./attributeManager";
import Battle from "./battle";
import BattleObject, { BattleObjectId } from "./battleObject";
import BuffBase from "./buff/buffBase";
import CardBase from "./card/cardBase";
import BattleDeck from "./cardField/battleDeck";
import CardFieldBase, { CARD_FIELD } from "./cardField/cardFieldBase";
import { TIME_POINT } from "./constants";
export interface IPlayerInfo {
    uid: string;
    attribute: {
        strength: number,
        agile: number,
        stamina: number,
        perception: number,
        intellect: number,
        spirit: number,
    };
}
export interface IArgsUseHandCard {
    cardBId: BattleObjectId;
    targetBid: BattleObjectId;
}
export default class BattlePlayer extends BattleObject {
    /**当前先攻的进度
     */
    public get strikeProgress(): number {
        return this._strikeProgress;
    }

    public readonly uid: string;
    public _strikeProgress: number = 0;
    public readonly attribute: AttributeManager;
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: CardFieldBase;
    private grave: CardFieldBase;
    private hand: CardFieldBase;
    private dealing: CardFieldBase;
    private buffList: BuffBase[];
    constructor(battle: Battle, info: IPlayerInfo) {
        super(battle);
        this.playerInfo = info;
        this.uid = this.playerInfo.uid;
        this.initFiled();
        this.attribute = new AttributeManager(this);
    }
    public getInfo(): IPlayerInfo {
        return this.playerInfo;
    }
    /**
     * 获取场地
     * @param field 场地常量
     */
    public getCardFiled(field: CARD_FIELD): CardFieldBase {
        switch (field) {
            case CARD_FIELD.DECK:
                return this.deck;
            case CARD_FIELD.DEALING:
                return this.dealing;
            case CARD_FIELD.HAND:
                return this.hand;
            case CARD_FIELD.GRAVE:
                return this.grave;
            case CARD_FIELD.REMOVED:
                return this.removed;
        }
    }

    public useHandCard(args: IArgsUseHandCard) {
        const handCards = this.getCardFiled(CARD_FIELD.HAND);
        const card = this.battle.getObjectByBId(args.cardBId, CardBase);
        if (card.field !== handCards) { return; }
        const action = new UseHandCard(this, args);
        this.actionCtrl.pushAction(action);
    }
    /**
     * 洗牌
     * @param field 区域,可以传多个
     */
    public shuffle(fields: CARD_FIELD | CARD_FIELD[]) {
        const cardFields: CardFieldBase[] = [];
        if (fields instanceof Array) {
            fields.forEach((field) => {
                cardFields.push(this.getCardFiled(field));
            });
        } else {
            cardFields.push(this.getCardFiled(fields));
        }
        cardFields.forEach((cardField) => {
            cardField.shuffle();
        });
    }
    /**
     * 先攻进度
     */
    public doStrike() {
        this._strikeProgress += this.attribute.derive.initiative;
    }
    /**
     * 行动完成后清空进度值
     */
    public endStike() {
        this._strikeProgress = 0;
    }
    public turnBegin() {
        this.trigger.notify(this, TIME_POINT.PLAYER_TURN_BEGIN);
    }
    public drawCard(cards: CardBase[]|CardBase) {
        this.trigger.notify(this, TIME_POINT.PLAYER_DRAW_CARD, cards);
        //
    }

    private initFiled() {
        this.deck = new BattleDeck(this);
        this.hand = new CardFieldBase(this);
        this.grave = new CardFieldBase(this);
        this.removed = new CardFieldBase(this);
        this.dealing = new CardFieldBase(this);
    }
}
