import CardBase from "../../card/cardBase";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { GameActionBase } from "../gameActionBase";


export default class ActionCardEffect extends GameActionBase {
	public readonly creator: CardBase;
	private card:CardBase;
	protected onCreator (args:{
		creator:number,
		cardBId:number
	}) {
		this.card = this.battle.getObjectByBId<CardBase>(args.cardBId);
	}
	protected deal () {
		this.card.moveTo(CARD_FIELD.DEALING);
	}
}
