import Battle from "../battle";
import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import FieldBase, { CARD_FIELD } from "../field/fieldBase";

export enum CARD_TYPE {

}
export interface ICardInfo {
    cardId: string;
    exp: number;
    level: number;
    arg?: any;
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
    public get controller() {
        return this._controller;
    }
    public readonly owner: BattlePlayer;
    public readonly battle: Battle;
    public readonly bId: number;
    protected _type: CARD_TYPE;
    protected _name: string;
    protected _value: number;
    protected _field: FieldBase;
    protected _controller: BattlePlayer;
    constructor(info: ICardInfo, owner: BattlePlayer, field: FieldBase) {
        this.owner = owner;
        this.battle = owner.battle;
        this._controller = this.owner;
        this.bId = this.battle.registerBid(this);
        this._field = field;
        this.initInfo(info);
    }
    public setFiled(field?: FieldBase) {
        this._field = field;
    }
    public deal(args: IArgsUseHandCard) {
        const dealingFiled = this.controller.getCardFileds(CARD_FIELD.DEALING)[0];
        this.field.moveCardsTo([this], dealingFiled);
        this.effect(args);
        this.dealDone();
    }

    protected effect(args: IArgsUseHandCard) {
        //
    }
    protected initInfo(info: ICardInfo) {
        //
    }
    protected dealDone() {
        const grave = this.controller.getCardFileds(CARD_FIELD.GRAVE)[0];
        this.field.moveCardsTo([this], grave);
    }
}
