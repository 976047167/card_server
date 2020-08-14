import { DecoratorId, Decorator } from "../attributeManager";
import BattleObject from "../battleObject";
import BattlePlayer from "../battlePlayer";
import { ACTION_TYPE } from "../constants";
import { TriggerId } from "../trigger";

export enum BUFF_TYPE {
	NORAML, // 普通buff
	BLOOD, // 血统
	TRANSFORMATION, // 改造
	EQUIPMENT, // 装备
}
export interface IBuffInfo {
	id: number;
}
export default abstract class BuffBase extends BattleObject {
	/** 是否可以被驱散 */
	public get canBeDispeled () { return this._can_be_dispeled; }
	/**是否负面的 */
	public get isDebuff () { return this._is_debuff; }
	/** 是否可以被同名叠加 */
	public get isOverlayable () { return this._is_overlayable; }
	/**是否可以被压制 */
	public get canBeRepressed () { return this._can_be_repressed; }
	/**名字 */
	public get name (): string { return this._name; }
	public get type () { return this._type; }
	/**buff的对象，buff只能附加在player身上 */
	public get owner () { return this._owner; }
	public readonly creator: BattlePlayer;
	public get active () { return this._active; }

	private _active: boolean;
	private _owner: BattlePlayer;
	private _is_debuff: boolean;
	private _is_overlayable: boolean;
	private _can_be_dispeled: boolean;
	private _can_be_repressed: boolean;
	private _name: string;
	private _type: BUFF_TYPE;


	private decortors:Decorator[];
	private dids:Set<DecoratorId>;
	private tids:Set<TriggerId> ;

	constructor (creator: BattlePlayer, info) {
		super(creator.battle);
		this.creator = creator;
		this.initInfo(info);
		this.dids = new Set();
		this.tids = new Set();
	}
	/**
     * 设置buff的对象
     * @param player 对象，可以为null,为null时消除该buff
     */
	public setOwner (player: BattlePlayer) {
		if (this.owner === player) { return; }
		if (this.owner) { this.deactivate(); }
		this._owner = player;
		if (!player) { return; }
		this.activate();
	}
	/**
	 * 驱散该buff
	 */
	protected dispeled () {
		if (this.canBeDispeled) {
			this.setOwner(null);
		}
	}
	/**注册效果
	 * 仅供子类中initTrigger方法调用
	 */
	protected registerBuffEffect (type: ACTION_TYPE, effect: (args: any) => any) {
		effect = effect.bind(this);
		const tid = this.trigger.register(type, effect);
		this.tids.add(tid);
	}
	/**
     * 添加属性装饰器和效果
     */
	private initDT () {
		for (const decorator of this.decortors) {
			const did = this.owner.attribute.registerAtrributeHandle(decorator);
			this.dids.add(did);
		}
		this.initSpecialDecorator();
	}
	private uninitDT () {
		for (const tid of this.tids) {
			this.trigger.remove(tid);
		}
		this.tids.clear();
		for (const did of this.dids) {
			this.owner.attribute.removeAttributeHandle(did);
		}
		this.dids.clear();
	}
	protected abstract initSpecialDecorator ();
	private initInfo (info) {
		this._is_debuff = false;
		this._is_overlayable = false;
		this._can_be_dispeled = true;
		this._type = BUFF_TYPE.NORAML;
	}
	/**
     * 生效
     */
	private activate () {
		this.initDT();
		this._active = true;
	}
	/**
     * 失效
     */
	private deactivate () {
		this.uninitDT();
		this._active = false;
	}
}
