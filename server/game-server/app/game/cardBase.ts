import { filter } from "bluebird";
import Battle from "./battle";
import BattlePlayer from "./battlePlayer";
import FieldBase from "./field/fieldBase";

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
    public get field() {
        return this._field;
    }
    public readonly owner: BattlePlayer;
    public readonly battle: Battle;
    public readonly bId: number;
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: FieldBase;
    protected controller: BattlePlayer;
    constructor(owner: BattlePlayer) {
        this.owner = owner;
        this.battle = owner.battle;
        this.bId = this.battle.registerCard(this);
    }
    public setFiled(field?: FieldBase) {
        this._field = field;
    }

}
