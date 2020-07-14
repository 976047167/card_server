import GameActionManager from "./action/gameActionManager";
import Battle from "./battle";
import Trigger from "./trigger";
export type BattleObjectId = number;
export default class BattleObject {
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
