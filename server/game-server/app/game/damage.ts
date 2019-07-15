import BattlePlayer from "./battlePlayer";
import { TIME_POINT } from "./card/cardBase";
import FieldBase, { CARD_FIELD } from "./field/fieldBase";

export enum DAMAGE_TYPE {
   VOID = 0,
}
export default class Damage {
    private creator: BattlePlayer;
    private target: BattlePlayer;
    private damageNum: number;
    private effectList: Array<(damage: Damage) => void>;
    constructor(creator: BattlePlayer, target: BattlePlayer, damageNum: number, effect?: (damage: Damage) => void) {
        this.creator = creator;
        this.target = target;
        this.damageNum = damageNum;
        this.effectList.push(effect);
    }

    public deal() {
        const target_deck =  this.target.getCardFileds(CARD_FIELD.DECK)[0];
        const target_grave =  this.target.getCardFileds(CARD_FIELD.GRAVE)[0];
        const target_removed = this.target.getCardFileds(CARD_FIELD.REMOVED)[0];
        let softDamage = 0;
        while (this.damageNum) {
            const card = target_deck.getCardByIndex(0);
            if (!card) {
                break;
            }
            const value = card.value;
            if (softDamage < this.target.tenacious ) {
                target_deck.moveCardsTo([card], target_grave);
                card.trrigerEffect(TIME_POINT.COUNTER, this);
            } else {
                target_deck.moveCardsTo([card], target_removed);
            }
            softDamage += value;
            this.reduce(value);
        }
    }
    public reduce(value?: number) {
        if (value !== 0 && !value) {value = this.damageNum; }
        this.damageNum -= value;
        if (this.damageNum < 0) {this.damageNum = 0; }
    }
}
