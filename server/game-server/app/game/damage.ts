import BattlePlayer from "./battlePlayer";
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
        while (this.damageNum) {
            const card = target_deck.getCardByIndex(0);
            target_deck.moveCardsTo([card], target_grave);
            this.damageNum -= card.value;
            if (this.damageNum < 0) {this.damageNum = 0; }
        }
    }
}
