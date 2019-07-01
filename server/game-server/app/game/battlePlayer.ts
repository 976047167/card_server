import Battle from "./battle";
import BattleDeck from "./battleDeck";
import BuffBase from "./buffBase";
import CardBase from "./cardBase";
import FieldBase from "./fieldBase";
export interface IPlayerInfo {
    uid: string;
    gameData: {
        strength: number,
        agile: number,
        stamina: number,
        perception: number,
        intellect: number,
        spirit: number,
    };
}
export enum CARD_FIELD {
    DECK = 0x1,
    HAND = 0x2,
    GRAVE = 0x4,
    REMOVED = 0x8,
}
export enum ATTRIBUTE {
    STR,
    AGI,
    SPI,
    STA,
    INT,
    PER,
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
    private playerInfo: IPlayerInfo;
    private deck: BattleDeck;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private buffList: BuffBase[];
    private battle: Battle;
    private _baseAttribute;
    constructor(battle: Battle, info: IPlayerInfo) {
        this.battle = battle;
        this.playerInfo = info;
        this.initFiled();
        this.initAttribute(info);
    }
    public getInfo(): IPlayerInfo {
        return this.playerInfo;
    }
    private initFiled() {
        this.deck = new BattleDeck(this.battle);
        this.hand = new FieldBase(this.battle);
        this.grave = new FieldBase(this.battle);
        this.removed = new FieldBase(this.battle);
    }
    private initAttribute(info: IPlayerInfo) {
        this._baseAttribute[ATTRIBUTE.STR] = info.gameData.strength;
        this._baseAttribute[ATTRIBUTE.AGI] = info.gameData.agile;
        this._baseAttribute[ATTRIBUTE.INT] = info.gameData.intellect;
        this._baseAttribute[ATTRIBUTE.SPI] = info.gameData.spirit;
        this._baseAttribute[ATTRIBUTE.PER] = info.gameData.perception;
        this._baseAttribute[ATTRIBUTE.STA] = info.gameData.stamina;
    }
    private shuffle(field: CARD_FIELD) {
        const fields = this.getCardFiled(field);
        fields.forEach((f: FieldBase) => {
            f.shuffle();
        });
    }
    private getCardFiled(field: CARD_FIELD) {
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
        return result;
    }

    private getDamage(damage: number, source: BattlePlayer) {
        // trigger
        while (damage) {
            const card: CardBase = this.deck.getTopCard();
        }
    }
}
