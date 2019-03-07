import Battle from "./battle";
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
    private deck: FieldBase;
    private removed: FieldBase;
    private grave: FieldBase;
    private hand: FieldBase;
    private buffList: BuffBase[] = [];
    private battle: Battle;
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
        //
    }
    private initAttribute(info) {

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
}
