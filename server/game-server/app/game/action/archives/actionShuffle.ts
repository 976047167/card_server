import CardFieldBase from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameAction";

export default class ActionShuffle extends GameAction {
	public readonly target: CardFieldBase;
	public readonly type: ACTION_TYPE;
	public deal () {
		this.target.shuffle();
	}
}
