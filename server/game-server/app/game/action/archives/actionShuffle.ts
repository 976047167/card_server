import CardFieldBase from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameActionBase } from "../gameActionBase";

export default class ActionShuffle extends GameActionBase {
	public readonly target: CardFieldBase;
	public readonly type: ACTION_TYPE;
	public deal () {
		this.target.shuffle();
	}
}
