import Battle from "../battle";
import BattlePlayer from "../battlePlayer";
import FieldBase from "./fieldBase";

export default class BattleDeck extends FieldBase {
    constructor(battle: Battle) {
        super(battle);
    }
}
