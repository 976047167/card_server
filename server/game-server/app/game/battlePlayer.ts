import AttributeHandler from "./attributeHandler";
import Battle, { BattleObjectId } from "./battle";
import BuffBase from "./buff/buffBase";
import CardBase from "./card/cardBase";
import BattleDeck from "./field/battleDeck";
import FieldBase, { CARD_FIELD } from "./field/fieldBase";
import { TIME_POINT } from "./trriger";
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
export default class BattlePlayer {
    /**当前先攻的进度
     */
    public get strikeProgress(): number {
        return this._strikeProgress;
    }

    public readonly battle: Battle;
    public readonly bId: BattleObjectId;
    public readonly uid: string;
    public _strikeProgress: number = 0;
    public readonly attribute: AttributeHandler;
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private dealing: FieldBase;
    private buffList: BuffBase[];
    constructor(battle: Battle, info: IPlayerInfo) {
        this.battle = battle;
        this.playerInfo = info;
        this.uid = this.playerInfo.uid;
        this.initFiled();
        this.attribute = new AttributeHandler(this);
        this.bId = this.battle.registerBid(this);
    }
    public getInfo(): IPlayerInfo {
        return this.playerInfo;
    }
    /**
     * 获取场地
     * @param field 场地常量，可以通过按位与来获取多个场地
     */
    public getCardFileds(field: CARD_FIELD): FieldBase[] {
        const result: FieldBase[] = [];
        if (field & CARD_FIELD.DECK) {
            result.push(this.deck);
        }
        if (field & CARD_FIELD.HAND) {
            result.push(this.hand);
        }
        if (field & CARD_FIELD.GRAVE) {
            result.push(this.grave);
        }
        if (field & CARD_FIELD.REMOVED) {
            result.push(this.removed);
        }
        if (field & CARD_FIELD.DEALING) {
            result.push(this.dealing);
        }
        return result;
    }

    public useHandCard(args: IArgsUseHandCard) {
        const handCards = this.getCardFileds(CARD_FIELD.HAND)[0];
        const card = this.battle.getObjectByBId(args.cardBId, CardBase);
        if (card.field !== handCards) { return; }
        this.battle.trriger.notify(card, TIME_POINT.HAND, args);
    }
    /**
     * 洗牌
     * @param field 区域
     */
    public shuffle(field: CARD_FIELD) {
        const fields = this.getCardFileds(field);
        fields.forEach((f: FieldBase) => {
            f.shuffle();
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
    private initFiled() {
        this.deck = new BattleDeck(this);
        this.hand = new FieldBase(this);
        this.grave = new FieldBase(this);
        this.removed = new FieldBase(this);
        this.dealing = new FieldBase(this);
    }
}
