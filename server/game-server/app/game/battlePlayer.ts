import Battle from "./battle";
import BuffBase from "./buff/buffBase";
import CardBase, { TIME_POINT } from "./card/cardBase";
import BattleDeck from "./field/battleDeck";
import FieldBase, { CARD_FIELD } from "./field/fieldBase";
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
export enum BASE_ATTRIBUTE {
    STR,
    AGI,
    SPI,
    STA,
    INT,
    PER,
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
        return 1;
    }
    /**
     * 敏捷
     */
    public get agile(): number {
        return 1;
    }
    /**耐力
     *
     */
    public get stamina(): number {
        return 1;
    }
    /**感知
     *
     */
    public get perception(): number {
        return 1;
    }
    /**智力
     *
     */
    public get intellect(): number {
        return 1;
    }
    /**意志
     *
     */
    public get spirit(): number {
        return 1;
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
    public readonly bid: number;
    public readonly uid: string;
    public _strikeProgress: number = 0;
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private dealing: FieldBase;
    private buffList: BuffBase[];
    private _baseAttribute;
    private actQueue: number;
    constructor(battle: Battle, info: IPlayerInfo) {
        this.battle = battle;
        this.playerInfo = info;
        this.uid = this.playerInfo.uid;
        this.initFiled();
        this.initAttribute(info);
        this.bid = this.battle.registerBid(this);
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
        card.trrigerEffect(TIME_POINT.HAND, args);
    }
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
        this._baseAttribute[BASE_ATTRIBUTE.STR] = info.attribute.strength;
        this._baseAttribute[BASE_ATTRIBUTE.AGI] = info.attribute.agile;
        this._baseAttribute[BASE_ATTRIBUTE.INT] = info.attribute.intellect;
        this._baseAttribute[BASE_ATTRIBUTE.SPI] = info.attribute.spirit;
        this._baseAttribute[BASE_ATTRIBUTE.PER] = info.attribute.perception;
        this._baseAttribute[BASE_ATTRIBUTE.STA] = info.attribute.stamina;
    }
}
