import Battle from "./battle";
export enum TriggerPoint {

}
export enum TriggerLevel {

}
export default class BattleTrigger {
    private battle: Battle;
    constructor(battle: Battle) {
        this.battle = battle;
    }
    public registerTrigger(point: TriggerPoint, level: TriggerLevel) {

    }
}
