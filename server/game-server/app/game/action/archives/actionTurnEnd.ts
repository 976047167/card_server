import BattlePlayer from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameAction";

export default class ActionTurnEnd extends GameAction {
	public readonly type: ACTION_TYPE;
	public readonly creator: BattlePlayer;
	public readonly target: CardBase;

	protected deal () {
		//
	}
}
