import { AttributeHandle, IAttribute } from "./attrDecorator";
import Battle from "./battle";
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
    cardBId: number;
    targetBid: number;
}
export default class BattlePlayer {
    /**力量
     *
     */
    public get strength(): number {
        return this.baseAttribute.str + this.decorator.str;
    }
    /**
     * 敏捷
     */
    public get agile(): number {
        return this.baseAttribute.agi + this.decorator.str;
    }
    /**耐力
     *
     */
    public get stamina(): number {
        return this.baseAttribute.sta + this.decorator.sta;
    }
    /**感知
     *
     */
    public get perception(): number {
        return this.baseAttribute.per + this.decorator.per;
    }
    /**智力
     *
     */
    public get intellect(): number {
        return this.baseAttribute.int + this.decorator.int;
    }
    /**意志
     *
     */
    public get spirit(): number {
        return this.baseAttribute.spi + this.decorator.spi;
    }
    /**
     * 免疫
     */
    public get immunity(): number {
        return this.stamina + this.spirit;
    }
    /**
     * 强韧
     */
    public get tenacious(): number {
        return this.stamina + this.spirit;
    }
    /**
     * 先攻值
     */
    public get initiative(): number {
        return this.perception + this.agile;
    }
    /**当前先攻的进度
     */
    public get strikeProgress(): number {
        return this._strikeProgress;
    }

    public readonly battle: Battle;
    public readonly bId: number;
    public readonly uid: string;
    public _strikeProgress: number = 0;
    public readonly dec: AttributeHandle;
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private dealing: FieldBase;
    private buffList: BuffBase[];
    private baseAttribute: IAttribute;
    private get decorator(): IAttribute {
        return this.dec.decorator;
    }
    constructor(battle: Battle, info: IPlayerInfo) {
        this.battle = battle;
        this.playerInfo = info;
        this.uid = this.playerInfo.uid;
        this.initFiled();
        this.initAttribute(info);
        this.dec = new AttributeHandle();
        this.bId = this.battle.registerBid(this);
    }
    public getInfo(): IPlayerInfo {
        return this.playerInfo;
    }
    public getCardFileds(field: CARD_FIELD) {
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
        this._strikeProgress += this.initiative;
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
    private initAttribute(info: IPlayerInfo) {
        this.baseAttribute = {
            agi : info.attribute.agile,
            int : info.attribute.intellect,
            per : info.attribute.perception,
            spi : info.attribute.spirit,
            sta : info.attribute.stamina,
            str : info.attribute.strength,
        };
    }
}
