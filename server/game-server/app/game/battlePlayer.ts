import Battle from "./battle";
import BuffBase from "./buffBase";
import CardBase from "./card/cardBase";
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
export enum ATTRIBUTE {
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
    public get uid(): string {
        return this.playerInfo.uid;
    }
    public get strength(): number {
        return 1;
    }
    public get agile(): number {
        return 1;
    }
    public get stamina(): number {
        return 1;
    }
    public get perception(): number {
        return 1;
    }
    public get intellect(): number {
        return 1;
    }
    public get spirit(): number {
        return 1;
    }
    public readonly battle: Battle;
    public readonly bid: number;
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private dealing: FieldBase;
    private buffList: BuffBase[];
    private _baseAttribute;
    constructor(battle: Battle, info: IPlayerInfo) {
        this.battle = battle;
        this.playerInfo = info;
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
        const grave = this.getCardFileds(CARD_FIELD.GRAVE)[0];
        card.deal(args);
        handCards.moveCardsTo([card], grave);
    }
    public shuffle(field: CARD_FIELD) {
        const fields = this.getCardFileds(field);
        fields.forEach((f: FieldBase) => {
            f.shuffle();
        });
    }
    private initFiled() {
        this.deck = new BattleDeck(this);
        this.hand = new FieldBase(this);
        this.grave = new FieldBase(this);
        this.removed = new FieldBase(this);
        this.dealing = new FieldBase(this);
    }
    private initAttribute(info: IPlayerInfo) {
        this._baseAttribute[ATTRIBUTE.STR] = info.attribute.strength;
        this._baseAttribute[ATTRIBUTE.AGI] = info.attribute.agile;
        this._baseAttribute[ATTRIBUTE.INT] = info.attribute.intellect;
        this._baseAttribute[ATTRIBUTE.SPI] = info.attribute.spirit;
        this._baseAttribute[ATTRIBUTE.PER] = info.attribute.perception;
        this._baseAttribute[ATTRIBUTE.STA] = info.attribute.stamina;
    }
}
