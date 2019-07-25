import Battle, { BattleObjectId } from "../battle";
import Trriger from "../trriger";

export enum BUFF_TYPE {
    CONTINUOUS, // 持续性生效的
}
export interface IBuffInfo {
    id: number;
}
export default class BuffBase {
    /**
     * 是否可以被驱散
     */
    public get canBeDispeled() {
        return this._can_be_dispeled;
    }
    /**
     * 是否负面的
     */
    public get isDebuff() {
        return this._is_debuff;
    }
    /**
     * 是否可以被同名叠加
     */
    public get isOverlayable() {
        return this._is_overlayable;
    }
    /**
     * 是否可以被压制
     */
    public get canBeRepressed() {
        return this._can_be_repressed;
    }
    public get name(): string {
        return this._name;
    }
    public get type() {
        return this._type;
    }
    public readonly bId: BattleObjectId;
    public readonly battle: Battle;
    protected readonly trriger: Trriger;
    private _is_debuff: boolean;
    private _is_overlayable: boolean;
    private _can_be_dispeled: boolean;
    private _can_be_repressed: boolean;
    private _name: string;

    private _type: BUFF_TYPE;
    constructor(battle: Battle, info) {
        this.battle = battle;
        this.trriger = this.battle.trriger;
        this.bId = this.battle.registerBid(this);
        this.initInfo(info);
    }
    protected effect() {
        //
    }
    protected dispeled() {
        //
    }
    private initInfo(info) {
        this._is_debuff  = false;
        this._is_overlayable = false;
        this._can_be_dispeled = true;
        this._type = BUFF_TYPE.CONTINUOUS;
    }
}
