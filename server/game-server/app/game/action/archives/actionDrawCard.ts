import BattlePlayer from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { GameAction } from "../gameAction";

export default class ActionDrawCard extends GameAction {
	public readonly creator: BattlePlayer;
	private number: number;
	onCreator (args?: { number: number }) {
		if (args && args.number != null) {
			this.number = args.number;
		} else {
			this.number = 1;
		}
	}
	protected deal () {
		const cards = [];
		for (let i = 0; i < this.number; i++) {
			const deck = this.creator.getCardFiled(CARD_FIELD.DECK);
			const hand = this.creator.getCardFiled(CARD_FIELD.HAND);
			const card = deck.getCardByIndex(0);
			deck.moveCardsTo(card, hand);
			cards.push(card);
		}
		this.extraData.cards = cards;
	}
}
