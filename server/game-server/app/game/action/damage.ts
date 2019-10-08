import BattleObject from "../battleObject";
import BattlePlayer from "../battlePlayer";
import { CARD_FIELD } from "../cardField/cardFieldBase";
import { TIME_POINT } from "../constants";
import { GameAction } from "../gameActionController";

export enum DAMAGE_TYPE {
   VOID = 0,
}
export default class Damage extends GameAction {
    private damageNum: number;
    private effectList: Array<(damage: Damage) => void>;
    constructor(creator: BattleObject, target: BattlePlayer, damageNum: number, effect?: (damage: Damage) => void) {
        super(creator);
        this.target = target;
        this.damageNum = damageNum;
        this.effectList.push(effect);
    }

    /**
     * 伤害处理
     */
    public deal() {
        const target_deck =  this.target.getCardFiled(CARD_FIELD.DECK);
        const target_grave =  this.target.getCardFiled(CARD_FIELD.GRAVE);
        const target_removed = this.target.getCardFiled(CARD_FIELD.REMOVED);
        let softDamage = 0;
        while (this.damageNum) {
            const card = target_deck.getCardByIndex(0);
            if (!card) {
                break;
            }
            const value = card.value;
            if (softDamage < this.target.attribute.derive.tenacious ) {
                target_deck.moveCardsTo([card], target_grave);
                this.trigger.notify(card, TIME_POINT.CARD_DAMAGE, this);
            } else {
                target_deck.moveCardsTo([card], target_removed);
            }
            softDamage += value;
            this.reduce(value);
        }
    }
    public reduce(value: number = this.damageNum) {
        this.damageNum -= value;
        if (this.damageNum < 0) {this.damageNum = 0; }
    }
}
