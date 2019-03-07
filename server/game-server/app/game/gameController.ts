import Battle from "./battle";

export default class GameController {
    public static getInstance() {
        if (!this._instance) { this._instance = new GameController(); }
        return this._instance;
    }
    private static _instance: GameController;
    private constructor() {
        //
    }
    public createBattle(seed: number) {
        const battle = new Battle(seed);
        return battle;
    }
    public startBattle(b: Battle) {
        const result = b.start();
        return result;
    }
}
