import { IArgsUseHandCard } from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameAction";

export default class ActionCardEffect extends GameAction {
    public readonly creator: CardBase;
    protected deal() {
        this.creator.moveTo(CARD_FIELD.DEALING);
    }
}
