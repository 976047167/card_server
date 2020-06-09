import BattlePlayer from "../battlePlayer";
import CardFieldBase, { CARD_FIELD } from "./cardFieldBase";

export default class FieldGrave extends CardFieldBase {
	public readonly type: CARD_FIELD;
	constructor (owner: BattlePlayer) {
		super(owner);
		this.type = CARD_FIELD.GRAVE;
	}
}
