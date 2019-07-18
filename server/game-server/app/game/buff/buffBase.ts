export enum BUFF_TYPE {
    CONTINUOUS, // 持续性生效的
}
export default class BuffBase {
    /**
     * 是否可以被驱散
     */
    public get canBeDispeled() {
        return false;
    }
    public get type() {
        return this._type;
    }
    public get isDebuff() {
        return false;
    }
    /**
     * 是否可以被同名叠加
     */
    public get isOverlayable() {
        return true;
    }
    private _type: BUFF_TYPE;
    constructor(info) {
        //
    }
}
