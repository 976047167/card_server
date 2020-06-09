import CardBase from "../../card/cardBase";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { GameAction } from "../gameAction";

export default class ActionCardEffect extends GameAction {
	public readonly creator: CardBase;
	protected deal () {
		this.creator.moveTo(CARD_FIELD.DEALING);
	}
}
