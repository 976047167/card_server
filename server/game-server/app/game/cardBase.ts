import Battle from "./battle";
import BattlePlayer from "./battlePlayer";

export enum CARD_TYPE {

}
export default class CardBase {
    public get name(): string {
        return this._name;
    }
    public get type(): CARD_TYPE {
        return this._type;
    }
    public get value(): number {
        return this._type;
    }
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected battle: Battle;
    protected _bId: number;
    protected owner: BattlePlayer;
    protected controller: BattlePlayer;
    constructor(battle: Battle) {
        this.battle = battle;
        this._bId = battle.registerCard(this);
    }
    public get bId() {
        return this._bId;
    }

}
