export enum BUFF_TYPE {
    CONTINUOUS, // 持续性生效的
}
export default class BuffBase {
    /**
     * 是否可以被驱散
     */
    public get canBeDispeled() {
        return this._can_be_dispeled;
    }
    public get type() {
        return this._type;
    }
    public get isDebuff() {
        return this._is_debuff;
    }
    /**
     * 是否可以被同名叠加
     */
    public get isOverlayable() {
        return this._is_overlayable;
    }
    private _is_debuff: boolean;
    private _is_overlayable: boolean;
    private _can_be_dispeled: boolean;

    private _type: BUFF_TYPE;
    constructor(info) {
        //
        this.init(info);
    }
    private init(info) {
        this._is_debuff  = false;
        this._is_overlayable = false;
        this._can_be_dispeled = true;
    }
}
