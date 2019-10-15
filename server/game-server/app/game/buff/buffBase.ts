import { DecoratorId, IAttribute } from "../attributeManager";
import BattleObject, { BattleObjectId } from "../battleObject";
import BattlePlayer from "../battlePlayer";
import { ACTION_TYPE } from "../constants";
import { TriggerId } from "../trigger";

export enum BUFF_TYPE {
    NORAML, // 正常buff
    BLOOD, // 血统
    TRANSFORMATION, // 改造
    EQUIPMENT, // 装备
}
export interface IBuffInfo {
    id: number;
}
export default class BuffBase  extends BattleObject {
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
    public get owner() {
        return this._owner;
    }
    public readonly creator: BattlePlayer;
    private _active: boolean;
    public get active() {
        return this._active;
    }
    private _owner: BattlePlayer|null;
    private _is_debuff: boolean;
    private _is_overlayable: boolean;
    private _can_be_dispeled: boolean;
    private _can_be_repressed: boolean;
    private _name: string;
    private did: DecoratorId;
    private tids: TriggerId[] = [];

    private _type: BUFF_TYPE;
    constructor(creator: BattlePlayer, info) {
        super(creator.battle);
        this.creator = creator;
        this.initInfo(info);
    }
    /**
     * 设置buff的对象
     * @param player 对象，可以为null,为null时消除该buff
     */
    public setOwner(player: BattlePlayer|null) {
        if (this.owner === player) { return; }
        if (this.owner ) {this.deactivate(); }
        this._owner = player;
        if (!player) {return; }
        this.activate();
    }
    /**
     * 对属性进行装饰
     * @param attribute 传入的属性
     */
    protected handle(attribute: IAttribute) {
        return attribute;
    }
    protected dispeled() {
        //
        if (this.canBeDispeled) {
            this.setOwner(null);
        }
    }
    protected initTrigger() {
        return true;
    }
    protected registerBuffEffect(type: ACTION_TYPE, effect: (args: any) => any) {
        effect = effect.bind(this);
        const tid = this.trigger.register(type, effect);
        this.tids.push(tid);
    }
    private uninitTrigger() {
        this.tids.forEach((tid) => {
            this.trigger.remove(tid);
        });
        this.tids = [];
    }
    /**
     * 添加属性装饰器
     */
    private initDecorator() {
        this.did = this.owner.attribute.registerAtrributeHandle(this.handle.bind(this));
    }
    /**
     * 移除属性装饰器
     */
    private uninitDecorator() {
        this.owner.attribute.removeAttributeHandle(this.did);
    }
    private initInfo(info) {
        this._is_debuff  = false;
        this._is_overlayable = false;
        this._can_be_dispeled = true;
        this._type = BUFF_TYPE.NORAML;
    }
    /**
     * 生效
     */
    private activate() {
        this.initDecorator();
        this.initTrigger();
        this._active = true;
    }
    /**
     * 失效
     */
    private deactivate() {
        this.uninitDecorator();
        this.uninitTrigger();
        this._active = false;
    }
}
