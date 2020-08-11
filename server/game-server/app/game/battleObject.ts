import GameActionManager from "./action/gameActionManager";
import Battle from "./battle";
import Trigger from "./trigger";
export type BattleObjectId = number;
/**
 * 场景中所有物体的基类
 * 衍生类有buff，card，player等
 */
export default abstract class BattleObject {
	public readonly bId: BattleObjectId;
	public readonly battle: Battle;
	public readonly GAM: GameActionManager;
	protected readonly trigger: Trigger;
	constructor (battle: Battle) {
		this.battle = battle;
		this.trigger = battle.trigger;
		this.GAM = battle.actionManager;
		this.bId = this.battle.registerBOJ(this);
	}
}
