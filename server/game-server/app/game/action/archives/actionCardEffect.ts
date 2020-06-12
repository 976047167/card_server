import CardBase from "../../card/cardBase";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { GameActionBase } from "../gameActionBase";


export default class ActionCardEffect extends GameActionBase {
	public readonly creator: CardBase;
	protected deal () {
		this.creator.moveTo(CARD_FIELD.DEALING);
	}
}
