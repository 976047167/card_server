import DrawCard from "./action/archives/drawCard";
import TurnBegin from "./action/archives/turnBegin";
import TurnEnd from "./action/archives/turnEnd";
import UseHandCard from "./action/archives/useHandCard";
import AttributeManager from "./attributeManager";
import Battle from "./battle";
import BattleObject, { BattleObjectId } from "./battleObject";
import BuffBase from "./buff/buffBase";
import CardBase, { ICardData } from "./card/cardBase";
import CardFieldBase, { CARD_FIELD } from "./cardField/cardFieldBase";
import FieldDeck from "./cardField/fieldDeck";
import FieldGrave from "./cardField/fieldGrave";
import { SETTINGS } from "./constants";
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
    cards: ICardData[];
}
export interface IArgsUseHandCard {
    cardBId: BattleObjectId;
    targetBids?: BattleObjectId[];
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
    private deck: FieldDeck;
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

    public gameStart() {
        this.drawCard();
    }
    public useHandCard(args: IArgsUseHandCard) {
        const handCards = this.getCardFiled(CARD_FIELD.HAND);
        const card = this.battle.getObjectByBId(args.cardBId, CardBase);
        if (card.field !== handCards) { return; }

        const action = new UseHandCard(this, args);
        this.GAM.pushAction(action);
    }
    /**
     * 先攻进度
     */
    public doStrike() {
        this._strikeProgress += this.attribute.derive.initiative;
        console.log("do strike", this.uid, this._strikeProgress);
    }
    /**
     * 行动完成后清空进度值
     */
    public turnEnd() {
        this.GAM.pushAction(new TurnEnd(this));
        this._strikeProgress = 0;
    }
    public turnBegin() {
        console.log(this.uid, "turn begins");
        this.GAM.pushAction(new TurnBegin(this));
        this.drawCard();
    }

    public getSituation() {
        return {
            hand: [this.hand.bId, this.hand.getCardInfos()],
            grave: [this.grave.bId, this.grave.getCardInfos()],
            dealing: [this.dealing.bId, this.dealing.getCardInfos()],
            removed: [this.removed.bId, this.removed.getCardInfos()],
            deck: [this.deck.bId, this.deck.getCardInfos()],
        };
    }
    private drawCard() {
        let hand = SETTINGS.ORIGIN_HAND - this.hand.getCardsNum();
        if (hand < 0) {
            hand = 0;
        }
        this.GAM.pushAction(new DrawCard(this, {number: hand}));

    }
    private initFiled() {
        this.deck = new FieldDeck(this);
        this.hand = new CardFieldBase(this);
        this.grave = new FieldGrave(this);
        this.removed = new CardFieldBase(this);
        this.dealing = new CardFieldBase(this);
    }
}
