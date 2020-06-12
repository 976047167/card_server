import CardBase from "../../card/cardBase";
import CardFieldBase, { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameActionBase } from "../gameActionBase";

export default class ActionMoveCard extends GameActionBase {
	public readonly type: ACTION_TYPE;
	public readonly creator: CardBase;
	public readonly target: CardFieldBase;
	protected _target: CardFieldBase;
	protected onCreator (args: { target: CardFieldBase | CARD_FIELD }) {
		if (args.target instanceof CardFieldBase) {
			this._target = args.target;
		} else {
			this._target = this.creator.owner.getCardFiled(args.target);
		}

	}
	protected deal () {
		this.creator.field.moveCardsTo(this.creator, this.target);
	}
}
