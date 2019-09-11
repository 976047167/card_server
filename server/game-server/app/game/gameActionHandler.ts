import Battle from "./battle";
import BattlePlayer from "./battlePlayer";
import { TIME_POINT } from "./constants";
import Trriger from "./trriger";

export class GameAction {
    public readonly creator: BattlePlayer;
    public readonly trriger: Trriger;
    protected readonly battle: Battle;
    private _rejected: boolean = false;
    public set rejected(foo: boolean) {
        this._rejected = foo;
    }
    public get rejected() {
        return this._rejected;
    }

    constructor(creator: BattlePlayer) {
        this.creator = creator;
        this.battle = creator.battle;
        this.trriger = creator.battle.trriger;
    }
    public deal() {
        //
    }
}
export default class GameActionHandler {
    private actionsStack: GameAction[];
    private isDealing: boolean = false;
    private battle: Battle;
    private trriger: Trriger;
    constructor(battle: Battle) {
        this.trriger = battle.trriger;

    }
    public pushAction(action: GameAction) {
        this.actionsStack.push(action);
        if (!this.isDealing) {
            this.dealAction();
        }
    }
    private dealAction() {
        if (this.actionsStack.length === 0) {
            this.isDealing = false;
            // send to client
            return;
        }
        this.isDealing = true;
        const action = this.actionsStack.pop();
        this.trriger.notify(action.creator, TIME_POINT.ACTION_COUNTER, action);
        if (!action.rejected) {
            action.deal();
        }
        this.dealAction();
    }
}
