import CardBase from "../../card/cardBase";
import CardFieldBase, { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class MoveCard extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: CardBase;
    public readonly target: CardFieldBase;
    constructor(creator: CardBase, args: {target: CardFieldBase |CARD_FIELD}) {
        super(creator, args);
        this.type = ACTION_TYPE.MOVE_CARD;
        if (args.target instanceof CardFieldBase) {
            this.target = args.target;
        } else {
            this.target = this.creator.owner.getCardFiled(args.target);
        }

    }
    protected deal() {
        this.creator.field.moveCardsTo(this.creator, this.target);
    }
}
