import BattlePlayer from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameActionBase } from "../gameActionBase";

export default class ActionTurnBegin extends GameActionBase {
	public readonly type: ACTION_TYPE;
	public readonly creator: BattlePlayer;
	public readonly target: CardBase;
	protected deal () {
		//
	}
}
